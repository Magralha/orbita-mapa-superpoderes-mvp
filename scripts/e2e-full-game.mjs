import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const BASE_URL = process.env.QA_BASE_URL || 'http://127.0.0.1:4173';

function getCoreAssetPaths() {
  const source = readFileSync(new URL('../src/game/data/assets.js', import.meta.url), 'utf8');
  return [...new Set(
    [...source.matchAll(/p\\('([^']+)'\\)/g)]
      .map((match) => match[1])
      .filter((path) => /^board\\/v3\\/(agents|worlds|items|badges)\\//.test(path)),
  )];
}

async function verifyCoreAssets(context, label) {
  const assetPaths = getCoreAssetPaths();
  const errors = [];

  for (const path of assetPaths) {
    const url = new URL(path, BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/').toString();
    const response = await context.request.get(url);
    const body = await response.body();
    const contentType = response.headers()['content-type'] || '';
    const isPng =
      body.length >= 8
      && body[0] === 0x89
      && body[1] === 0x50
      && body[2] === 0x4e
      && body[3] === 0x47
      && body[4] === 0x0d
      && body[5] === 0x0a
      && body[6] === 0x1a
      && body[7] === 0x0a;

    if (!response.ok()) errors.push(`${path}: HTTP ${response.status()}`);
    if (!contentType.includes('image/png')) errors.push(`${path}: content-type ${contentType || 'missing'}`);
    if (!isPng) errors.push(`${path}: invalid PNG signature`);
    if (body.length < 100000) errors.push(`${path}: suspiciously small (${body.length} bytes)`);
  }

  if (errors.length) {
    throw new Error(`[${label}] core asset verification failed:\n${errors.join('\n')}`);
  }

  console.log(`ORBITA_ASSET_RESULT ${JSON.stringify({ ok: true, baseUrl: BASE_URL, count: assetPaths.length })}`);
}

function makeCollector(page, label) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(`[${label}] pageerror: ${error.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${label}] console: ${msg.text()}`);
  });
  page.on('requestfailed', (req) => {
    const errorText = req.failure()?.errorText || 'unknown';
    // Fast automated progression can remove an off-screen scene image before
    // Chromium finishes it. That cancellation is not a broken visible asset.
    if (req.resourceType() === 'image' && errorText === 'net::ERR_ABORTED') return;
    errors.push(`[${label}] requestfailed: ${req.method()} ${req.url()} :: ${errorText}`);
  });
  page.on('response', (res) => {
    if (res.status() >= 400) errors.push(`[${label}] http ${res.status()}: ${res.url()}`);
  });
  return errors;
}

async function installImageErrorProbe(page) {
  await page.addInitScript(() => {
    window.__orbitaQaImageErrors = [];
    window.addEventListener('error', (event) => {
      const el = event.target;
      if (el && el.tagName === 'IMG') {
        window.__orbitaQaImageErrors.push(el.currentSrc || el.src || 'unknown-img');
      }
    }, true);
  });
}

async function assertNoHorizontalOverflow(page, label) {
  const result = await page.evaluate(() => ({
    viewport: window.innerWidth,
    html: document.documentElement.scrollWidth,
    body: document.body?.scrollWidth || 0,
  }));
  const maxWidth = Math.max(result.html, result.body);
  if (maxWidth > result.viewport + 2) {
    throw new Error(`[${label}] horizontal overflow: viewport=${result.viewport}, content=${maxWidth}`);
  }
}

async function assertNoBrokenImages(page, label) {
  const broken = await page.evaluate(() => {
    const current = Array.from(document.images)
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src || 'unknown-img');
    return [...new Set([...(window.__orbitaQaImageErrors || []), ...current])];
  });
  if (broken.length) throw new Error(`[${label}] broken images: ${broken.join(', ')}`);
}

async function loginStudent(page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  const student = page.locator('.pilotAccount-student');
  await student.waitFor({ state: 'visible' });
  await student.click();
  await page.getByText('Escolha seu').waitFor({ state: 'visible' });
}

async function startMission(page, agentId = 'orin') {
  const agent = page.locator(`.mobileAgentCard-${agentId}`);
  if (await agent.count()) await agent.click();
  await page.getByRole('button', { name: /Começar missão/i }).click();
  await page.locator('.mobileChoiceButton').first().waitFor({ state: 'visible' });
}

async function saveAndResume(page) {
  await page.locator('.mobileChoiceButton').first().click();
  await page.waitForTimeout(30);

  const exit = page.locator('[aria-label="Salvar progresso"], [aria-label="Voltar"]').first();
  await exit.waitFor({ state: 'visible' });
  await exit.click();

  const resume = page.getByRole('button', { name: /Continuar de onde parei/i });
  await resume.waitFor({ state: 'visible' });
  await resume.click();
  await page.waitForTimeout(30);
}

async function playToCompletion(page, label) {
  let steps = 0;
  const maxSteps = 140;

  while (steps < maxSteps) {
    steps += 1;

    if (await page.getByText('Missão concluída', { exact: true }).count()) {
      await page.getByText('Missão concluída', { exact: true }).waitFor({ state: 'visible' });
      await page.getByText('Seu mapa de superpoderes.', { exact: true }).waitFor({ state: 'visible' });
      await assertNoHorizontalOverflow(page, label + ':final');
      await assertNoBrokenImages(page, label + ':final');
      return steps;
    }

    const inventory = page.locator('.mobileKitBlock');
    if (await inventory.count() && await inventory.isVisible()) {
      const cards = page.locator('.mobileItemCard');
      const count = await cards.count();
      for (let i = 0; i < count; i += 1) {
        const card = cards.nth(i);
        const cls = (await card.getAttribute('class')) || '';
        if (!cls.includes('selected')) await card.click();
        const selectedCount = await page.locator('.mobileItemCard.selected').count();
        if (selectedCount >= 4) break;
      }
      await page.getByRole('button', { name: /Pronto para jogar/i }).click();
      await page.waitForTimeout(20);
      continue;
    }

    const tradeoff = page.locator('.mobileTradeoffStage');
    if (await tradeoff.count() && await tradeoff.isVisible()) {
      const cards = page.locator('.mobileTradeoffCard');
      for (let i = 0; i < Math.min(2, await cards.count()); i += 1) await cards.nth(i).click();
      await page.getByRole('button', { name: /Abrir o portão/i }).click();
      await page.waitForTimeout(20);
      continue;
    }

    const powerStage = page.locator('.mobilePowerStage');
    if (await powerStage.count() && await powerStage.isVisible()) {
      const enabled = page.locator('.mobilePowerCard:not([disabled])').first();
      if (!(await enabled.count())) throw new Error(`[${label}] power challenge with no enabled card at step ${steps}`);
      await enabled.click();
      await page.waitForTimeout(20);
      continue;
    }

    const missions = page.locator('.mobileMissionChoices');
    if (await missions.count() && await missions.isVisible()) {
      const choice = page.locator('.mobileMissionChoice').first();
      if (!(await choice.count())) throw new Error(`[${label}] mission screen has no mission choices`);
      await choice.click();
      await page.waitForTimeout(20);
      continue;
    }

    const choices = page.locator('.mobileChoiceButton');
    if (await choices.count()) {
      const visible = page.locator('.mobileChoiceButton:visible').first();
      if (await visible.count()) {
        await visible.click();
        await page.waitForTimeout(20);
        if (steps % 5 === 0) {
          await assertNoHorizontalOverflow(page, `${label}:step-${steps}`);
          await assertNoBrokenImages(page, `${label}:step-${steps}`);
        }
        continue;
      }
    }

    throw new Error(`[${label}] no actionable gameplay control at step ${steps}; body=${(await page.locator('body').innerText()).slice(0, 1000)}`);
  }

  throw new Error(`[${label}] did not reach final result within ${maxSteps} actions`);
}

async function runFull(browser) {
  const label = 'full-390x844';
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await verifyCoreAssets(context, label);
  const page = await context.newPage();
  const errors = makeCollector(page, label);
  await installImageErrorProbe(page);

  await loginStudent(page);
  await assertNoHorizontalOverflow(page, label + ':agent-select');
  await assertNoBrokenImages(page, label + ':agent-select');

  await startMission(page, 'orin');
  await saveAndResume(page);
  const steps = await playToCompletion(page, label);

  if (errors.length) throw new Error(errors.join('\n'));
  const imgErrors = await page.evaluate(() => window.__orbitaQaImageErrors || []);
  if (imgErrors.length) throw new Error(`[${label}] image load errors: ${[...new Set(imgErrors)].join(', ')}`);

  await context.close();
  return { label, steps, status: 'passed' };
}

async function runViewportSmoke(browser, viewport) {
  const label = `smoke-${viewport.width}x${viewport.height}`;
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const errors = makeCollector(page, label);
  await installImageErrorProbe(page);

  await loginStudent(page);
  await assertNoHorizontalOverflow(page, label + ':agent-select');
  await assertNoBrokenImages(page, label + ':agent-select');
  await startMission(page, 'luma');
  await assertNoHorizontalOverflow(page, label + ':game');
  await assertNoBrokenImages(page, label + ':game');
  await page.locator('.mobileChoiceButton').first().click();
  await page.waitForTimeout(30);
  await assertNoHorizontalOverflow(page, label + ':after-choice');
  await assertNoBrokenImages(page, label + ':after-choice');

  if (errors.length) throw new Error(errors.join('\n'));
  await context.close();
  return { label, status: 'passed' };
}

const browser = await chromium.launch({ headless: true });
const results = [];
try {
  results.push(await runFull(browser));
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1366, height: 768 },
  ]) {
    results.push(await runViewportSmoke(browser, viewport));
  }
  console.log('ORBITA_E2E_RESULT ' + JSON.stringify({ ok: true, results }));
} catch (error) {
  console.error('ORBITA_E2E_RESULT ' + JSON.stringify({ ok: false, results, error: error.stack || error.message }));
  process.exitCode = 1;
} finally {
  await browser.close();
}

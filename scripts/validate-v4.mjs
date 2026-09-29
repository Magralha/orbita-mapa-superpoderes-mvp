import { dailyMissions } from '../src/game/data/dailyMissions.js';
import { seasonOne, weeklyQuests } from '../src/game/data/seasonData.js';
import {
  FAMILY_MISSION_TEMPLATES,
  SCHOOL_MISSION_TEMPLATES,
} from '../src/game/engine/assignmentEngine.js';
import { expandedNodes } from '../src/game/data/expandedTree.js';
import { immersiveSceneConfig } from '../src/game/data/sceneConfig.js';
import {
  pilotAccounts,
  pilotClasses,
  pilotGuardians,
  pilotSchools,
  pilotStudents,
  pilotStaff,
} from '../src/pilot/pilotData.js';

const errors = [];
const warnings = [];

function uniqueIds(items, label) {
  const ids = items.map((item) => item.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) errors.push(label + ': duplicate ids ' + [...new Set(duplicates)].join(', '));
}

function requireCount(items, expected, label) {
  if (items.length !== expected) {
    errors.push(label + ': expected ' + expected + ', got ' + items.length);
  }
}

uniqueIds(dailyMissions, 'daily missions');
uniqueIds(FAMILY_MISSION_TEMPLATES, 'family missions');
uniqueIds(SCHOOL_MISSION_TEMPLATES, 'school missions');
uniqueIds(weeklyQuests, 'weekly quests');

requireCount(dailyMissions, 30, 'daily missions');
requireCount(FAMILY_MISSION_TEMPLATES, 10, 'family mission templates');
requireCount(SCHOOL_MISSION_TEMPLATES, 10, 'school mission templates');
requireCount(weeklyQuests, 4, 'weekly quests');
requireCount(seasonOne.weeks, 4, 'season weeks');
if (!seasonOne.epic?.id || !Array.isArray(seasonOne.epic.steps) || seasonOne.epic.steps.length !== 5) {
  errors.push('epic quest: expected id and 5 completion steps');
}
if (!seasonOne.epic?.reflection) errors.push('epic quest: missing reflection');

for (const territory of ['escola', 'casa', 'mundo']) {
  const count = dailyMissions.filter((mission) => mission.territory === territory).length;
  if (count !== 10) errors.push('daily territory ' + territory + ': expected 10, got ' + count);
}

for (const mission of dailyMissions) {
  if (!mission.title || !mission.prompt || !mission.reflection) {
    errors.push('daily mission ' + mission.id + ': missing title/prompt/reflection');
  }
  if (!Array.isArray(mission.options) || mission.options.length < 3) {
    errors.push('daily mission ' + mission.id + ': needs at least 3 reflection options');
  }
  if (!Number.isFinite(Number(mission.xp)) || Number(mission.xp) <= 0) {
    errors.push('daily mission ' + mission.id + ': invalid xp');
  }
}

for (const pair of [
  ['family', FAMILY_MISSION_TEMPLATES],
  ['school', SCHOOL_MISSION_TEMPLATES],
]) {
  const label = pair[0];
  const missions = pair[1];
  for (const mission of missions) {
    if (!mission.title || !mission.text || !mission.duration) {
      errors.push(label + ' mission ' + mission.id + ': missing content');
    }
    if (!Array.isArray(mission.powerKeys) || mission.powerKeys.length < 2) {
      errors.push(label + ' mission ' + mission.id + ': needs at least 2 power keys');
    }
    if (!Number.isFinite(Number(mission.dueDays)) || Number(mission.dueDays) <= 0) {
      errors.push(label + ' mission ' + mission.id + ': invalid dueDays');
    }
    if (!mission.evidencePrompt) {
      warnings.push(label + ' mission ' + mission.id + ': no optional evidence prompt');
    }
  }
}

weeklyQuests.forEach((quest, index) => {
  if (quest.week !== index + 1) errors.push('weekly quest ' + quest.id + ': unexpected week number');
  if (!Array.isArray(quest.steps) || quest.steps.length !== 4) {
    errors.push('weekly quest ' + quest.id + ': expected 4 steps');
  }
  if (!quest.reflection) errors.push('weekly quest ' + quest.id + ': missing reflection');
});

const choiceWorlds = new Set(
  Object.values(expandedNodes)
    .filter((node) => node.type === 'choice')
    .map((node) => node.world)
    .filter(Boolean),
);

for (const world of choiceWorlds) {
  if (!immersiveSceneConfig[world]) {
    warnings.push('choice world ' + world + ': no immersive scene config');
  }
}

for (const entry of Object.entries(immersiveSceneConfig)) {
  const world = entry[0];
  const config = entry[1];
  if (!config || !config.agent) errors.push('scene ' + world + ': missing agent placement');
  if (config && config.agent && !Number.isFinite(Number(config.agent.left))) {
    errors.push('scene ' + world + ': invalid agent.left');
  }
  if (config && config.agent && !Number.isFinite(Number(config.agent.ground))) {
    errors.push('scene ' + world + ': invalid agent.ground');
  }

  const anchors = Array.isArray(config?.anchors) && config.anchors.length
    ? config.anchors
    : [config?.agent].filter(Boolean);

  if (anchors.length < 2) {
    warnings.push('scene ' + world + ': only one semantic anchor');
  }

  anchors.forEach((anchor, index) => {
    const prefix = 'scene ' + world + ' anchor ' + index;
    if (!Number.isFinite(Number(anchor.left)) || anchor.left < 10 || anchor.left > 90) {
      errors.push(prefix + ': left must stay inside 10-90');
    }
    if (!Number.isFinite(Number(anchor.ground)) || anchor.ground < 35 || anchor.ground > 72) {
      errors.push(prefix + ': ground must stay inside 35-72');
    }
    if (!Number.isFinite(Number(anchor.width)) || anchor.width < 10 || anchor.width > 26) {
      errors.push(prefix + ': width must stay inside 10-26');
    }
  });

  (config?.specialAnchors || []).forEach((anchor, index) => {
    const prefix = 'scene ' + world + ' special anchor ' + index;
    if (!Number.isFinite(Number(anchor.left)) || anchor.left < 10 || anchor.left > 90) {
      errors.push(prefix + ': left must stay inside 10-90');
    }
    if (!Number.isFinite(Number(anchor.ground)) || anchor.ground < 35 || anchor.ground > 65) {
      errors.push(prefix + ': ground must stay inside 35-65');
    }
    if (!Number.isFinite(Number(anchor.width)) || anchor.width < 10 || anchor.width > 24) {
      errors.push(prefix + ': width must stay inside 10-24');
    }
  });
}

const roles = new Set(pilotAccounts.map((account) => account.role));
for (const role of ['student', 'family', 'school', 'admin']) {
  if (!roles.has(role)) errors.push('pilot accounts: missing ' + role + ' role');
}

if (!pilotSchools.length) errors.push('pilot directory: no schools');
if (!pilotClasses.length) errors.push('pilot directory: no classes');
if (!pilotStudents.length) errors.push('pilot directory: no students');
if (!pilotGuardians.length) errors.push('pilot directory: no guardians');
if (!pilotStaff.length) errors.push('pilot directory: no staff');

for (const student of pilotStudents) {
  if (!pilotClasses.some((item) => item.id === student.classId)) {
    errors.push('pilot student ' + student.id + ': invalid classId ' + student.classId);
  }
  if (!pilotSchools.some((item) => item.id === student.schoolId)) {
    errors.push('pilot student ' + student.id + ': invalid schoolId ' + student.schoolId);
  }
  for (const guardianId of student.guardianIds || []) {
    if (!pilotGuardians.some((item) => item.id === guardianId)) {
      errors.push('pilot student ' + student.id + ': invalid guardian ' + guardianId);
    }
  }
}

if (warnings.length) {
  console.warn('\nÓrbita V4 QA warnings:\n');
  warnings.forEach((warning) => console.warn('- ' + warning));
}

if (errors.length) {
  console.error('\nÓrbita V4 QA failed:\n');
  errors.forEach((error) => console.error('- ' + error));
  process.exit(1);
}

console.log(
  'Órbita V4 QA OK: ' + dailyMissions.length + ' daily missions, ' +
  FAMILY_MISSION_TEMPLATES.length + ' family missions, ' +
  SCHOOL_MISSION_TEMPLATES.length + ' school missions, ' +
  weeklyQuests.length + ' weekly quests, ' +
  choiceWorlds.size + ' choice worlds.'
);

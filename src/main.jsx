import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { assets } from './game/data/assets';
import { agents } from './game/data/gameData';
import { agentStartNode, expandedNodes, inventoryItemsExpanded, missionsExpanded, tradeoffsExpanded } from './game/data/expandedTree';
import { addScores, emptyScores, getCharacterName, rankScores } from './game/logic/scoring';
import {
  startPlayerJourney,
  recordChoice,
  recordInventory,
  recordItemUse,
  recordTradeoff,
  recordPowerCard,
  recordMission,
} from './game/engine/rpgEngine';
import { getTopPowers } from './game/player/playerProfile';
import RoleSwitcher from './app/RoleSwitcher';
import FamilyPortal from './family/FamilyPortal';
import MunicipalityDashboard from './municipality/MunicipalityDashboard';
import { buildDemoStudent } from './mock/demoStudent';
import { mockMunicipality, mockOpportunities, mockPublicSignals } from './mock/municipality';
import { scenarioOptions, OrbitaWordmark, MobileBottomNav } from './game/ui/MobileUI';
import { missionForDate } from './game/data/dailyMissions';
import {
  completeDailyMission,
  emptyV4State,
  localDateKey,
  markDailyComplete,
  normalizeV4State,
  weeklyCompletionCount,
} from './game/engine/dailyEngine';
import { V4Home, DailyMissionView } from './game/ui/V4UI';
import ImmersiveScene, { canUseImmersiveScene } from './game/ui/ImmersiveScene';
import './styles.css';
import './portals.css';
import './v4.css';
import './immersive-game.css';

function AgentSelect({ onStart, onContinue, onV4Demo, hasSave, onModeChange }) {
  const [selectedAgentId, setSelectedAgentId] = useState('kira');
  const [selectedScenarioId, setSelectedScenarioId] = useState('escola');

  const selectedAgent = agents.find((item) => item.id === selectedAgentId) || agents[0];
  const selectedScenario = scenarioOptions.find((item) => item.id === selectedScenarioId) || scenarioOptions[0];

  return (
    <main className="mobileStartPage">
      <section className="mobileStartShell">
        <header className="mobileStartTop">
          <button className="mobileRoundButton" type="button" aria-label="Menu">☰</button>
          <OrbitaWordmark />
          <div className="mobileLevelPill">
            <span>✦</span>
            <div>
              <strong>Nível 1</strong>
              <i><em style={{ width: '12%' }} /></i>
            </div>
          </div>
        </header>

        <div className="mobileStartIntro">
          <div className="gameBadge">Sua jornada começa aqui</div>
          <h1>Escolha seu <span>agente</span></h1>
          <p>Cada agente enxerga desafios de um jeito. Escolha quem vai acompanhar você nesta missão.</p>
        </div>

        <div className="mobileAgentCarousel" role="list" aria-label="Agentes Órbita">
          {agents.map((agent) => {
            const active = agent.id === selectedAgent.id;
            return (
              <button
                type="button"
                className={`mobileAgentCard ${active ? 'active' : ''} mobileAgentCard-${agent.id}`}
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
              >
                <div className="mobileAgentImageWrap">
                  <img src={assets.agents[agent.id]} alt="" />
                </div>
                <span>{agent.role}</span>
                <strong>{agent.name}</strong>
                <small>{agent.phrase}</small>
              </button>
            );
          })}
        </div>

        <section className="mobileScenarioSection">
          <div className="mobileSectionHeading">
            <div>
              <span className="mobileSectionIcon">⌖</span>
              <strong>Escolha um cenário</strong>
            </div>
            <small>Situações da sua vida real</small>
          </div>

          <div className="mobileScenarioRail">
            {scenarioOptions.map((scenario) => (
              <button
                type="button"
                key={scenario.id}
                className={selectedScenario.id === scenario.id ? 'active' : ''}
                onClick={() => setSelectedScenarioId(scenario.id)}
              >
                <span>{scenario.icon}</span>
                <strong>{scenario.label}</strong>
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          className="mobilePrimaryCta"
          onClick={() => onStart(selectedAgent, selectedScenario)}
        >
          <span className="mobilePlayIcon">▶</span>
          <span>
            <strong>Começar missão</strong>
            <small>{selectedScenario.label} · com {selectedAgent.name}</small>
          </span>
          <b>›</b>
        </button>

        {hasSave && (
          <button className="mobileContinueButton" type="button" onClick={onContinue}>
            Continuar de onde parei
          </button>
        )}

        {onV4Demo && (
          <button
            className="mobileContinueButton"
            type="button"
            onClick={() => onV4Demo(selectedAgent, selectedScenario)}
          >
            Ver demo da jornada contínua
          </button>
        )}

        <RoleSwitcher mode="student" onChange={onModeChange} />
        <MobileBottomNav active="inicio" />
      </section>
    </main>
  );
}

function JourneyTrail({ path, current }) {
  const route = [...path, current].slice(-6);

  return (
    <div className="compactTrail">
      {route.map((step, index) => {
        const active = index === route.length - 1;

        return (
          <div className={`compactStep ${active ? 'active' : 'done'}`} key={`${step}-${index}`}>
            <span>{index + 1}</span>
            <small>{step}</small>
          </div>
        );
      })}
    </div>
  );
}


function getAgentLine(agentId, nodeType, chapter) {
  if (nodeType === 'inventory') {
    return 'Escolha só o que você realmente levaria para essa missão.';
  }

  if (nodeType === 'tradeoff') {
    return 'Toda escolha boa deixa alguma coisa para trás. Repara no que você prioriza.';
  }

  if (nodeType === 'mission') {
    return 'Agora escolha uma missão que faça sentido para o caminho que você abriu.';
  }

  if (chapter.includes('Boss')) {
    return 'Quando a pressão aparece, o seu jeito de agir fica mais visível.';
  }

  if (chapter.includes('Impacto')) {
    return 'Uma boa escolha também considera quem pode ser afetado por ela.';
  }

  if (chapter.includes('Alinhamento')) {
    return 'A missão fica mais forte quando o grupo entende o caminho.';
  }

  if (chapter.includes('Primeiro Passo')) {
    return 'Não precisa resolver tudo. Mostre o primeiro movimento.';
  }

  if (chapter.includes('Revelação')) {
    return 'Olhe para o caminho. O padrão começa a aparecer.';
  }

  if (chapter.includes('Espelho') || chapter.includes('Padrão')) {
    return 'Quando uma pista se repete, ela deixa de ser detalhe e vira sinal.';
  }

  if (chapter.includes('Viés') || chapter.includes('Contexto')) {
    return 'A tecnologia responde. Você decide se a resposta faz sentido no mundo real.';
  }

  if (chapter.includes('Ruído') || chapter.includes('Papéis')) {
    return 'Grupo sem escuta vira barulho. Grupo com papel vira caminho.';
  }

  if (chapter.includes('Excesso') || chapter.includes('Filtro')) {
    return 'Criar também é escolher o que deixar de fora.';
  }

  if (chapter.includes('Falha') || chapter.includes('Iteração')) {
    return 'Erro bom é aquele que mostra o próximo ajuste.';
  }

  if (chapter.includes('Pressão') || chapter.includes('Limite')) {
    return 'Quando todo mundo acelera, perceber limites vira superpoder.';
  }

  if (chapter.includes('Sinal') || chapter.includes('Prioridade')) {
    return 'Dados só ajudam quando você sabe qual pergunta está tentando responder.';
  }

  if (chapter.includes('Dúvida') || chapter.includes('Reenquadramento')) {
    return 'Não é sobre parecer pronto. É sobre conseguir ajustar o caminho.';
  }

  if (chapter.includes('Névoa') || chapter.includes('Sinal ou Ruído') || chapter.includes('Coragem')) {
    return 'Nem todo sinal é resposta. Às vezes o superpoder é investigar sem pressa.';
  }

  if (chapter.includes('Fonte') || chapter.includes('Humana') || chapter.includes('Ético') || chapter.includes('Prompt')) {
    return 'IA ajuda, mas você ainda precisa fazer a pergunta certa e revisar o impacto.';
  }

  if (chapter.includes('Confiança') || chapter.includes('Reparo') || chapter.includes('Voto')) {
    return 'Quando existe pressão social, clareza e escuta viram ferramentas.';
  }

  if (chapter.includes('Referências') || chapter.includes('Original') || chapter.includes('Feedback')) {
    return 'Criatividade forte não nasce do nada. Ela mistura referência, intenção e teste.';
  }

  if (chapter.includes('Materiais') || chapter.includes('Estresse') || chapter.includes('Lançamento')) {
    return 'Construir é escolher o que testar primeiro, não esperar a solução perfeita.';
  }

  if (chapter.includes('Empatia') || chapter.includes('Microação') || chapter.includes('Reparo')) {
    return 'Cuidar também é perceber pequenos sinais antes que virem grandes problemas.';
  }

  if (chapter.includes('Sistema') || chapter.includes('Recursos') || chapter.includes('Cenário')) {
    return 'Problemas grandes pedem leitura de sistema, não só uma solução bonita.';
  }

  if (chapter.includes('Tempo') || chapter.includes('Foco')) {
    return 'Quando o tempo aperta, o que você preserva revela sua prioridade.';
  }

  if (chapter.includes('Mural')) {
    return 'O caminho que você repetiu começa a mostrar seu padrão de força.';
  }

  const lines = {
    luma: 'Olhe com calma. Toda fase tem uma pista escondida.',
    nexo: 'Veja onde existem pontes possíveis entre as pessoas.',
    kira: 'Talvez a melhor saída seja imaginar de outro jeito.',
    teo: 'Escolha o caminho que dá vontade de testar na prática.',
    zuri: 'Preste atenção em quem pode ficar para trás nessa fase.',
    orin: 'Procure a rota que transforma bagunça em caminho.',
    vega: 'Antes de avançar, veja onde estão os riscos e limites.',
    mio: 'Uma escolha também é um jeito de contar uma história.',
  };

  return lines[agentId] || 'Escolha o caminho que mais chama sua atenção.';
}


function AgentLiveCard({ agent, inventory = [], powerTokens = {}, usedPowerCards = [] }) {
  const powerLabels = {
    investigar: 'Investigar',
    criar: 'Criar',
    cuidar: 'Cuidar',
    construir: 'Construir',
    comunicar: 'Comunicar',
    organizar: 'Organizar',
    proteger: 'Proteger',
    conectar: 'Conectar',
  };

  const tokenEntries = Object.entries(powerTokens)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const maxToken = Math.max(...tokenEntries.map(([, value]) => value), 1);

  return (
    <aside className={`agentLiveCard agentLiveCard-${agent.id}`}>
      <img className="agentLiveFrame" src={assets.v2.playerCardFrame} alt="" />

      <div className="agentLiveContent">
        <div className="agentLiveHero">
          <div className="agentLiveAvatarBox">
            <img className="agentLiveAvatar" src={assets.agents[agent.id]} alt="" />
          </div>

          <div className="agentLiveName">
            <span>Agente Órbita</span>
            <strong>{agent.name}</strong>
          </div>
        </div>

        <div className="agentLiveSection agentLivePowerSection">
          <b>Poderes disponíveis</b>
          <div className="agentLivePowerBars">
            {tokenEntries.length ? tokenEntries.map(([key, value]) => (
              <div className="agentPowerBar" key={key}>
                <img src={assets.badges[key]} alt="" />
                <span>{powerLabels[key] || key}</span>
                <i><em style={{ width: `${Math.max(18, (value / maxToken) * 100)}%` }} /></i>
                <strong>{value}</strong>
              </div>
            )) : (
              <small>Suas escolhas começam a carregar estes poderes.</small>
            )}
          </div>
        </div>

        <div className="agentLiveMeta">
          <div className="agentLiveSection">
            <b>Mochila</b>
            <div className="agentLiveItems">
              {inventory.length ? inventory.slice(0, 4).map((item) => (
                <img key={item.id} src={assets.items[item.id]} alt={item.label} title={item.label} />
              )) : <small>vazia</small>}
            </div>
          </div>

          <div className="agentLiveSection">
            <b>Cartas</b>
            <div className="agentLiveCards">
              {usedPowerCards.length ? (
                <strong>{usedPowerCards.length}</strong>
              ) : (
                <small>0</small>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}


function MyOrbita({ agent, profile, inventory = [], usedPowerCards = [], onClose, onModeChange }) {
  if (!profile) return null;

  const powerLabels = {
    investigar: 'Investigar',
    criar: 'Criar',
    cuidar: 'Cuidar',
    construir: 'Construir',
    comunicar: 'Comunicar',
    organizar: 'Organizar',
    proteger: 'Proteger',
    conectar: 'Conectar',
  };

  const rankedPowers = Object.entries(profile.powers || {})
    .map(([key, value]) => ({ key, value, label: powerLabels[key] || key }))
    .sort((a, b) => b.value - a.value);

  const topPowers = getTopPowers(profile, 3);
  const maxPower = Math.max(...rankedPowers.map((power) => power.value), 1);
  const allEvents = profile.events || [];
  const recentEvents = [...allEvents].slice(-5).reverse();
  const signalSources = allEvents.reduce((acc, event) => {
    if (event.type === 'daily_mission') {
      const territory = event.meta?.territory || 'mundo';
      acc[territory] = (acc[territory] || 0) + 1;
    } else if (event.type === 'real_life_experience') {
      acc.experiencias = (acc.experiencias || 0) + 1;
    } else {
      acc.jogo = (acc.jogo || 0) + 1;
    }
    return acc;
  }, { jogo: 0, escola: 0, casa: 0, mundo: 0, experiencias: 0 });

  const powerSignalDetails = rankedPowers.map((power) => ({
    ...power,
    signals: allEvents.filter((event) => Number(event.powers?.[power.key] || 0) > 0).length,
    dailySignals: allEvents.filter(
      (event) => event.type === 'daily_mission' && Number(event.powers?.[power.key] || 0) > 0,
    ).length,
    realExperiences: allEvents.filter(
      (event) => event.type === 'real_life_experience' && Number(event.powers?.[power.key] || 0) > 0,
    ).length,
  }));

  const nextLevelAt = (profile.progression?.level || 1) * 100;
  const currentLevelStart = Math.max(0, nextLevelAt - 100);
  const levelProgress = Math.min(
    100,
    Math.max(0, (((profile.progression?.xp || 0) - currentLevelStart) / 100) * 100),
  );

  return (
    <main className="gamePage myOrbitaPage">
      <section className="myOrbitaShell">
        <RoleSwitcher mode="student" onChange={onModeChange} />
        <header className="myOrbitaHeader">
          <div>
            <div className="gameBadge">Meu Órbita</div>
            <h1>Seu mapa está ganhando forma.</h1>
            <p>
              Aqui aparecem os padrões que surgem no jogo e nas experiências que você registra.
              Eles podem mudar conforme você experimenta novos contextos, missões e atividades.
            </p>
          </div>

          <button className="sceneAction myOrbitaBack" onClick={onClose}>Voltar ao jogo</button>
        </header>

        <section className="myOrbitaHeroGrid">
          <article className="myOrbitaAgentCard">
            <div className="myOrbitaAgentArt">
              <img src={assets.agents[agent.id]} alt="" />
            </div>
            <div className="myOrbitaAgentCopy">
              <span>Agente atual</span>
              <h2>{agent.name}</h2>
              <p>{agent.role}</p>
              <small>{agent.phrase}</small>
            </div>
          </article>

          <article className="myOrbitaLevelCard">
            <span>Progressão</span>
            <strong>Nível {profile.progression?.level || 1}</strong>
            <b>{profile.progression?.xp || 0} XP</b>
            <div className="myOrbitaXpTrack">
              <i style={{ width: `${levelProgress}%` }} />
            </div>
            <small>Próximo nível em {Math.max(0, nextLevelAt - (profile.progression?.xp || 0))} XP</small>
          </article>
        </section>

        <section className="myOrbitaSection">
          <div className="myOrbitaSectionTitle">
            <span>Seus sinais mais fortes agora</span>
            <small>Não é um rótulo. É um retrato desta jornada.</small>
          </div>

          <div className="myOrbitaTopPowers">
            {topPowers.map((power, index) => (
              <article className="myOrbitaPowerHero" key={power.key}>
                <span>0{index + 1}</span>
                <img src={assets.badges[power.key]} alt="" />
                <strong>{powerLabels[power.key] || power.key}</strong>
                <b>{power.value}</b>
              </article>
            ))}
          </div>

          <div className="myOrbitaPowerList">
            {rankedPowers.map((power) => (
              <div className="myOrbitaPowerRow" key={power.key}>
                <span>{power.label}</span>
                <div><i style={{ width: `${Math.max(6, (power.value / maxPower) * 100)}%` }} /></div>
                <b>{power.value}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="myOrbitaSection myOrbitaLiveMap">
          <div className="myOrbitaSectionTitle">
            <span>Mapa Vivo</span>
            <small>O importante é a recorrência em contextos diferentes, não uma resposta isolada.</small>
          </div>

          <div className="myOrbitaSourceGrid">
            {[
              ['Jogo', signalSources.jogo],
              ['Escola', signalSources.escola],
              ['Casa', signalSources.casa],
              ['Mundo', signalSources.mundo],
              ['Experiências', signalSources.experiencias],
            ].map(([label, value]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>sinais</small>
              </article>
            ))}
          </div>

          <div className="myOrbitaEvidenceList">
            {powerSignalDetails.slice(0, 4).map((power) => (
              <div key={power.key}>
                <img src={assets.badges[power.key]} alt="" />
                <span>
                  <strong>{power.label}</strong>
                  <small>
                    {power.signals} sinais · {power.dailySignals} em missões do dia · {power.realExperiences} experiências reais
                  </small>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="myOrbitaSection myOrbitaPassport">
          <div className="myOrbitaSectionTitle">
            <span>Passaporte Órbita</span>
            <small>Um histórico do que você explora — não um rótulo sobre quem você é.</small>
          </div>

          <div className="myOrbitaPassportGrid">
            <article>
              <span>Meus superpoderes</span>
              <strong>{topPowers.map((power) => powerLabels[power.key] || power.key).join(' · ') || 'Em construção'}</strong>
            </article>
            <article>
              <span>Minhas experiências</span>
              <strong>{profile.experiences?.length || 0} registradas</strong>
            </article>
            <article>
              <span>Minhas conquistas</span>
              <strong>{profile.achievements?.length || 0} desbloqueadas</strong>
            </article>
            <article>
              <span>Próximos caminhos</span>
              <strong>Experimentar contextos diferentes</strong>
            </article>
          </div>
        </section>

        <section className="myOrbitaColumns">
          <article className="myOrbitaPanel">
            <span className="myOrbitaPanelLabel">Mochila</span>
            <div className="myOrbitaInventory">
              {inventory.length ? inventory.map((item) => (
                <div key={item.id}>
                  <img src={assets.items[item.id]} alt="" />
                  <small>{item.label}</small>
                </div>
              )) : <p>Você ainda vai montar sua mochila.</p>}
            </div>
          </article>

          <article className="myOrbitaPanel">
            <span className="myOrbitaPanelLabel">Cartas jogadas</span>
            <div className="myOrbitaPlayedCards">
              {usedPowerCards.length ? usedPowerCards.map((card, index) => (
                <div key={`${card.key}-profile-${index}`}>
                  <strong>{card.title}</strong>
                  <small>{card.action}</small>
                </div>
              )) : <p>Suas cartas usadas vão aparecer aqui.</p>}
            </div>
          </article>
        </section>

        <section className="myOrbitaColumns">
          <article className="myOrbitaPanel">
            <span className="myOrbitaPanelLabel">Conquistas</span>
            {(profile.achievements || []).length ? (
              <div className="myOrbitaAchievements">
                {profile.achievements.slice(-4).reverse().map((achievement) => (
                  <div key={achievement.id}>
                    <img src={assets.v2.rewardLevel} alt="" />
                    <span>{achievement.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Complete missões para desbloquear conquistas.</p>
            )}
          </article>

          <article className="myOrbitaPanel">
            <span className="myOrbitaPanelLabel">Últimos movimentos</span>
            <div className="myOrbitaTimeline">
              {recentEvents.map((event) => (
                <div key={event.id}>
                  <i />
                  <span>
                    <strong>{event.label || 'Movimento da jornada'}</strong>
                    <small>+{event.xp || 0} XP</small>
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="myOrbitaRealLife">
          <div>
            <span>Próxima camada</span>
            <h2>O jogo também vai conversar com o mundo real.</h2>
            <p>
              Esporte, cultura, tecnologia, projetos e experiências da escola poderão
              entrar aqui como novas experiências do seu Passaporte Órbita.
            </p>
          </div>
          <div className="myOrbitaRealLifeTags">
            <span>Escola</span>
            <span>Esporte</span>
            <span>Cultura</span>
            <span>Tecnologia</span>
            <span>Comunidade</span>
          </div>
        </section>
      </section>
    </main>
  );
}


function SceneShell({ agent, node, visitedCount, inventory, powerTokens, usedPowerCards, playerProfile, onSave, onOpenProfile, justSaved, children }) {
  const topPowers = Object.entries(powerTokens || {})
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <main className="mobileMissionPage">
      <section className="mobileMissionShell">
        <header className="mobileMissionTop">
          <button className="mobileRoundButton mobileBackDisabled" type="button" disabled aria-label="Voltar">‹</button>
          <OrbitaWordmark compact />
          <button className="mobileSaveButton" type="button" onClick={onSave}>
            <span>▣</span> Salvar
          </button>
          <div className="mobileStagePill">
            <span>Etapa {Math.max(1, visitedCount)} de 40+</span>
            <i><em style={{ width: `${Math.min(100, Math.max(5, (visitedCount / 40) * 100))}%` }} /></i>
          </div>
        </header>

        {justSaved && <div className="mobileSaveToast">Progresso salvo</div>}

        <section className={`mobileWorldHero mobileWorld-${node.world}`}>
          <img className="mobileWorldImage" src={assets.worlds[node.world]} alt="" />

          <aside className="mobileAgentHud">
            <div className="mobileAgentHudPortrait">
              <img src={assets.agents[agent.id]} alt="" />
            </div>
            <div className="mobileAgentHudName">
              <span>Agente Órbita</span>
              <strong>{agent.name}</strong>
            </div>

            <div className="mobileAgentHudStats">
              {topPowers.length ? topPowers.map(([key, value]) => (
                <div key={key}>
                  <img src={assets.badges[key]} alt="" />
                  <i><em style={{ width: `${Math.min(100, 24 + value * 14)}%` }} /></i>
                </div>
              )) : (
                <small>Seus poderes vão aparecer aqui.</small>
              )}
            </div>

            <div className="mobileAgentHudInventory">
              <span>Mochila</span>
              <div>
                {inventory.slice(0, 3).map((item) => (
                  <img key={item.id} src={assets.items[item.id]} alt={item.label} />
                ))}
                {!inventory.length && <small>vazia</small>}
              </div>
            </div>
          </aside>
        </section>

        <section className="mobileDecisionPanel">
          <div className="mobileLocationTag">{node.chapter}</div>
          <h1>{node.title}</h1>
          <p>{node.text}</p>
          {children}
        </section>

        <MobileBottomNav active="missao" onProfile={onOpenProfile} onSave={onSave} />
      </section>
    </main>
  );
}

function ChoiceNode({ node, onChoose }) {
  const uniqueChoices = Array.from(new Map((node.choices || []).map((choice) => [choice.label, choice])).values());
  const icons = ['●', '◆', '⌕'];

  return (
    <div className="mobileChoices">
      {uniqueChoices.map((choice, index) => (
        <button className="mobileChoiceButton" key={choice.label} onClick={() => onChoose(choice)}>
          <span className="mobileChoiceIcon">{icons[index % icons.length]}</span>
          <span>{choice.label}</span>
          <b>›</b>
        </button>
      ))}
    </div>
  );
}

function InventoryNode({ selected, onToggle, onContinue }) {
  return (
    <div className="mobileKitBlock">
      <div className="mobileKitHeading">
        <div>
          <span>▣</span>
          <strong>Seu kit da missão</strong>
        </div>
        <small>Escolha 4 itens</small>
      </div>

      <div className="mobileInventoryRail">
        {inventoryItemsExpanded.map((item) => {
          const active = selected.some((selectedItem) => selectedItem.id === item.id);

          return (
            <button
              className={`mobileItemCard ${active ? 'selected' : ''}`}
              key={item.id}
              onClick={() => onToggle(item)}
            >
              <img src={assets.items[item.id]} alt="" />
              <strong>{item.label}</strong>
              <small>{active ? 'Selecionado' : 'Toque para levar'}</small>
            </button>
          );
        })}
      </div>

      <button className="mobilePrimaryCta mobileKitCta" disabled={selected.length !== 4} onClick={onContinue}>
        <span className="mobilePlayIcon">✓</span>
        <span>
          <strong>Pronto para jogar</strong>
          <small>{selected.length}/4 itens escolhidos</small>
        </span>
        <b>›</b>
      </button>
    </div>
  );
}


function UseItemNode({ inventory, usedItems, onChoose }) {
  const visibleInventory = inventory.length ? inventory : inventoryItemsExpanded.slice(0, 4);
  const currentItem = visibleInventory.find((item) => !usedItems.some((used) => used.id === item.id)) || visibleInventory[0];

  const itemPrompts = {
    lanterna: [
      { label: 'Iluminar o que ninguém quis ver', powers: { investigar: 2, proteger: 1 } },
      { label: 'Checar se a pista é real', powers: { investigar: 3 } },
      { label: 'Mostrar a evidência para o grupo', powers: { comunicar: 1, investigar: 2 } },
    ],
    escudo: [
      { label: 'Proteger quem pode ser exposto', powers: { proteger: 3 } },
      { label: 'Criar um limite seguro para continuar', powers: { proteger: 2, organizar: 1 } },
      { label: 'Cuidar antes de acelerar', powers: { cuidar: 2, proteger: 1 } },
    ],
    microfone: [
      { label: 'Explicar o problema em voz alta', powers: { comunicar: 3 } },
      { label: 'Fazer uma pergunta que destrava o grupo', powers: { comunicar: 2, conectar: 1 } },
      { label: 'Dar voz para quem ficou quieto', powers: { cuidar: 1, comunicar: 2 } },
    ],
    mapa: [
      { label: 'Organizar o caminho em etapas', powers: { organizar: 3 } },
      { label: 'Separar causa, efeito e prioridade', powers: { organizar: 2, investigar: 1 } },
      { label: 'Criar uma rota segura até a solução', powers: { organizar: 2, proteger: 1 } },
    ],
    ferramenta: [
      { label: 'Construir um primeiro teste simples', powers: { construir: 3 } },
      { label: 'Consertar a parte que quebrou', powers: { construir: 2, investigar: 1 } },
      { label: 'Transformar ideia em ação pequena', powers: { construir: 2, criar: 1 } },
    ],
    pincel: [
      { label: 'Desenhar uma alternativa inesperada', powers: { criar: 3 } },
      { label: 'Transformar o problema em imagem', powers: { criar: 2, comunicar: 1 } },
      { label: 'Criar uma versão mais humana da solução', powers: { criar: 2, cuidar: 1 } },
    ],
    chave: [
      { label: 'Abrir um atalho com cuidado', powers: { construir: 1, investigar: 2 } },
      { label: 'Testar uma passagem que ninguém tentou', powers: { construir: 2, criar: 1 } },
      { label: 'Descobrir o que estava travando a fase', powers: { investigar: 2, organizar: 1 } },
    ],
    corda: [
      { label: 'Puxar alguém para dentro da missão', powers: { conectar: 3 } },
      { label: 'Amarrar duas ideias que pareciam distantes', powers: { conectar: 2, criar: 1 } },
      { label: 'Ajudar o grupo a atravessar junto', powers: { conectar: 2, cuidar: 1 } },
    ],
    bussola: [
      { label: 'Escolher direção antes de correr', powers: { organizar: 2, conectar: 1 } },
      { label: 'Alinhar o grupo em torno de um norte', powers: { conectar: 2, comunicar: 1 } },
      { label: 'Voltar para o objetivo principal', powers: { organizar: 3 } },
    ],
    relogio: [
      { label: 'Ganhar tempo antes de reagir', powers: { cuidar: 2, organizar: 1 } },
      { label: 'Separar urgência de importância', powers: { organizar: 2, proteger: 1 } },
      { label: 'Reduzir a pressa para decidir melhor', powers: { cuidar: 1, investigar: 2 } },
    ],
    lupa: [
      { label: 'Aproximar o olhar do detalhe crítico', powers: { investigar: 3 } },
      { label: 'Checar o que parece certo demais', powers: { investigar: 2, proteger: 1 } },
      { label: 'Encontrar a pergunta escondida', powers: { investigar: 2, comunicar: 1 } },
    ],
    coringa: [
      { label: 'Criar uma virada inesperada', powers: { criar: 2, comunicar: 1 } },
      { label: 'Conectar duas soluções improváveis', powers: { conectar: 2, criar: 1 } },
      { label: 'Improvisar sem perder o objetivo', powers: { construir: 1, criar: 1, organizar: 1 } },
    ],
  };

  const prompts = itemPrompts[currentItem?.id] || [
    { label: currentItem?.useText || 'Usar este item para avançar', powers: currentItem?.powers || {} },
  ];

  return (
    <div className="mobileUseItemStage">
      <div className="mobileKitHeading">
        <div>
          <span>✦</span>
          <strong>Use um item</strong>
        </div>
        <small>{Math.min(usedItems.length + 1, visibleInventory.length)}/{visibleInventory.length}</small>
      </div>

      <div className="mobileActiveItem">
        <div className="mobileActiveItemArt">
          <img src={assets.items[currentItem.id]} alt="" />
        </div>
        <div>
          <span>Item atual</span>
          <strong>{currentItem.label}</strong>
          <p>{currentItem.useText}</p>
        </div>
      </div>

      <div className="mobileChoices mobileItemChoices">
        {prompts.map((prompt, index) => (
          <button
            className="mobileChoiceButton"
            key={prompt.label}
            onClick={() => onChoose(currentItem, prompt)}
          >
            <span className="mobileChoiceIcon">{['✦','◆','⌕'][index % 3]}</span>
            <span>{prompt.label}</span>
            <b>›</b>
          </button>
        ))}
      </div>
    </div>
  );
}

function TradeoffNode({ selected, onToggle, onContinue }) {
  return (
    <div className="mobileTradeoffStage">
      <div className="mobileKitHeading">
        <div>
          <span>⇄</span>
          <strong>Escolha o que preservar</strong>
        </div>
        <small>{selected.length}/2</small>
      </div>

      <div className="mobileTradeoffGrid">
        {tradeoffsExpanded.map((tradeoff) => {
          const active = selected.some((item) => item.id === tradeoff.id);

          return (
            <button
              className={`mobileTradeoffCard ${active ? 'selected' : ''}`}
              key={tradeoff.id}
              onClick={() => onToggle(tradeoff)}
            >
              <span>{active ? '✓' : '○'}</span>
              <strong>{tradeoff.label}</strong>
            </button>
          );
        })}
      </div>

      <button className="mobilePrimaryCta mobileKitCta" disabled={selected.length !== 2} onClick={onContinue}>
        <span className="mobilePlayIcon">✓</span>
        <span>
          <strong>Abrir o portão</strong>
          <small>2 escolhas definem sua prioridade</small>
        </span>
        <b>›</b>
      </button>
    </div>
  );
}


const PLAYABLE_POWER_CARDS = {
  investigar: {
    key: 'investigar',
    title: 'Lupa Mental',
    label: 'Investigar',
    action: 'Encontrar a evidência que muda a decisão.',
    powers: { investigar: 3, organizar: 1 },
  },
  criar: {
    key: 'criar',
    title: 'Virada Criativa',
    label: 'Criar',
    action: 'Inventar uma alternativa que ainda não estava na mesa.',
    powers: { criar: 3, comunicar: 1 },
  },
  cuidar: {
    key: 'cuidar',
    title: 'Escuta Ativa',
    label: 'Cuidar',
    action: 'Perceber quem pode estar ficando para trás.',
    powers: { cuidar: 3, conectar: 1 },
  },
  construir: {
    key: 'construir',
    title: 'Protótipo Relâmpago',
    label: 'Construir',
    action: 'Transformar ideia em teste prático.',
    powers: { construir: 3, investigar: 1 },
  },
  comunicar: {
    key: 'comunicar',
    title: 'Mensagem Nítida',
    label: 'Comunicar',
    action: 'Explicar o problema de um jeito que destrava o grupo.',
    powers: { comunicar: 3, conectar: 1 },
  },
  organizar: {
    key: 'organizar',
    title: 'Plano em 3 Passos',
    label: 'Organizar',
    action: 'Separar caos em prioridade, sequência e ação.',
    powers: { organizar: 3, proteger: 1 },
  },
  proteger: {
    key: 'proteger',
    title: 'Zona Segura',
    label: 'Proteger',
    action: 'Criar um limite antes que alguém se machuque.',
    powers: { proteger: 3, cuidar: 1 },
  },
  conectar: {
    key: 'conectar',
    title: 'Ponte Humana',
    label: 'Conectar',
    action: 'Unir pessoas, ideias ou lados que estavam separados.',
    powers: { conectar: 3, comunicar: 1 },
  },
};

function PowerChallengeNode({ scores, powerTokens, usedPowerCards, onUse }) {
  const ranked = rankScores(scores);
  const usedKeys = usedPowerCards.map((card) => card.key);

  const cards = ranked
    .map((power) => PLAYABLE_POWER_CARDS[power.key])
    .filter(Boolean)
    .filter((card) => !usedKeys.includes(card.key))
    .slice(0, 6);

  const fallbackCards = Object.values(PLAYABLE_POWER_CARDS)
    .filter((card) => !usedKeys.includes(card.key))
    .slice(0, 4);

  const visibleCards = cards.length >= 3 ? cards : fallbackCards;

  return (
    <div className="mobilePowerStage">
      <div className="mobileKitHeading">
        <div>
          <span>⚡</span>
          <strong>Cartas especiais</strong>
        </div>
        <small>Use 1 pote</small>
      </div>

      <div className="mobileTokenRail">
        {Object.keys(PLAYABLE_POWER_CARDS).map((key) => (
          <div className="mobileTokenPill" key={key}>
            <img src={assets.badges[key]} alt="" />
            <span>{powerTokens[key] || 0}</span>
          </div>
        ))}
      </div>

      <div className="mobilePowerCards">
        {visibleCards.map((card) => {
          const tokenCount = powerTokens[card.key] || 0;
          const locked = tokenCount <= 0;

          return (
            <button
              className={`mobilePowerCard power-${card.key} ${locked ? 'lockedPowerCard' : ''}`}
              key={card.key}
              disabled={locked}
              onClick={() => onUse(card)}
            >
              <img src={assets.badges[card.key]} alt="" />
              <small>{card.label} · {tokenCount} pote{tokenCount === 1 ? '' : 's'}</small>
              <strong>{card.title}</strong>
              <p>{locked ? 'Ganhe este poder para liberar a carta.' : card.action}</p>
              <b>{locked ? 'Bloqueada' : 'Jogar carta'}</b>
            </button>
          );
        })}
      </div>
    </div>
  );
}


function MissionNode({ scores, onChoose }) {
  const ranked = rankScores(scores);
  const topKeys = ranked.slice(0, 3).map((power) => power.key);

  const relevantMissions = missionsExpanded
    .map((mission) => {
      const matchScore = Object.keys(mission.powers || {}).reduce((total, key) => {
        return total + (topKeys.includes(key) ? 1 : 0);
      }, 0);

      return { ...mission, matchScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);

  return (
    <div className="mobileMissionChoices">
      {relevantMissions.map((mission, index) => (
        <button className="mobileMissionChoice" key={mission.id} onClick={() => onChoose(mission)}>
          <span className="mobileMissionChoiceIndex">0{index + 1}</span>
          <div>
            <strong>{mission.label}</strong>
            <small>Combina com: {Object.keys(mission.powers).slice(0, 3).join(' · ')}</small>
          </div>
          <b>›</b>
        </button>
      ))}
    </div>
  );
}


function getDominantWorld(path) {
  const joined = path.join(' ').toLowerCase();

  const worlds = [
    { key: 'ai', label: 'Portal da IA', terms: ['ia', 'portal', 'verdade', 'laboratório'] },
    { key: 'forest', label: 'Floresta do Instinto', terms: ['floresta', 'pista'] },
    { key: 'bridge', label: 'Ponte da Conexão', terms: ['ponte', 'grupo', 'alinhamento'] },
    { key: 'studio', label: 'Estúdio das Ideias', terms: ['estúdio', 'criativo', 'ideia'] },
    { key: 'workshop', label: 'Oficina dos Inventores', terms: ['oficina', 'protótipo', 'primeiro passo'] },
    { key: 'schoolyard', label: 'Pátio da Escola', terms: ['pátio', 'impacto', 'vídeo'] },
    { key: 'city', label: 'Cidade do Futuro', terms: ['cidade', 'mapa'] },
    { key: 'boss', label: 'Boss da Apresentação', terms: ['boss', 'palco', 'pressão'] },
  ];

  const scored = worlds.map((world) => ({
    ...world,
    score: world.terms.reduce((total, term) => total + (joined.includes(term) ? 1 : 0), 0),
  }));

  return scored.sort((a, b) => b.score - a.score)[0]?.label || 'Tabuleiro Órbita';
}


function getNextTrails(topPowers) {
  const keys = topPowers.map((power) => power.key);
  const trails = [];

  if (keys.includes('investigar') || keys.includes('organizar')) {
    trails.push({
      title: 'Você percebe pistas antes dos outros',
      text: 'Seu próximo treino é aprender a fazer perguntas melhores, checar fontes, organizar ideias e usar IA sem cair em resposta pronta.',
    });
  }

  if (keys.includes('criar') || keys.includes('comunicar')) {
    trails.push({
      title: 'Você transforma ideia em coisa que dá para mostrar',
      text: 'Seu próximo treino é criar vídeos, mapas, protótipos, apresentações e histórias que fazem outras pessoas entenderem sua ideia.',
    });
  }

  if (keys.includes('cuidar') || keys.includes('conectar')) {
    trails.push({
      title: 'Você repara no clima da turma',
      text: 'Seu próximo treino é liderar sem mandar, escutar quem fala pouco e ajudar grupos a trabalharem melhor juntos.',
    });
  }

  if (keys.includes('construir') || keys.includes('proteger')) {
    trails.push({
      title: 'Você gosta de testar sem deixar tudo virar bagunça',
      text: 'Seu próximo treino é montar soluções pequenas, testar na prática, prever riscos e melhorar antes de mostrar para todo mundo.',
    });
  }

  return trails.slice(0, 3);
}

function getPowerCharacteristics(topPowers) {
  const keys = topPowers.map((power) => power.key);

  const traits = [];

  if (keys.includes('investigar')) traits.push('curiosidade estruturada');
  if (keys.includes('criar')) traits.push('imaginação aplicada');
  if (keys.includes('cuidar')) traits.push('atenção ao impacto humano');
  if (keys.includes('construir')) traits.push('vontade de testar na prática');
  if (keys.includes('comunicar')) traits.push('clareza para mobilizar pessoas');
  if (keys.includes('organizar')) traits.push('capacidade de transformar caos em plano');
  if (keys.includes('proteger')) traits.push('leitura de risco e responsabilidade');
  if (keys.includes('conectar')) traits.push('força para aproximar pessoas e ideias');

  return traits.slice(0, 4);
}


function getJourneyProfile(topPowers) {
  const keys = topPowers.map((power) => power.key);

  if (keys.includes('investigar') && keys.includes('proteger')) return 'Investigador de Riscos';
  if (keys.includes('criar') && keys.includes('construir')) return 'Criador de Protótipos';
  if (keys.includes('cuidar') && keys.includes('conectar')) return 'Articulador de Pessoas';
  if (keys.includes('organizar') && keys.includes('comunicar')) return 'Estrategista de Mensagem';
  if (keys.includes('proteger') && keys.includes('cuidar')) return 'Guardião de Impacto';
  if (keys.includes('investigar') && keys.includes('organizar')) return 'Mapeador de Problemas';
  if (keys.includes('comunicar') && keys.includes('criar')) return 'Narrador de Ideias';
  if (keys.includes('construir') && keys.includes('organizar')) return 'Executor de Soluções';

  return 'Explorador de Caminhos';
}

function PowerCard({
  agent,
  scores,
  mission,
  path,
  decisiveItem,
  usedPowerCards,
  playerProfile,
  onOpenProfile,
  onContinueJourney,
}) {
  const ranked = rankScores(scores);
  const top = ranked.slice(0, 3);
  const characterName = getCharacterName(top);
  const max = Math.max(...ranked.map((item) => item.value), 1);
  const dominantWorld = getDominantWorld(path);
  const journeyProfile = getJourneyProfile(top);
  const nextTrails = getNextTrails(top);
  const characteristics = getPowerCharacteristics(top);
  const level = playerProfile?.progression?.level || 1;
  const xp = playerProfile?.progression?.xp || 0;
  const experiences = playerProfile?.experiences || [];

  return (
    <main className="gamePage finalResultPage">
      <section className="finalResultShell">
        <header className="finalHeader finalHeaderV2">
          <div>
            <div className="gameBadge">Missão concluída</div>
            <h1>Seu mapa de superpoderes.</h1>
            <p>
              Esta é uma leitura da jornada que você acabou de viver. Não define quem você
              é para sempre — mostra padrões que apareceram nas suas escolhas.
            </p>
          </div>

          <div className="finalProgressChip">
            <span>Nível {level}</span>
            <strong>{xp} XP</strong>
          </div>
        </header>

        <div className="finalResultGrid">
          <article className="orbitaPowerCard orbitaPowerCardV2">
            <img className="finalCardFrameV2" src={assets.v2.playerCardFrame} alt="" />

            <div className="finalCardContentV2">
              <header className="orbitaCardHeader">
                <div>
                  <span>Card de jornada</span>
                  <h2>{characterName}</h2>
                  <p>{journeyProfile}</p>
                </div>
                <b className="finalLevelSeal">LV {level}</b>
              </header>

              <section className="orbitaHeroZone">
                <div className="heroAura" />
                <img className="orbitaHero" src={assets.agents[agent.id]} alt="" />
                <div className="finalAgentTag">{agent.name}</div>
              </section>

              <section className="orbitaBadges">
                {top.map((power, index) => (
                  <div className="orbitaBadgeSlot" key={power.key}>
                    <span>0{index + 1}</span>
                    <img src={assets.badges[power.key]} alt="" />
                    <strong>{power.label}</strong>
                    <b>{power.value}</b>
                  </div>
                ))}
              </section>

              <section className="orbitaMission finalMissionV2">
                <strong>Missão escolhida</strong>
                <p>{mission.label}</p>
              </section>

              {decisiveItem && (
                <section className="decisiveItemBox finalItemV2">
                  <img src={assets.items[decisiveItem.id]} alt="" />
                  <div>
                    <strong>Item decisivo</strong>
                    <p>{decisiveItem.label}</p>
                  </div>
                </section>
              )}
            </div>
          </article>

          <div className="finalInsights">
            <section className="finalInsightPanel finalTopSignals">
              <div className="finalPanelEyebrow">O que apareceu com mais força</div>
              <h2>Três sinais principais da sua jornada</h2>
              <div className="finalTopSignalList">
                {top.map((power) => (
                  <div key={power.key}>
                    <img src={assets.badges[power.key]} alt="" />
                    <span>
                      <strong>{power.label}</strong>
                      <small>{power.value} pontos nesta jornada</small>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="finalInsightPanel">
              <div className="finalPanelEyebrow">Seu jeito de avançar</div>
              <h2>{journeyProfile}</h2>
              <p>{characteristics.join(' · ')}</p>

              <div className="finalMetaCards">
                <div>
                  <span>Mundo dominante</span>
                  <strong>{dominantWorld}</strong>
                </div>
                <div>
                  <span>Cartas usadas</span>
                  <strong>{usedPowerCards?.length || 0}</strong>
                </div>
                <div>
                  <span>Experiências reais</span>
                  <strong>{experiences.length}</strong>
                </div>
              </div>
            </section>

            <section className="finalInsightPanel finalStatsPanel">
              <div className="finalPanelEyebrow">Mapa completo</div>
              <h2>Todos os poderes ativados</h2>
              <div className="orbitaStats finalStatsV2">
                {ranked.map((power) => (
                  <div className="orbitaStatRow" key={power.key}>
                    <span>{power.label}</span>
                    <div className="orbitaStatTrack">
                      <div style={{ width: `${Math.max(8, (power.value / max) * 100)}%` }} />
                    </div>
                    <b>{power.value}</b>
                  </div>
                ))}
              </div>
            </section>

            <section className="finalInsightPanel finalNextSteps">
              <div className="finalPanelEyebrow">Próximas experiências</div>
              <h2>O que vale explorar agora</h2>
              <div className="nextTrailsBox finalTrailsV2">
                {nextTrails.map((trail) => (
                  <article key={trail.title}>
                    <b>{trail.title}</b>
                    <p>{trail.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="finalPassaporte">
              <div>
                <span>Passaporte Órbita</span>
                <h2>A jornada continua fora do jogo.</h2>
                <p>
                  Seu perfil pode reunir projetos, esporte, cultura, tecnologia e outras
                  experiências que você viver até o 9º ano.
                </p>
              </div>
              <button type="button" className="sceneAction finalProfileButton" onClick={onContinueJourney || onOpenProfile}>
                Continuar no Órbita
              </button>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function getPowerTokensFromPowers(powers = {}) {
  return Object.entries(powers).reduce((acc, [key, value]) => {
    if (!value) return acc;
    acc[key] = Math.max(1, Math.ceil(value / 2));
    return acc;
  }, {});
}

function mergePowerTokens(current, gained) {
  const next = { ...current };

  Object.entries(gained || {}).forEach(([key, value]) => {
    next[key] = (next[key] || 0) + value;
  });

  return next;
}

function spendPowerToken(current, key) {
  return {
    ...current,
    [key]: Math.max(0, (current[key] || 0) - 1),
  };
}



const SAVE_KEY = 'orbita-superpoderes-save';
const V4_KEY = 'orbita-v4-state';

function getSavedV4State() {
  try {
    const raw = localStorage.getItem(V4_KEY);
    return raw ? normalizeV4State(JSON.parse(raw)) : emptyV4State();
  } catch {
    return emptyV4State();
  }
}

function getSavedSnapshot() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function GameApp() {
  const [agent, setAgent] = useState(null);
  const [nodeId, setNodeId] = useState('world_entry');
  const [scores, setScores] = useState(emptyScores());
  const [path, setPath] = useState(['Entrada']);
  const [inventory, setInventory] = useState([]);
  const [tradeoffSelection, setTradeoffSelection] = useState([]);
  const [mission, setMission] = useState(null);
  const [decisiveItem, setDecisiveItem] = useState(null);
  const [visitedNodeIds, setVisitedNodeIds] = useState([]);
  const [usedItems, setUsedItems] = useState([]);
  const [usedPowerCards, setUsedPowerCards] = useState([]);
  const [powerTokens, setPowerTokens] = useState({});
  const [playerProfile, setPlayerProfile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [viewMode, setViewMode] = useState('student');
  const [v4State, setV4State] = useState(() => getSavedV4State());
  const [v4View, setV4View] = useState('home');

  const node = expandedNodes[nodeId];
  const dailyMission = missionForDate();
  const todayKey = localDateKey();
  const completedToday = Boolean(v4State.dailyCompletions?.[todayKey]);
  const weeklyCount = weeklyCompletionCount(v4State);
  const [hasSave, setHasSave] = useState(() => Boolean(localStorage.getItem(SAVE_KEY)));
  const [justSaved, setJustSaved] = useState(false);

  const preInventoryRoute = [
    'forest_fog',
    'forest_signal_split',
    'forest_mirror',
    'forest_pattern',
    'forest_courage',
    'ai_prompt_lab',
    'ai_source_check',
    'ai_human_review',
    'ai_bias_warning',
    'ai_context_test',
    'ai_ethics_gate',
    'bridge_trust_test',
    'bridge_noise',
    'bridge_role_split',
    'bridge_conflict_repair',
    'arena_pressure_vote',
    'studio_reference_hunt',
    'studio_original_twist',
    'studio_overload',
    'studio_filter',
    'studio_feedback_room',
    'workshop_material_choice',
    'workshop_stress_test',
    'workshop_failure',
    'workshop_iteration',
    'workshop_launch_choice',
    'schoolyard_empathy_scan',
    'schoolyard_micro_action',
    'schoolyard_pressure',
    'schoolyard_boundary',
    'schoolyard_repair_circle',
    'city_hidden_system',
    'city_resource_limit',
    'city_signal',
    'city_priority',
    'city_future_scenario',
    'boss_time_attack',
    'boss_focus_lock',
    'boss_doubt',
    'boss_reframe',
  ];

  const postItemRoute = [
    'second_world_choice',
    'future_lab',
    'bridge_final',
    'workshop_final',
    'boss_pressure',
    'impact_decision',
    'team_alignment',
    'prototype_or_plan',
  ];

  useEffect(() => {
    if (!justSaved) return;

    const timer = setTimeout(() => setJustSaved(false), 1500);
    return () => clearTimeout(timer);
  }, [justSaved]);

  const finalRoute = [
    'boss_time_attack',
    'boss_focus_lock',
    'boss_pressure',
    'impact_decision',
    'team_alignment',
    'prototype_or_plan',
    'reveal_memory_wall',
    'reveal_gate',
  ];

  function nextUnvisited(route, fallback) {
    return route.find((id) => id !== nodeId && !visitedNodeIds.includes(id)) || fallback;
  }

  function resolveProgressionTarget(target) {
    if (target === 'inventory' && visitedNodeIds.length < 22) {
      return nextUnvisited(preInventoryRoute, target);
    }

    if (target === 'tradeoff' && !visitedNodeIds.includes('power_challenge_1')) {
      return 'power_challenge_1';
    }

    if (target === 'tradeoff' && visitedNodeIds.length < 30) {
      return nextUnvisited(postItemRoute, target);
    }

    if (target === 'mission' && visitedNodeIds.length < 40) {
      return nextUnvisited(finalRoute, target);
    }

    if (target === 'mission' && !visitedNodeIds.includes('power_challenge_2')) {
      return 'power_challenge_2';
    }

    if (target === 'mission' && !visitedNodeIds.includes('power_challenge_3')) {
      return 'power_challenge_3';
    }

    return target;
  }


  function saveGame() {
    if (!agent) return;

    const snapshot = {
      agent,
      nodeId,
      scores,
      path,
      inventory,
      tradeoffSelection,
      mission,
      decisiveItem,
      visitedNodeIds,
      usedItems,
      usedPowerCards,
      powerTokens,
      playerProfile,
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot));
    setHasSave(true);
    setJustSaved(true);
  }

  function continueFromSave() {
    const snapshot = getSavedSnapshot();
    if (!snapshot) return;

    const restoredAgent = snapshot.agent || null;
    setAgent(restoredAgent);
    setNodeId(snapshot.nodeId || 'world_entry');
    setScores(snapshot.scores || emptyScores());
    setPath(Array.isArray(snapshot.path) ? snapshot.path : ['Entrada']);
    setInventory(Array.isArray(snapshot.inventory) ? snapshot.inventory : []);
    setTradeoffSelection(Array.isArray(snapshot.tradeoffSelection) ? snapshot.tradeoffSelection : []);
    setMission(snapshot.mission || null);
    setDecisiveItem(snapshot.decisiveItem || null);
    setVisitedNodeIds(Array.isArray(snapshot.visitedNodeIds) ? snapshot.visitedNodeIds : []);
    setUsedItems(Array.isArray(snapshot.usedItems) ? snapshot.usedItems : []);
    setUsedPowerCards(Array.isArray(snapshot.usedPowerCards) ? snapshot.usedPowerCards : []);
    setPowerTokens(snapshot.powerTokens || {});
    setPlayerProfile(
      snapshot.playerProfile || (restoredAgent ? startPlayerJourney(restoredAgent) : null),
    );
  }

  function persistV4(nextState) {
    const normalized = normalizeV4State(nextState);
    setV4State(normalized);
    localStorage.setItem(V4_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function enterContinuousJourney() {
    const next = persistV4({
      ...v4State,
      onboardingComplete: true,
    });
    setV4View('home');
    saveGame();
    return next;
  }

  function completeTodayMission(option) {
    if (!agent || completedToday) {
      setV4View('home');
      return;
    }

    const nextV4 = markDailyComplete(v4State, dailyMission, option);
    persistV4(nextV4);

    setPlayerProfile((currentProfile) => {
      const updatedProfile = completeDailyMission(currentProfile, dailyMission, option);

      const snapshot = {
        agent,
        nodeId,
        scores,
        path,
        inventory,
        tradeoffSelection,
        mission,
        decisiveItem,
        visitedNodeIds,
        usedItems,
        usedPowerCards,
        powerTokens,
        playerProfile: updatedProfile,
      };

      localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot));
      setHasSave(true);
      return updatedProfile;
    });

    setV4View('home');
  }

  function chooseAgent(selectedAgent, selectedScenario) {
    setAgent(selectedAgent);
    setScores(addScores(emptyScores(), selectedAgent.powers));
    setPlayerProfile(startPlayerJourney(selectedAgent));
    const startNode = selectedScenario?.startNode || agentStartNode[selectedAgent.id] || 'forest_entry';
    setPath(['Agente ' + selectedAgent.name, selectedScenario?.label || 'Início']);
    setVisitedNodeIds([startNode]);
    setNodeId(startNode);
  }

  function startV4Demo(selectedAgent, selectedScenario) {
    chooseAgent(selectedAgent, selectedScenario);
    persistV4({
      ...v4State,
      onboardingComplete: true,
    });
    setV4View('home');
  }

  function choose(choice) {
    const resolvedNext = resolveProgressionTarget(choice.next);

    setScores((prev) => addScores(prev, choice.powers));
    setPlayerProfile((prev) => recordChoice(prev, { node, choice }));
    setPowerTokens((prev) => mergePowerTokens(prev, getPowerTokensFromPowers(choice.powers)));
    setPath((prev) => [...prev, node.chapter]);
    setVisitedNodeIds((prev) => [...prev, resolvedNext]);
    setNodeId(resolvedNext);
  }

  function toggleInventory(item) {
    setInventory((prev) => {
      const exists = prev.some((selected) => selected.id === item.id);
      if (exists) return prev.filter((selected) => selected.id !== item.id);
      if (prev.length >= 4) return prev;
      return [...prev, item];
    });
  }

  function finishInventory() {
    let nextScores = scores;
    let gainedTokens = {};
    inventory.forEach((item) => {
      nextScores = addScores(nextScores, item.powers);
      gainedTokens = mergePowerTokens(gainedTokens, getPowerTokensFromPowers(item.powers));
    });
    setScores(nextScores);
    setPlayerProfile((prev) => recordInventory(prev, inventory));
    setPowerTokens((prev) => mergePowerTokens(prev, gainedTokens));
    setPath((prev) => [...prev, 'Inventário']);
    setVisitedNodeIds((prev) => [...prev, 'item_solution']);
    setNodeId('item_solution');
  }

  function chooseItemUse(item, prompt) {
    const appliedPowers = prompt?.powers || item.powers || {};

    setScores((prev) => addScores(prev, appliedPowers));
    setPlayerProfile((prev) => recordItemUse(prev, item, prompt));
    setUsedItems((prev) => {
      if (prev.some((used) => used.id === item.id)) return prev;
      return [...prev, item];
    });

    setDecisiveItem(item);
    setPath((prev) => [...prev, 'Item: ' + item.label]);

    const totalItems = inventory.length ? inventory.length : inventoryItemsExpanded.slice(0, 4).length;
    const alreadyUsed = usedItems.some((used) => used.id === item.id);
    const usedCountAfterChoice = usedItems.length + (alreadyUsed ? 0 : 1);

    if (usedCountAfterChoice >= totalItems) {
      const resolvedNext = resolveProgressionTarget('tradeoff');
      setVisitedNodeIds((prev) => [...prev, resolvedNext]);
      setNodeId(resolvedNext);
      return;
    }

    setNodeId('item_solution');
  }

  function toggleTradeoff(item) {
    setTradeoffSelection((prev) => {
      const exists = prev.some((selected) => selected.id === item.id);
      if (exists) return prev.filter((selected) => selected.id !== item.id);
      if (prev.length >= 2) return prev;
      return [...prev, item];
    });
  }

  function finishTradeoff() {
    let nextScores = scores;
    let gainedTokens = {};
    tradeoffSelection.forEach((item) => {
      nextScores = addScores(nextScores, item.powers);
      gainedTokens = mergePowerTokens(gainedTokens, getPowerTokensFromPowers(item.powers));
    });
    setScores(nextScores);
    setPlayerProfile((prev) => recordTradeoff(prev, tradeoffSelection));
    setPowerTokens((prev) => mergePowerTokens(prev, gainedTokens));
    setPath((prev) => [...prev, 'Trade-off']);
    setVisitedNodeIds((prev) => [...prev, 'second_world_choice']);
    setNodeId('second_world_choice');
  }

  function usePowerCard(card) {
    const next = node.next || 'mission';

    if ((powerTokens[card.key] || 0) <= 0) return;

    setScores((prev) => addScores(prev, card.powers));
    setPlayerProfile((prev) => recordPowerCard(prev, card));
    setPowerTokens((prev) => spendPowerToken(prev, card.key));
    setUsedPowerCards((prev) => [...prev, card]);
    setPath((prev) => [...prev, 'Carta: ' + card.title]);
    setVisitedNodeIds((prev) => [...prev, next]);
    setNodeId(next);
  }

  function chooseMission(selectedMission) {
    setScores((prev) => addScores(prev, selectedMission.powers));
    setPowerTokens((prev) => mergePowerTokens(prev, getPowerTokensFromPowers(selectedMission.powers)));
    setMission(selectedMission);
    setPlayerProfile((prev) => recordMission(prev, selectedMission));
    setPath((prev) => [...prev, 'Missão Final']);
  }

  if (viewMode === 'family') {
    const demo = buildDemoStudent();
    return (
      <FamilyPortal
        agent={agent || demo.agent}
        profile={playerProfile || demo.profile}
        opportunities={mockOpportunities}
        onModeChange={setViewMode}
      />
    );
  }

  if (viewMode === 'municipality') {
    return (
      <MunicipalityDashboard
        municipality={mockMunicipality}
        signals={mockPublicSignals}
        opportunities={mockOpportunities}
        onModeChange={setViewMode}
      />
    );
  }

  if (!agent) return <AgentSelect onStart={chooseAgent} onContinue={continueFromSave} onV4Demo={startV4Demo} hasSave={hasSave} onModeChange={setViewMode} />;

  if (profileOpen) {
    return (
      <MyOrbita
        agent={agent}
        profile={playerProfile}
        inventory={inventory}
        usedPowerCards={usedPowerCards}
        onClose={() => setProfileOpen(false)}
        onModeChange={setViewMode}
      />
    );
  }

  if (v4State.onboardingComplete && v4View === 'daily') {
    return (
      <DailyMissionView
        mission={dailyMission}
        onComplete={completeTodayMission}
        onBack={() => setV4View('home')}
      />
    );
  }

  if (v4State.onboardingComplete) {
    return (
      <V4Home
        agent={agent}
        profile={playerProfile}
        mission={dailyMission}
        completedToday={completedToday}
        weeklyCount={weeklyCount}
        onStartMission={() => setV4View('daily')}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenJourney={() => setProfileOpen(true)}
      />
    );
  }

  if (mission) {
    return (
      <PowerCard
        agent={agent}
        scores={scores}
        mission={mission}
        path={path}
        decisiveItem={decisiveItem}
        usedPowerCards={usedPowerCards}
        playerProfile={playerProfile}
        onOpenProfile={() => setProfileOpen(true)}
        onContinueJourney={enterContinuousJourney}
      />
    );
  }



  if (canUseImmersiveScene(node)) {
    return (
      <ImmersiveScene
        agent={agent}
        node={node}
        visitedCount={visitedNodeIds.length}
        inventory={inventory}
        powerTokens={powerTokens}
        onExit={saveGame}
      >
        <ChoiceNode node={node} onChoose={choose} />
      </ImmersiveScene>
    );
  }

  return (
    <SceneShell agent={agent} node={node} visitedCount={visitedNodeIds.length} inventory={inventory} powerTokens={powerTokens} usedPowerCards={usedPowerCards} playerProfile={playerProfile} onSave={saveGame} onOpenProfile={() => setProfileOpen(true)} justSaved={justSaved}>
      {node.type === 'choice' && <ChoiceNode node={node} onChoose={choose} />}

      {node.type === 'inventory' && (
        <InventoryNode
          selected={inventory}
          onToggle={toggleInventory}
          onContinue={finishInventory}
        />
      )}

      {node.type === 'use-item' && (
        <UseItemNode
          inventory={inventory}
          usedItems={usedItems}
          onChoose={chooseItemUse}
        />
      )}

      {node.type === 'tradeoff' && (
        <TradeoffNode
          selected={tradeoffSelection}
          onToggle={toggleTradeoff}
          onContinue={finishTradeoff}
        />
      )}

      {node.type === 'power-challenge' && (
        <PowerChallengeNode
          scores={scores}
          powerTokens={powerTokens}
          usedPowerCards={usedPowerCards}
          onUse={usePowerCard}
        />
      )}

      {node.type === 'mission' && <MissionNode scores={scores} onChoose={chooseMission} />}
    </SceneShell>
  );
}

createRoot(document.getElementById('root')).render(<GameApp />);

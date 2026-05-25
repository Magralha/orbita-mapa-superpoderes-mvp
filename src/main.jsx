import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { assets } from './game/data/assets';
import { agents, inventoryItems, missions, nodes, tradeoffs } from './game/data/gameData';
import { addScores, emptyScores, getCharacterName, rankScores } from './game/logic/scoring';
import './styles.css';

function AgentSelect({ onSelect }) {
  return (
    <main className="gamePage">
      <section className="gameIntro">
        <div className="gameBadge">Órbita · Caminho dos Superpoderes</div>
        <h1>Escolha seu Agente Órbita</h1>
        <p>
          Você não está escolhendo quem você é para sempre. Está escolhendo quem vai
          te acompanhar no tabuleiro. Cada agente enxerga o mundo de um jeito.
        </p>

        <div className="agentGrid">
          {agents.map((agent) => (
            <button className="agentCard" key={agent.id} onClick={() => onSelect(agent)}>
              <img src={assets.agents[agent.id]} alt="" />
              <strong>{agent.name}</strong>
              <span>{agent.role}</span>
              <small>{agent.phrase}</small>
            </button>
          ))}
        </div>
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

function SceneShell({ agent, node, path, children }) {
  return (
    <main className="gamePage">
      <section className="scene sceneV2">
        <div className="sceneTop sceneTopV2">
          <div>
            <div className="gameBadge">{node.chapter}</div>
            <h1>{node.title}</h1>
            <p>{node.text}</p>
          </div>
        </div>

        <JourneyTrail path={path} current={node.chapter} />

        <div className={`boardStage boardStageV2 sceneWorld sceneWorld-${node.world}`}>
          <div className="worldComposition">
            <img className="worldArt worldArtV2" src={assets.worlds[node.world]} alt="" />

            <div className="agentGuide agentGuideV2">
              <img src={assets.agents[agent.id]} alt="" />
              <div className="agentSpeech">
                <strong>{agent.name}</strong>
                <p>{getAgentLine(agent.id, node.type, node.chapter)}</p>
              </div>
            </div>
          </div>

          <div className="choiceLayer choiceLayerV2">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}

function ChoiceNode({ node, onChoose }) {
  return (
    <div className="floatingChoices">
      {node.choices.map((choice) => (
        <button className="sceneChoice" key={choice.label} onClick={() => onChoose(choice)}>
          <span>{choice.label}</span>
        </button>
      ))}
    </div>
  );
}

function InventoryNode({ selected, onToggle, onContinue }) {
  return (
    <>
      <div className="inventoryGrid">
        {inventoryItems.map((item) => {
          const active = selected.some((selectedItem) => selectedItem.id === item.id);

          return (
            <button
              className={`itemCard ${active ? 'selected' : ''}`}
              key={item.id}
              onClick={() => onToggle(item)}
            >
              <img src={assets.items[item.id]} alt="" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <button className="sceneAction" disabled={selected.length !== 4} onClick={onContinue}>
        Confirmar mochila {selected.length}/4
      </button>
    </>
  );
}

function TradeoffNode({ selected, onToggle, onContinue }) {
  return (
    <>
      <div className="tradeoffGrid">
        {tradeoffs.map((tradeoff) => {
          const active = selected.some((item) => item.id === tradeoff.id);

          return (
            <button
              className={`tradeoffCard ${active ? 'selected' : ''}`}
              key={tradeoff.id}
              onClick={() => onToggle(tradeoff)}
            >
              <span>{tradeoff.label}</span>
            </button>
          );
        })}
      </div>

      <button className="sceneAction" disabled={selected.length !== 2} onClick={onContinue}>
        Abrir o portão {selected.length}/2
      </button>
    </>
  );
}

function MissionNode({ onChoose }) {
  return (
    <div className="floatingChoices missionChoices">
      {missions.map((mission) => (
        <button className="sceneChoice" key={mission.id} onClick={() => onChoose(mission)}>
          <span>{mission.label}</span>
        </button>
      ))}
    </div>
  );
}

function PowerCard({ agent, scores, mission, path }) {
  const ranked = rankScores(scores);
  const top = ranked.slice(0, 3);
  const characterName = getCharacterName(top);
  const max = Math.max(...ranked.map((item) => item.value), 1);

  return (
    <main className="gamePage">
      <section className="finalCardScreen">
        <div className="finalHeader">
          <div className="gameBadge">Revelação final</div>
          <h1>Seu Card de Superpoder</h1>
          <p>
            O tabuleiro montou uma leitura do caminho que você percorreu. Isso não
            define quem você é para sempre. Mostra os poderes que apareceram nesta jornada.
          </p>
        </div>

        <article className="orbitaPowerCard">
          <div className="cardDecor cardDecorOne" />
          <div className="cardDecor cardDecorTwo" />

          <header className="orbitaCardHeader">
            <div>
              <span>Card de Superpoder</span>
              <h2>{characterName}</h2>
              <p>Agente inicial: {agent.name}</p>
            </div>

            <img className="orbitaSeal" src={assets.ui.raritySeal} alt="" />
          </header>

          <section className="orbitaHeroZone">
            <div className="heroAura" />
            <img className="orbitaHero" src={assets.agents[agent.id]} alt="" />
          </section>

          <section className="orbitaBadges">
            {top.map((power) => (
              <div className="orbitaBadgeSlot" key={power.key}>
                <img src={assets.badges[power.key]} alt="" />
                <span>{power.label}</span>
              </div>
            ))}
          </section>

          <section className="orbitaStats">
            <h3>Poderes ativados</h3>

            {ranked.map((power) => (
              <div className="orbitaStatRow" key={power.key}>
                <span>{power.label}</span>
                <div className="orbitaStatTrack">
                  <div style={{ width: `${Math.max(8, (power.value / max) * 100)}%` }} />
                </div>
                <b>{power.value}</b>
              </div>
            ))}
          </section>

          <section className="orbitaMission">
            <strong>Missão especial</strong>
            <p>{mission.label}</p>
          </section>

          <section className="orbitaPath">
            <strong>Caminho percorrido</strong>
            <p>{path.join(' → ')}</p>
          </section>
        </article>
      </section>
    </main>
  );
}
function GameApp() {
  const [agent, setAgent] = useState(null);
  const [nodeId, setNodeId] = useState('world_entry');
  const [scores, setScores] = useState(emptyScores());
  const [path, setPath] = useState(['Entrada']);
  const [inventory, setInventory] = useState([]);
  const [tradeoffSelection, setTradeoffSelection] = useState([]);
  const [mission, setMission] = useState(null);

  const node = nodes[nodeId];

  function chooseAgent(selectedAgent) {
    setAgent(selectedAgent);
    setScores(addScores(emptyScores(), selectedAgent.powers));
    setPath(['Agente ' + selectedAgent.name]);
  }

  function choose(choice) {
    setScores((prev) => addScores(prev, choice.powers));
    setPath((prev) => [...prev, node.chapter]);
    setNodeId(choice.next);
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
    inventory.forEach((item) => {
      nextScores = addScores(nextScores, item.powers);
    });
    setScores(nextScores);
    setPath((prev) => [...prev, 'Inventário']);
    setNodeId('tradeoff');
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
    tradeoffSelection.forEach((item) => {
      nextScores = addScores(nextScores, item.powers);
    });
    setScores(nextScores);
    setPath((prev) => [...prev, 'Trade-off']);
    setNodeId('mission');
  }

  function chooseMission(selectedMission) {
    setScores((prev) => addScores(prev, selectedMission.powers));
    setMission(selectedMission);
    setPath((prev) => [...prev, 'Missão Final']);
  }

  if (!agent) return <AgentSelect onSelect={chooseAgent} />;

  if (mission) {
    return <PowerCard agent={agent} scores={scores} mission={mission} path={path} />;
  }



  return (
    <SceneShell agent={agent} node={node} path={path}>
      {node.type === 'choice' && <ChoiceNode node={node} onChoose={choose} />}

      {node.type === 'inventory' && (
        <InventoryNode
          selected={inventory}
          onToggle={toggleInventory}
          onContinue={finishInventory}
        />
      )}

      {node.type === 'tradeoff' && (
        <TradeoffNode
          selected={tradeoffSelection}
          onToggle={toggleTradeoff}
          onContinue={finishTradeoff}
        />
      )}

      {node.type === 'mission' && <MissionNode onChoose={chooseMission} />}
    </SceneShell>
  );
}

createRoot(document.getElementById('root')).render(<GameApp />);

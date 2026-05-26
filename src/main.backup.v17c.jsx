import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { assets } from './game/data/assets';
import { agents } from './game/data/gameData';
import { agentStartNode, expandedNodes, inventoryItemsExpanded, missionsExpanded, tradeoffsExpanded } from './game/data/expandedTree';
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
        {inventoryItemsExpanded.map((item) => {
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


function UseItemNode({ inventory, onChoose }) {
  const visibleInventory = inventory.length ? inventory : inventoryItemsExpanded.slice(0, 4);

  return (
    <div className="useItemGrid">
      {visibleInventory.map((item) => (
        <button className="useItemCard" key={item.id} onClick={() => onChoose(item)}>
          <img src={assets.items[item.id]} alt="" />
          <div className="useItemText">
            <strong>{item.label}</strong>
            <span>{item.useText}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

function TradeoffNode({ selected, onToggle, onContinue }) {
  return (
    <>
      <div className="tradeoffGrid">
        {tradeoffsExpanded.map((tradeoff) => {
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
    <div className="floatingChoices missionChoices">
      {relevantMissions.map((mission) => (
        <button className="sceneChoice missionChoiceCard" key={mission.id} onClick={() => onChoose(mission)}>
          <span>{mission.label}</span>
          <small>Combina com: {Object.keys(mission.powers).slice(0, 3).join(' · ')}</small>
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

function PowerCard({ agent, scores, mission, path, decisiveItem }) {
  const ranked = rankScores(scores);
  const top = ranked.slice(0, 3);
  const characterName = getCharacterName(top);
  const max = Math.max(...ranked.map((item) => item.value), 1);
  const dominantWorld = getDominantWorld(path);
  const journeyProfile = getJourneyProfile(top);

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
              <em>{journeyProfile}</em>
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

          {decisiveItem && (
            <section className="decisiveItemBox">
              <img src={assets.items[decisiveItem.id]} alt="" />
              <div>
                <strong>Item decisivo</strong>
                <p>{decisiveItem.label}</p>
                <small>{decisiveItem.useText}</small>
              </div>
            </section>
          )}

          <section className="resultMetaGrid">
            <div>
              <strong>Mundo dominante</strong>
              <span>{dominantWorld}</span>
            </div>
            <div>
              <strong>Perfil de jornada</strong>
              <span>{journeyProfile}</span>
            </div>
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
  const [decisiveItem, setDecisiveItem] = useState(null);

  const node = expandedNodes[nodeId];

  function chooseAgent(selectedAgent) {
    setAgent(selectedAgent);
    setScores(addScores(emptyScores(), selectedAgent.powers));
    setPath(['Agente ' + selectedAgent.name]);
    setNodeId(agentStartNode[selectedAgent.id] || 'forest_entry');
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
    setNodeId('item_solution');
  }

  function chooseItemUse(item) {
    setScores((prev) => addScores(prev, item.powers));
    setDecisiveItem(item);
    setPath((prev) => [...prev, 'Item: ' + item.label]);
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
    setNodeId('second_world_choice');
  }

  function chooseMission(selectedMission) {
    setScores((prev) => addScores(prev, selectedMission.powers));
    setMission(selectedMission);
    setPath((prev) => [...prev, 'Missão Final']);
  }

  if (!agent) return <AgentSelect onSelect={chooseAgent} />;

  if (mission) {
    return <PowerCard agent={agent} scores={scores} mission={mission} path={path} decisiveItem={decisiveItem} />;
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

      {node.type === 'use-item' && (
        <UseItemNode
          inventory={inventory}
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

      {node.type === 'mission' && <MissionNode scores={scores} onChoose={chooseMission} />}
    </SceneShell>
  );
}

createRoot(document.getElementById('root')).render(<GameApp />);

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


function AgentLiveCard({ agent, inventory = [], powerTokens = {}, usedPowerCards = [] }) {
  const tokenEntries = Object.entries(powerTokens)
    .filter(([, value]) => value > 0)
    .slice(0, 5);

  return (
    <aside className="agentLiveCard">
      <img className="agentLiveFrame" src={assets.cards?.mission || './board/card-frame-mission.png'} alt="" />

      <div className="agentLiveContent">
        <div className="agentLiveAvatarBox">
          <img className="agentLiveAvatar" src={assets.agents[agent.id]} alt="" />
        </div>

        <div className="agentLiveName">
          <strong>{agent.name}</strong>
          <span>Agente Órbita</span>
        </div>

        <div className="agentLiveSection">
          <b>Potes</b>
          <div className="agentLiveTokens">
            {tokenEntries.length ? tokenEntries.map(([key, value]) => (
              <span key={key}>
                <img src={assets.badges[key]} alt="" />
                {value}
              </span>
            )) : <small>ganhe poderes nas escolhas</small>}
          </div>
        </div>

        <div className="agentLiveSection">
          <b>Mochila</b>
          <div className="agentLiveItems">
            {inventory.length ? inventory.slice(0, 4).map((item) => (
              <img key={item.id} src={assets.items[item.id]} alt={item.label} />
            )) : <small>vazia por enquanto</small>}
          </div>
        </div>

        <div className="agentLiveSection">
          <b>Cartas</b>
          <div className="agentLiveCards">
            {usedPowerCards.length ? usedPowerCards.slice(0, 3).map((card, index) => (
              <span key={`${card.key}-${index}`}>{card.label}</span>
            )) : <small>nenhuma jogada</small>}
          </div>
        </div>
      </div>
    </aside>
  );
}


function SceneShell({ agent, node, path, visitedCount, inventory, powerTokens, usedPowerCards, children }) {
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

        <div className="journeyCounter">
          Etapa {Math.max(1, visitedCount)} de 40+
        </div>

        <div className={`boardStage boardStageV2 sceneWorld sceneWorld-${node.world}`}>
          <div className="worldComposition">
            <img className="worldArt worldArtV2" src={assets.worlds[node.world]} alt="" />

            <div className="agentGuide agentGuideV2 agentGuideWithCard">
              <AgentLiveCard
                agent={agent}
                inventory={inventory}
                powerTokens={powerTokens}
                usedPowerCards={usedPowerCards}
              />

              <div className="agentSpeech">
                <strong>{agent.name}</strong>
                <p>{getAgentLine(agent.id, node.type, node.chapter)}</p>
              </div>
            </div>
          </div>

          <div className="choiceLayer choiceLayerV2">
            <div className="sceneQuestionCard">
              <div className="gameBadge">{node.chapter}</div>
              <h1>{node.title}</h1>
              <p>{node.text}</p>
            </div>

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
    <div className="backpackUseStage">
      <div className="backpackProgress">
        Item {Math.min(usedItems.length + 1, visibleInventory.length)} de {visibleInventory.length}
      </div>

      <div className="activeItemPanel">
        <img src={assets.items[currentItem.id]} alt="" />
        <div>
          <strong>{currentItem.label}</strong>
          <p>{currentItem.useText}</p>
        </div>
      </div>

      <div className="useItemGrid useItemGridSequential">
        {prompts.map((prompt) => (
          <button
            className="useItemCard useItemActionCard"
            key={prompt.label}
            onClick={() => onChoose(currentItem, prompt)}
          >
            <span>{prompt.label}</span>
          </button>
        ))}
      </div>
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
    <div className="powerChallengeStage">
      <div className="powerChallengeIntro">
        <strong>Jogue uma carta</strong>
        <span>Use 1 pote de poder. Carta usada não volta para a próxima rodada.</span>
      </div>

      <div className="tokenShelf">
        {Object.keys(PLAYABLE_POWER_CARDS).map((key) => (
          <div className="tokenPill" key={key}>
            <img src={assets.badges[key]} alt="" />
            <span>{powerTokens[key] || 0}</span>
          </div>
        ))}
      </div>

      <div className="playablePowerGrid">
        {visibleCards.map((card) => {
          const tokenCount = powerTokens[card.key] || 0;
          const locked = tokenCount <= 0;

          return (
            <button
              className={`playablePowerCard power-${card.key} ${locked ? 'lockedPowerCard' : ''}`}
              key={card.key}
              disabled={locked}
              onClick={() => onUse(card)}
            >
              <img src={assets.badges[card.key]} alt="" />
              <div>
                <small>{card.label} · {tokenCount} pote{tokenCount === 1 ? '' : 's'}</small>
                <strong>{card.title}</strong>
                <p>{locked ? 'Você ainda não juntou pote suficiente deste poder.' : card.action}</p>
              </div>
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

function PowerCard({ agent, scores, mission, path, decisiveItem, usedPowerCards, powerTokens }) {
  const ranked = rankScores(scores);
  const top = ranked.slice(0, 3);
  const characterName = getCharacterName(top);
  const max = Math.max(...ranked.map((item) => item.value), 1);
  const dominantWorld = getDominantWorld(path);
  const journeyProfile = getJourneyProfile(top);
  const nextTrails = getNextTrails(top);
  const characteristics = getPowerCharacteristics(top);

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

          {usedPowerCards?.length > 0 && (
            <section className="playedCardsBox">
              <strong>Cartas jogadas</strong>
              <div>
                {usedPowerCards.map((card, index) => (
                  <span key={`${card.key}-${index}`}>{card.title}</span>
                ))}
              </div>
            </section>
          )}

          <section className="orbitaMission">
            <strong>Missão especial</strong>
            <p>{mission.label}</p>
          </section>

          <section className="characteristicsBox">
            <strong>Características que apareceram</strong>
            <div>
              {characteristics.map((trait) => (
                <span key={trait}>{trait}</span>
              ))}
            </div>
          </section>

          <section className="nextTrailsBox">
            <strong>Como continuar suas trilhas</strong>
            {nextTrails.map((trail) => (
              <article key={trail.title}>
                <b>{trail.title}</b>
                <p>{trail.text}</p>
              </article>
            ))}
          </section>
        </article>
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

  const node = expandedNodes[nodeId];

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

  function chooseAgent(selectedAgent) {
    setAgent(selectedAgent);
    setScores(addScores(emptyScores(), selectedAgent.powers));
    const startNode = agentStartNode[selectedAgent.id] || 'forest_entry';
    setPath(['Agente ' + selectedAgent.name]);
    setVisitedNodeIds([startNode]);
    setNodeId(startNode);
  }

  function choose(choice) {
    const resolvedNext = resolveProgressionTarget(choice.next);

    setScores((prev) => addScores(prev, choice.powers));
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
    setPowerTokens((prev) => mergePowerTokens(prev, gainedTokens));
    setPath((prev) => [...prev, 'Inventário']);
    setVisitedNodeIds((prev) => [...prev, 'item_solution']);
    setNodeId('item_solution');
  }

  function chooseItemUse(item) {
    setScores((prev) => addScores(prev, item.powers));
    const resolvedNext = resolveProgressionTarget('tradeoff');

    setDecisiveItem(item);
    setPath((prev) => [...prev, 'Item: ' + item.label]);
    setVisitedNodeIds((prev) => [...prev, resolvedNext]);
    setNodeId(resolvedNext);
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
    setPowerTokens((prev) => mergePowerTokens(prev, gainedTokens));
    setPath((prev) => [...prev, 'Trade-off']);
    setVisitedNodeIds((prev) => [...prev, 'second_world_choice']);
    setNodeId('second_world_choice');
  }

  function usePowerCard(card) {
    const next = node.next || 'mission';

    if ((powerTokens[card.key] || 0) <= 0) return;

    setScores((prev) => addScores(prev, card.powers));
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
    setPath((prev) => [...prev, 'Missão Final']);
  }

  if (!agent) return <AgentSelect onSelect={chooseAgent} />;

  if (mission) {
    return <PowerCard agent={agent} scores={scores} mission={mission} path={path} decisiveItem={decisiveItem} usedPowerCards={usedPowerCards} powerTokens={powerTokens} />;
  }



  return (
    <SceneShell agent={agent} node={node} path={path} visitedCount={visitedNodeIds.length} inventory={inventory} powerTokens={powerTokens} usedPowerCards={usedPowerCards}>
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

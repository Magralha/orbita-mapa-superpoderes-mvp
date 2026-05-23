import { powers, powerKeys } from '../data/powers';

const modeLabels = {
  explorador: {
    label: 'Explorador',
    text: 'Você entra nos desafios procurando caminhos, possibilidades e descobertas.',
  },
  cuidadoso: {
    label: 'Cuidadoso',
    text: 'Você observa, compara e pensa antes de agir.',
  },
  iterativo: {
    label: 'Testador',
    text: 'Você aprende tentando, ajustando e descobrindo no processo.',
  },
  relacional: {
    label: 'Relacional',
    text: 'Você entende melhor os desafios quando considera pessoas, grupo e convivência.',
  },
  autonomo: {
    label: 'Autônomo',
    text: 'Você tende a seguir seu próprio caminho e agir quando sente que algo precisa mudar.',
  },
  rapido: {
    label: 'Reação rápida',
    text: 'Você costuma decidir com agilidade quando a situação pede uma primeira resposta.',
  },
  reflexivo: {
    label: 'Reflexivo',
    text: 'Você costuma levar mais tempo para comparar possibilidades antes de responder.',
  },
};

const energyLabels = {
  descoberta: {
    label: 'Descoberta',
    text: 'Você ganha energia quando pode explorar, pesquisar e encontrar pistas.',
  },
  grupo: {
    label: 'Grupo',
    text: 'Você ganha energia quando pode trocar, conversar e fazer junto.',
  },
  logica: {
    label: 'Lógica',
    text: 'Você ganha energia quando consegue organizar, comparar e montar um caminho.',
  },
  maoNaMassa: {
    label: 'Mão na massa',
    text: 'Você ganha energia quando pode testar, montar e colocar algo de pé.',
  },
  justica: {
    label: 'Justiça',
    text: 'Você ganha energia quando percebe que algo precisa ser protegido ou corrigido.',
  },
  tecnologia: {
    label: 'Tecnologia',
    text: 'Você ganha energia quando pode usar ferramentas, sistemas e IA para abrir possibilidades.',
  },
  visual: {
    label: 'Visual',
    text: 'Você ganha energia quando pode transformar ideias em imagens, cenas, vídeos ou formas.',
  },
};

const worldLabels = {
  cidade: 'Cidade do futuro',
  ciencia: 'Laboratório e ciência',
  cultura: 'Histórias, arte e comunicação',
  natureza: 'Natureza e sustentabilidade',
  movimento: 'Esporte e movimento',
  tecnologia: 'Tecnologia e IA',
  cuidado: 'Cuidado e pessoas',
};

function emptyScore(keys) {
  return keys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});
}

function addWeights(target, weights = {}, multiplier = 1) {
  Object.entries(weights).forEach(([key, value]) => {
    target[key] = (target[key] || 0) + value * multiplier;
  });
}

function rankMap(map, dictionary = {}) {
  return Object.entries(map)
    .map(([key, score]) => ({
      key,
      score,
      ...(dictionary[key] || {}),
    }))
    .sort((a, b) => b.score - a.score);
}

function normalizeAnswerItems(entry) {
  if (!entry) return [];
  if (Array.isArray(entry.items)) return entry.items;
  if (entry.item) return [entry.item];
  return [];
}

function responseModeFromTime(ms) {
  if (!ms) return null;
  if (ms < 2500) return 'rapido';
  if (ms > 9000) return 'reflexivo';
  return null;
}

export function analyzeAnswers(entries) {
  const powerScores = emptyScore(powerKeys);
  const modeScores = {};
  const energyScores = {};
  const worldScores = {};
  const responseTimes = [];

  entries.forEach((entry) => {
    const items = normalizeAnswerItems(entry);

    if (entry.responseMs) {
      responseTimes.push(entry.responseMs);
      const timeMode = responseModeFromTime(entry.responseMs);
      if (timeMode) addWeights(modeScores, { [timeMode]: 1 });
    }

    items.forEach((item, index) => {
      const orderMultiplier = entry.type === 'order-cards' ? Math.max(1, 1.8 - index * 0.18) : 1;
      const energyMultiplier = entry.type === 'energy-meter' ? item.energyValue || 1 : 1;

      addWeights(powerScores, item.weights, orderMultiplier * energyMultiplier);
      addWeights(modeScores, item.modes, orderMultiplier);
      addWeights(energyScores, item.energies, energyMultiplier);
      addWeights(worldScores, item.worlds);
    });
  });

  const rankedPowers = rankMap(powerScores, powers);
  const rankedModes = rankMap(modeScores, modeLabels);
  const rankedEnergies = rankMap(energyScores, energyLabels);
  const rankedWorlds = Object.entries(worldScores)
    .map(([key, score]) => ({ key, score, label: worldLabels[key] || key }))
    .sort((a, b) => b.score - a.score);

  const topPowers = rankedPowers.slice(0, 3);
  const mainPower = topPowers[0];
  const mainMode = rankedModes[0] || modeLabels.explorador;
  const mainEnergy = rankedEnergies[0] || energyLabels.descoberta;

  const avgResponseMs = responseTimes.length
    ? Math.round(responseTimes.reduce((sum, value) => sum + value, 0) / responseTimes.length)
    : null;

  const missions = [...new Set(topPowers.flatMap((power) => power.missions || []))].slice(0, 6);
  const tools = [...new Set(topPowers.flatMap((power) => power.tools || []))].slice(0, 8);

  return {
    powerScores,
    modeScores,
    energyScores,
    worldScores,
    rankedPowers,
    rankedModes,
    rankedEnergies,
    rankedWorlds,
    topPowers,
    mainPower,
    mainMode,
    mainEnergy,
    missions,
    tools,
    avgResponseMs,
  };
}

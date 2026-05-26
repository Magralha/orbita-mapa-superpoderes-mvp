import { powers } from '../data/gameData';

export function emptyScores() {
  return Object.keys(powers).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});
}

export function addScores(scores, weights = {}) {
  const next = { ...scores };
  Object.entries(weights).forEach(([key, value]) => {
    next[key] = (next[key] || 0) + value;
  });
  return next;
}

export function rankScores(scores) {
  return Object.entries(scores)
    .map(([key, value]) => ({ key, value, label: powers[key] }))
    .sort((a, b) => b.value - a.value);
}

export function getCharacterName(topPowers) {
  const first = topPowers[0]?.label || 'Explorador';
  const second = topPowers[1]?.label || 'Criativo';

  const names = {
    Proteger: 'Guardião',
    Investigar: 'Explorador',
    Criar: 'Criador',
    Cuidar: 'Cuidador',
    Construir: 'Construtor',
    Comunicar: 'Comunicador',
    Organizar: 'Estrategista',
    Conectar: 'Conector',
  };

  return `${names[first] || first} ${names[second] || second}`;
}

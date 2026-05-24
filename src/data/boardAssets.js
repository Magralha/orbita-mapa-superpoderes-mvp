export const boardAssets = {
  boards: {
    mobile: './board/tree-board-mobile.png',
    desktop: './board/tree-board-desktop.png',
  },
  worlds: {
    forest: './board/world-forest.png',
    inventory: './board/world-inventory.png',
    city: './board/world-city.png',
    ai: './board/world-ai.png',
    arena: './board/world-arena.png',
    stageBoss: './board/world-stage-boss.png',
    finalMission: './board/world-final-mission.png',
  },
  ui: {
    token: './board/token-player.png',
    tileChoice: './board/tile-choice.png',
    tileCompleted: './board/tile-completed.png',
    tileLocked: './board/tile-locked.png',
    forkArrow: './board/fork-arrow.png',
  },
  avatars: {
    investigar: './board/avatar-investigar.png',
    criar: './board/avatar-criar.png',
    cuidar: './board/avatar-cuidar.png',
    construir: './board/avatar-construir.png',
    comunicar: './board/avatar-comunicar.png',
    organizar: './board/avatar-organizar.png',
    proteger: './board/avatar-proteger.png',
    conectar: './board/avatar-conectar.png',
  },
};

export const boardSteps = [
  { label: 'Entrada', world: 'forest' },
  { label: 'Instinto', world: 'forest' },
  { label: 'Cartas', world: 'inventory' },
  { label: 'Game', world: 'city' },
  { label: 'Mochila', world: 'inventory' },
  { label: 'Mente', world: 'city' },
  { label: 'Fase difícil', world: 'arena' },
  { label: 'Time', world: 'arena' },
  { label: 'Portal IA', world: 'ai' },
  { label: 'Boss', world: 'stageBoss' },
  { label: 'Mundos', world: 'city' },
  { label: 'Energia', world: 'finalMission' },
  { label: 'Missão', world: 'finalMission' },
  { label: 'Resultado', world: 'finalMission' },
];

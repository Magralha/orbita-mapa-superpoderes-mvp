const base = import.meta.env.BASE_URL;

const p = (path) => `${base}${path}`;

export const assets = {
  agents: {
    luma: p('board/v3/agents/luma.png'),
    nexo: p('board/v3/agents/nexo.png'),
    kira: p('board/v3/agents/kira.png'),
    teo: p('board/v3/agents/teo.png'),
    zuri: p('board/v3/agents/zuri.png'),
    orin: p('board/v3/agents/orin.png'),
    vega: p('board/v3/agents/vega.png'),
    mio: p('board/v3/agents/mio.png'),
  },

  worlds: {
    forest: p('board/v3/worlds/forest.png'),
    ai: p('board/v3/worlds/ai.png'),
    arena: p('board/v3/worlds/arena.png'),
    city: p('board/v3/worlds/city.png'),
    inventory: p('board/v3/worlds/inventory.png'),
    boss: p('board/v3/worlds/stage-boss.png'),
    final: p('board/v3/worlds/final-mission.png'),
    bridge: p('board/v3/worlds/bridge.png'),
    studio: p('board/v3/worlds/creative-studio.png'),
    schoolyard: p('board/v3/worlds/schoolyard.png'),
    tradeoff: p('board/v3/worlds/tradeoff-gate.png'),
    reveal: p('board/v3/worlds/reveal-tower.png'),
    workshop: p('board/v3/worlds/workshop.png'),
  },

  items: {
    lanterna: p('board/v3/items/lanterna.png'),
    escudo: p('board/v3/items/escudo.png'),
    microfone: p('board/v3/items/microfone.png'),
    mapa: p('board/v3/items/mapa.png'),
    ferramenta: p('board/v3/items/ferramenta.png'),
    pincel: p('board/v3/items/pincel.png'),
    chave: p('board/v3/items/chave.png'),
    corda: p('board/v3/items/corda.png'),
    bussola: p('board/v3/items/bussola.png'),
    relogio: p('board/v3/items/relogio.png'),
    lupa: p('board/v3/items/lupa.png'),
    coringa: p('board/v3/items/carta-coringa.png'),
  },

  badges: {
    investigar: p('board/v3/badges/investigar.png'),
    criar: p('board/v3/badges/criar.png'),
    cuidar: p('board/v3/badges/cuidar.png'),
    construir: p('board/v3/badges/construir.png'),
    comunicar: p('board/v3/badges/comunicar.png'),
    organizar: p('board/v3/badges/organizar.png'),
    proteger: p('board/v3/badges/proteger.png'),
    conectar: p('board/v3/badges/conectar.png'),
  },

  cards: {
    power: p('board/card-frame-power.png'),
    gold: p('board/card-frame-gold.png'),
    mission: p('board/card-frame-mission.png'),
  },

  v2: {
    playerCardFrame: p('board/v2/card-frame-player.svg'),
    badgeCriar: p('board/v3/badges/criar.png'),
    itemLupa: p('board/v3/items/lupa.png'),
    xpChip: p('board/v2/xp-chip.svg'),
    rewardLevel: p('board/v2/reward-level.svg'),
  },

  ui: {
    choiceCard: p('board/choice-card.png'),
    choiceBubble: p('board/choice-bubble.png'),
    tileChoice: p('board/tile-choice.png'),
    tileCompleted: p('board/tile-completed.png'),
    tileCurrent: p('board/tile-current.png'),
    tileMission: p('board/tile-mission.png'),
    pathLine: p('board/path-line-straight.png'),
    raritySeal: p('board/rarity-seal.png'),
    statEmpty: p('board/stat-bar-empty.png'),
    statFill: p('board/stat-bar-fill.png'),
  },
};

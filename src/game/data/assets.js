const base = import.meta.env.BASE_URL;

const p = (path) => `${base}${path}`;

export const assets = {
  agents: {
    luma: p('board/v2/agent-luma.svg'),
    nexo: p('board/v2/agent-nexo.svg'),
    kira: p('board/v2/agent-kira.svg'),
    teo: p('board/v2/agent-teo.svg'),
    zuri: p('board/v2/agent-zuri.svg'),
    orin: p('board/v2/agent-orin.svg'),
    vega: p('board/v2/agent-vega.svg'),
    mio: p('board/v2/agent-mio.svg'),
  },

  worlds: {
    forest: p('board/v2/world-forest.svg'),
    ai: p('board/v2/world-ai.svg'),
    arena: p('board/v2/world-arena.svg'),
    city: p('board/v2/world-city.svg'),
    inventory: p('board/v2/world-inventory.svg'),
    boss: p('board/v2/world-stage-boss.svg'),
    final: p('board/v2/world-final-mission.svg'),
    bridge: p('board/v2/world-bridge.svg'),
    studio: p('board/v2/world-creative-studio.svg'),
    schoolyard: p('board/v2/world-schoolyard.svg'),
    tradeoff: p('board/v2/world-tradeoff-gate.svg'),
    reveal: p('board/v2/world-reveal-tower.svg'),
    workshop: p('board/v2/world-workshop.svg'),
  },

  items: {
    lanterna: p('board/v2/item-lanterna.svg'),
    escudo: p('board/v2/item-escudo.svg'),
    microfone: p('board/v2/item-microfone.svg'),
    mapa: p('board/v2/item-mapa.svg'),
    ferramenta: p('board/v2/item-ferramenta.svg'),
    pincel: p('board/v2/item-pincel.svg'),
    chave: p('board/v2/item-chave.svg'),
    corda: p('board/v2/item-corda.svg'),
    bussola: p('board/v2/item-bussola.svg'),
    relogio: p('board/v2/item-relogio.svg'),
    lupa: p('board/v2/item-lupa.svg'),
    coringa: p('board/v2/item-carta-coringa.svg'),
  },

  badges: {
    investigar: p('board/v2/badge-investigar.svg'),
    criar: p('board/v2/badge-criar.svg'),
    cuidar: p('board/v2/badge-cuidar.svg'),
    construir: p('board/v2/badge-construir.svg'),
    comunicar: p('board/v2/badge-comunicar.svg'),
    organizar: p('board/v2/badge-organizar.svg'),
    proteger: p('board/v2/badge-proteger.svg'),
    conectar: p('board/v2/badge-conectar.svg'),
  },

  cards: {
    power: p('board/card-frame-power.png'),
    gold: p('board/card-frame-gold.png'),
    mission: p('board/card-frame-mission.png'),
  },

  v2: {
    playerCardFrame: p('board/v2/card-frame-player.svg'),
    badgeCriar: p('board/v2/badge-criar.svg'),
    itemLupa: p('board/v2/item-lupa.svg'),
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

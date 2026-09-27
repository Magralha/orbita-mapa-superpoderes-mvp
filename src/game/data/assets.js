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
    forest: p('board/world-forest.png'),
    ai: p('board/world-ai.png'),
    arena: p('board/world-arena.png'),
    city: p('board/world-city.png'),
    inventory: p('board/world-inventory.png'),
    boss: p('board/world-stage-boss.png'),
    final: p('board/world-final-mission.png'),
    bridge: p('board/world-bridge.png'),
    studio: p('board/v2/world-creative-studio.svg'),
    schoolyard: p('board/world-schoolyard.png'),
    tradeoff: p('board/world-tradeoff-gate.png'),
    reveal: p('board/world-reveal-tower.png'),
    workshop: p('board/world-workshop.png'),
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

const base = import.meta.env.BASE_URL;

const p = (path) => `${base}${path}`;

export const assets = {
  agents: {
    luma: p('board/agent-luma.png'),
    nexo: p('board/agent-nexo.png'),
    kira: p('board/agent-kira.png'),
    teo: p('board/agent-teo.png'),
    zuri: p('board/agent-zuri.png'),
    orin: p('board/agent-orin.png'),
    vega: p('board/agent-vega.png'),
    mio: p('board/agent-mio.png'),
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
    studio: p('board/world-creative-studio.png'),
    schoolyard: p('board/world-schoolyard.png'),
    tradeoff: p('board/world-tradeoff-gate.png'),
    reveal: p('board/world-reveal-tower.png'),
    workshop: p('board/world-workshop.png'),
  },

  items: {
    lanterna: p('board/item-lanterna.png'),
    escudo: p('board/item-escudo.png'),
    microfone: p('board/item-microfone.png'),
    mapa: p('board/item-mapa.png'),
    ferramenta: p('board/item-ferramenta.png'),
    pincel: p('board/item-pincel.png'),
    chave: p('board/item-chave.png'),
    corda: p('board/item-corda.png'),
    bussola: p('board/item-bussola.png'),
    relogio: p('board/item-relogio.png'),
    lupa: p('board/item-lupa.png'),
    coringa: p('board/item-carta-coringa.png'),
  },

  badges: {
    investigar: p('board/badge-investigar.png'),
    criar: p('board/badge-criar.png'),
    cuidar: p('board/badge-cuidar.png'),
    construir: p('board/badge-construir.png'),
    comunicar: p('board/badge-comunicar.png'),
    organizar: p('board/badge-organizar.png'),
    proteger: p('board/badge-proteger.png'),
    conectar: p('board/badge-conectar.png'),
  },

  cards: {
    power: p('board/card-frame-power.png'),
    gold: p('board/card-frame-gold.png'),
    mission: p('board/card-frame-mission.png'),
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

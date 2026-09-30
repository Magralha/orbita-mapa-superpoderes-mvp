const anchor = (id, x, y, width, options = {}) => ({
  id,
  x,
  y,
  width,
  // Legacy percentages kept for the Admin visual QA and validators.
  left: x * 100,
  ground: y * 100,
  surface: 'floor',
  priority: 10,
  flip: false,
  rotate: 0,
  skewX: 0,
  perspectiveScaleX: 1,
  shadowWidth: 58,
  shadowHeight: 8,
  shadowOpacity: 0.34,
  shadowBlur: 5,
  shadowRotate: 0,
  shadowSkewX: 0,
  brightness: 1,
  contrast: 1,
  saturate: 1,
  zIndex: 9,
  ...options,
});

const scene = ({
  worldObjectPosition = '50% 50%',
  anchors = [],
  specialAnchors = [],
  safeArea,
  specialSafeArea,
  agentOverrides,
}) => ({
  worldObjectPosition,
  imageSpaceVersion: 2,
  safeArea: safeArea || { left: 0.10, right: 0.90, top: 0.23, bottom: 0.64 },
  specialSafeArea: specialSafeArea || { left: 0.10, right: 0.90, top: 0.22, bottom: 0.55 },
  anchors,
  specialAnchors,
  agent: anchors[0],
  agentOverrides,
  markers: [],
});

export const immersiveSceneConfig = {
  forest: scene({
    worldObjectPosition: '50% 42%',
    anchors: [
      anchor('forest-path-main', 0.42, 0.59, 14.5, { surface: 'path', priority: 13, shadowRotate: -8, shadowWidth: 64 }),
      anchor('forest-stone-left', 0.31, 0.61, 13.5, { surface: 'stone', priority: 11, flip: true, shadowRotate: -10 }),
      anchor('forest-path-right', 0.57, 0.60, 13.2, { surface: 'path', priority: 10, shadowRotate: 8 }),
    ],
  }),

  schoolyard: scene({
    worldObjectPosition: '50% 46%',
    anchors: [
      anchor('schoolyard-court-step', 0.48, 0.57, 14.2, { surface: 'step', priority: 13, shadowRotate: -6, shadowWidth: 62 }),
      anchor('schoolyard-left-floor', 0.34, 0.60, 13.4, { surface: 'floor', priority: 11, shadowRotate: -5 }),
      anchor('schoolyard-right-floor', 0.61, 0.59, 13.0, { surface: 'floor', priority: 10, flip: true, shadowRotate: 5 }),
    ],
  }),

  bridge: scene({
    worldObjectPosition: '50% 45%',
    safeArea: { left: 0.12, right: 0.88, top: 0.24, bottom: 0.62 },
    anchors: [
      anchor('bridge-deck-center', 0.50, 0.56, 13.8, { surface: 'bridge', priority: 15, shadowRotate: -2, shadowWidth: 66, shadowHeight: 7 }),
      anchor('bridge-deck-left', 0.42, 0.58, 13.2, { surface: 'bridge', priority: 12, shadowRotate: -4, shadowWidth: 64 }),
      anchor('bridge-approach-right', 0.61, 0.55, 12.8, { surface: 'path', priority: 10, flip: true, shadowRotate: 4 }),
    ],
  }),

  ai: scene({
    worldObjectPosition: '50% 43%',
    anchors: [
      anchor('ai-portal-landing', 0.63, 0.55, 14.0, { surface: 'platform', priority: 15, shadowRotate: -3, shadowWidth: 62, brightness: 1.03, saturate: 1.03 }),
      anchor('ai-portal-step', 0.54, 0.59, 13.2, { surface: 'step', priority: 12, shadowRotate: -4 }),
      anchor('ai-workbench-floor', 0.34, 0.61, 12.8, { surface: 'floor', priority: 9, flip: true, shadowRotate: 4 }),
    ],
  }),

  arena: scene({
    worldObjectPosition: '50% 47%',
    anchors: [
      anchor('arena-stage-left', 0.40, 0.56, 13.8, { surface: 'stage', priority: 15, shadowRotate: -4, brightness: 0.98, saturate: 1.04 }),
      anchor('arena-stage-center', 0.53, 0.58, 13.2, { surface: 'stage', priority: 12, flip: true, shadowRotate: 2 }),
      anchor('arena-stage-right', 0.65, 0.57, 12.8, { surface: 'stage', priority: 10, flip: true, shadowRotate: 5 }),
    ],
  }),

  city: scene({
    worldObjectPosition: '50% 45%',
    anchors: [
      anchor('city-sidewalk-main', 0.52, 0.56, 13.3, { surface: 'sidewalk', priority: 15, shadowRotate: -5, shadowWidth: 62 }),
      anchor('city-plaza-left', 0.39, 0.58, 12.8, { surface: 'plaza', priority: 11, shadowRotate: -6 }),
      anchor('city-sidewalk-right', 0.64, 0.58, 12.5, { surface: 'sidewalk', priority: 10, flip: true, shadowRotate: 5 }),
    ],
  }),

  studio: scene({
    worldObjectPosition: '50% 45%',
    anchors: [
      anchor('studio-floor-left', 0.24, 0.61, 14.0, { surface: 'floor', priority: 15, shadowRotate: -5, shadowWidth: 60, brightness: 0.99, saturate: 1.02 }),
      anchor('studio-floor-center', 0.37, 0.60, 13.3, { surface: 'floor', priority: 12, shadowRotate: -3 }),
      anchor('studio-floor-right', 0.66, 0.60, 12.8, { surface: 'floor', priority: 9, flip: true, shadowRotate: 4 }),
    ],
  }),

  workshop: scene({
    worldObjectPosition: '50% 45%',
    anchors: [
      anchor('workshop-floor-left', 0.35, 0.59, 13.8, { surface: 'floor', priority: 14, shadowRotate: -5 }),
      anchor('workshop-floor-center', 0.53, 0.61, 13.2, { surface: 'floor', priority: 11, flip: true, shadowRotate: 3 }),
      anchor('workshop-floor-right', 0.67, 0.58, 12.8, { surface: 'floor', priority: 9, flip: true, shadowRotate: 5 }),
    ],
  }),

  boss: scene({
    worldObjectPosition: '50% 45%',
    anchors: [
      anchor('boss-stage-left', 0.40, 0.55, 13.6, { surface: 'stage', priority: 15, shadowRotate: -4, brightness: 0.97, contrast: 1.03 }),
      anchor('boss-stage-center', 0.54, 0.57, 13.0, { surface: 'stage', priority: 11, flip: true, shadowRotate: 2 }),
    ],
    specialAnchors: [
      anchor('boss-special-left', 0.39, 0.50, 12.8, { surface: 'stage', priority: 15, shadowRotate: -4, brightness: 0.97, contrast: 1.03 }),
      anchor('boss-special-center', 0.53, 0.51, 12.3, { surface: 'stage', priority: 11, flip: true, shadowRotate: 2 }),
    ],
  }),

  reveal: scene({
    worldObjectPosition: '50% 45%',
    anchors: [
      anchor('reveal-platform-left', 0.41, 0.54, 13.2, { surface: 'platform', priority: 15, shadowRotate: -6, shadowWidth: 60, brightness: 0.99 }),
      anchor('reveal-platform-right', 0.55, 0.55, 12.6, { surface: 'platform', priority: 11, flip: true, shadowRotate: 4 }),
    ],
    specialAnchors: [
      anchor('reveal-special-left', 0.39, 0.49, 12.4, { surface: 'platform', priority: 15, shadowRotate: -6, brightness: 0.99 }),
      anchor('reveal-special-right', 0.54, 0.50, 12.0, { surface: 'platform', priority: 11, flip: true, shadowRotate: 4 }),
    ],
  }),

  final: scene({
    worldObjectPosition: '50% 45%',
    anchors: [
      anchor('final-platform-main', 0.43, 0.55, 13.2, { surface: 'platform', priority: 15, shadowRotate: -4 }),
      anchor('final-platform-right', 0.58, 0.57, 12.6, { surface: 'platform', priority: 11, flip: true, shadowRotate: 4 }),
    ],
    specialAnchors: [
      anchor('final-special-main', 0.42, 0.50, 12.4, { surface: 'platform', priority: 15, shadowRotate: -4 }),
      anchor('final-special-right', 0.57, 0.51, 12.0, { surface: 'platform', priority: 11, flip: true, shadowRotate: 4 }),
    ],
  }),

  inventory: scene({
    worldObjectPosition: '50% 42%',
    safeArea: { left: 0.10, right: 0.90, top: 0.22, bottom: 0.61 },
    specialSafeArea: { left: 0.10, right: 0.90, top: 0.20, bottom: 0.52 },
    anchors: [
      anchor('inventory-left-ledger', 0.29, 0.53, 13.8, { surface: 'ledge', priority: 15, shadowRotate: -6, shadowWidth: 58 }),
      anchor('inventory-right-platform', 0.70, 0.53, 12.5, { surface: 'platform', priority: 9, flip: true, shadowRotate: 5 }),
    ],
    specialAnchors: [
      anchor('inventory-special-left', 0.29, 0.49, 12.8, { surface: 'ledge', priority: 15, shadowRotate: -6, shadowWidth: 56 }),
      anchor('inventory-special-right', 0.69, 0.49, 11.8, { surface: 'platform', priority: 9, flip: true, shadowRotate: 5 }),
    ],
  }),

  tradeoff: scene({
    worldObjectPosition: '50% 43%',
    safeArea: { left: 0.12, right: 0.88, top: 0.22, bottom: 0.60 },
    specialSafeArea: { left: 0.12, right: 0.88, top: 0.20, bottom: 0.51 },
    anchors: [
      anchor('tradeoff-lower-step', 0.49, 0.55, 13.2, { surface: 'step', priority: 15, shadowRotate: -5, shadowWidth: 60 }),
      anchor('tradeoff-left-path', 0.34, 0.57, 12.6, { surface: 'path', priority: 10, shadowRotate: -7 }),
      anchor('tradeoff-right-path', 0.64, 0.56, 12.2, { surface: 'path', priority: 9, flip: true, shadowRotate: 6 }),
    ],
    specialAnchors: [
      anchor('tradeoff-special-step', 0.49, 0.48, 12.2, { surface: 'step', priority: 15, shadowRotate: -5, shadowWidth: 56 }),
      anchor('tradeoff-special-left', 0.35, 0.49, 11.8, { surface: 'path', priority: 10, shadowRotate: -7 }),
    ],
  }),
};


const fallbackSceneConfig = scene({
  worldObjectPosition: '50% 46%',
  safeArea: { left: 0.14, right: 0.86, top: 0.26, bottom: 0.60 },
  specialSafeArea: { left: 0.14, right: 0.86, top: 0.24, bottom: 0.52 },
  anchors: [
    anchor('auto-floor-center', 0.50, 0.58, 13.2, { surface: 'auto-floor', priority: 12, shadowWidth: 60 }),
    anchor('auto-floor-left', 0.34, 0.59, 12.8, { surface: 'auto-floor', priority: 10, shadowRotate: -5 }),
    anchor('auto-floor-right', 0.66, 0.59, 12.8, { surface: 'auto-floor', priority: 10, flip: true, shadowRotate: 5 }),
  ],
  specialAnchors: [
    anchor('auto-special-center', 0.50, 0.50, 12.4, { surface: 'auto-floor', priority: 12, shadowWidth: 56 }),
    anchor('auto-special-left', 0.35, 0.50, 12.0, { surface: 'auto-floor', priority: 10, shadowRotate: -5 }),
    anchor('auto-special-right', 0.65, 0.50, 12.0, { surface: 'auto-floor', priority: 10, flip: true, shadowRotate: 5 }),
  ],
});

function hashString(value = '') {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function isSpecialStage(stageType) {
  return ['inventory', 'use-item', 'tradeoff', 'power-challenge', 'mission'].includes(stageType);
}

export function getSceneAnchorPool(config, stageType) {
  if (!config) return [];
  if (isSpecialStage(stageType) && config.specialAnchors?.length) {
    return config.specialAnchors;
  }
  return config.anchors?.length ? config.anchors : config.agent ? [config.agent] : [];
}

function selectLegacyAnchor(base, nodeId, stageType) {
  const pool = getSceneAnchorPool(base, stageType);
  if (!pool.length) return base.agent;

  const maxPriority = Math.max(...pool.map((item) => Number(item.priority || 0)));
  const best = pool.filter((item) => Number(item.priority || 0) >= maxPriority - 2);
  const index = hashString(nodeId || base.worldObjectPosition || 'orbita') % best.length;
  return best[index] || pool[0];
}

export function getImmersiveSceneConfig(world, agentId, context = {}) {
  const base = immersiveSceneConfig[world] || fallbackSceneConfig;

  const selected = selectLegacyAnchor(base, context.nodeId, context.stageType);
  const override = base.agentOverrides?.[agentId];

  return {
    ...base,
    isFallbackScene: !immersiveSceneConfig[world],
    placementCandidates: getSceneAnchorPool(base, context.stageType),
    agent: {
      ...selected,
      ...(override || {}),
    },
  };
}

const anchor = (left, ground, width, options = {}) => ({
  left,
  ground,
  width,
  flip: false,
  rotate: 0,
  skewX: 0,
  perspectiveScaleX: 1,
  shadowWidth: 58,
  shadowHeight: 9,
  shadowOpacity: 0.34,
  shadowBlur: 5,
  zIndex: 9,
  ...options,
});

export const immersiveSceneConfig = {
  forest: {
    worldObjectPosition: '50% 42%',
    agent: anchor(38, 61, 20),
    anchors: [
      anchor(36, 61, 19, { rotate: -1, perspectiveScaleX: 0.98, shadowWidth: 62 }),
      anchor(47, 63, 18, { rotate: 1, perspectiveScaleX: 0.97, shadowWidth: 60 }),
      anchor(29, 58, 17, { flip: true, rotate: 1, perspectiveScaleX: 0.96 }),
    ],
    markers: [],
  },
  schoolyard: {
    worldObjectPosition: '50% 46%',
    agent: anchor(48, 59, 19),
    anchors: [
      anchor(47, 59, 18, { rotate: -1, perspectiveScaleX: 0.97, shadowWidth: 61 }),
      anchor(60, 61, 17, { flip: true, rotate: 1, perspectiveScaleX: 0.96 }),
      anchor(34, 57, 17, { rotate: 1, perspectiveScaleX: 0.96 }),
    ],
    markers: [],
  },
  bridge: {
    worldObjectPosition: '50% 45%',
    agent: anchor(31, 59, 18),
    anchors: [
      anchor(29, 59, 17, { rotate: -2, perspectiveScaleX: 0.95, shadowWidth: 64 }),
      anchor(52, 62, 16.5, { flip: true, rotate: 2, perspectiveScaleX: 0.94, shadowWidth: 66 }),
      anchor(67, 57, 15.5, { flip: true, rotate: 1, perspectiveScaleX: 0.93 }),
    ],
    markers: [],
  },
  ai: {
    worldObjectPosition: '50% 43%',
    agent: anchor(56, 59, 18),
    anchors: [
      anchor(55, 59, 17, { rotate: 1, perspectiveScaleX: 0.96, shadowWidth: 62 }),
      anchor(35, 60, 16.5, { flip: true, rotate: -1, perspectiveScaleX: 0.95 }),
      anchor(66, 62, 15.5, { rotate: 1, perspectiveScaleX: 0.94 }),
    ],
    markers: [],
  },
  arena: {
    worldObjectPosition: '50% 47%',
    agent: anchor(35, 59, 18),
    anchors: [
      anchor(35, 59, 17, { rotate: -1, perspectiveScaleX: 0.97, shadowWidth: 60 }),
      anchor(52, 61, 16.5, { flip: true, rotate: 1, perspectiveScaleX: 0.96 }),
      anchor(68, 58, 15.5, { flip: true, perspectiveScaleX: 0.95 }),
    ],
    markers: [],
  },
  city: {
    worldObjectPosition: '50% 45%',
    agent: anchor(58, 58, 18),
    anchors: [
      anchor(58, 58, 17, { rotate: 1, perspectiveScaleX: 0.96, shadowWidth: 62 }),
      anchor(44, 61, 16.5, { flip: true, rotate: -1, perspectiveScaleX: 0.95 }),
      anchor(69, 61, 15.5, { rotate: 1, perspectiveScaleX: 0.94 }),
    ],
    markers: [],
  },
  studio: {
    worldObjectPosition: '50% 45%',
    agent: anchor(31, 60, 18),
    anchors: [
      anchor(31, 60, 17, { rotate: -1, perspectiveScaleX: 0.96, shadowWidth: 61 }),
      anchor(64, 59, 16, { flip: true, rotate: 1, perspectiveScaleX: 0.95 }),
      anchor(45, 64, 15.5, { flip: true, perspectiveScaleX: 0.94 }),
    ],
    markers: [],
  },
  workshop: {
    worldObjectPosition: '50% 45%',
    agent: anchor(34, 59, 18),
    anchors: [
      anchor(34, 59, 17, { rotate: -1, perspectiveScaleX: 0.97 }),
      anchor(55, 62, 16.5, { flip: true, rotate: 1, perspectiveScaleX: 0.95 }),
      anchor(69, 58, 15.5, { flip: true, perspectiveScaleX: 0.94 }),
    ],
    markers: [],
  },
  boss: {
    worldObjectPosition: '50% 45%',
    agent: anchor(35, 58, 18),
    anchors: [
      anchor(35, 58, 17, { rotate: -1, perspectiveScaleX: 0.97, shadowWidth: 61 }),
      anchor(56, 61, 16, { flip: true, rotate: 1, perspectiveScaleX: 0.95 }),
    ],
    specialAnchors: [
      anchor(34, 53, 15.5, { rotate: -1, perspectiveScaleX: 0.95, shadowWidth: 58 }),
      anchor(55, 54, 15, { flip: true, rotate: 1, perspectiveScaleX: 0.94 }),
    ],
    markers: [],
  },
  reveal: {
    worldObjectPosition: '50% 45%',
    agent: anchor(34, 57, 17),
    anchors: [
      anchor(34, 57, 16.5, { rotate: -1, perspectiveScaleX: 0.96, shadowWidth: 61 }),
      anchor(57, 56, 15.5, { flip: true, rotate: 1, perspectiveScaleX: 0.94 }),
    ],
    specialAnchors: [
      anchor(31, 51, 14.5, { rotate: -1, perspectiveScaleX: 0.94, shadowWidth: 55 }),
      anchor(61, 52, 14, { flip: true, rotate: 1, perspectiveScaleX: 0.93 }),
    ],
    markers: [],
  },
  final: {
    worldObjectPosition: '50% 45%',
    agent: anchor(36, 57, 17),
    anchors: [
      anchor(36, 57, 16.5, { rotate: -1, perspectiveScaleX: 0.96 }),
      anchor(59, 58, 15.5, { flip: true, rotate: 1, perspectiveScaleX: 0.94 }),
    ],
    specialAnchors: [
      anchor(32, 51, 14.5, { rotate: -1, perspectiveScaleX: 0.94 }),
      anchor(60, 52, 14, { flip: true, rotate: 1, perspectiveScaleX: 0.93 }),
    ],
    markers: [],
  },
  inventory: {
    worldObjectPosition: '50% 42%',
    agent: anchor(27, 53, 16),
    anchors: [
      anchor(27, 53, 15.5, { rotate: -1, perspectiveScaleX: 0.96, shadowWidth: 60 }),
      anchor(72, 51, 14.5, { flip: true, rotate: 1, perspectiveScaleX: 0.94 }),
    ],
    specialAnchors: [
      anchor(27, 49, 14.5, { rotate: -1, perspectiveScaleX: 0.95, shadowWidth: 56 }),
      anchor(72, 48, 13.5, { flip: true, rotate: 1, perspectiveScaleX: 0.93 }),
    ],
    markers: [],
  },
  tradeoff: {
    worldObjectPosition: '50% 43%',
    agent: anchor(31, 52, 16),
    anchors: [
      anchor(31, 52, 15.5, { rotate: -1, perspectiveScaleX: 0.96, shadowWidth: 59 }),
      anchor(65, 53, 14.5, { flip: true, rotate: 1, perspectiveScaleX: 0.94 }),
    ],
    specialAnchors: [
      anchor(29, 48, 14, { rotate: -1, perspectiveScaleX: 0.94, shadowWidth: 54 }),
      anchor(67, 49, 13.5, { flip: true, rotate: 1, perspectiveScaleX: 0.93 }),
    ],
    markers: [],
  },
};

function hashString(value = '') {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function selectAnchor(base, nodeId, stageType) {
  const useSpecial = ['inventory', 'use-item', 'tradeoff', 'power-challenge', 'mission'].includes(stageType);
  const pool = useSpecial && base.specialAnchors?.length
    ? base.specialAnchors
    : base.anchors?.length
      ? base.anchors
      : [base.agent];

  const index = hashString(nodeId || base.worldObjectPosition || 'orbita') % pool.length;
  return pool[index];
}

export function getImmersiveSceneConfig(world, agentId, context = {}) {
  const base = immersiveSceneConfig[world];
  if (!base) return null;

  const selected = selectAnchor(base, context.nodeId, context.stageType);
  const override = base.agentOverrides?.[agentId];

  return {
    ...base,
    agent: {
      ...base.agent,
      ...selected,
      ...(override || {}),
    },
  };
}

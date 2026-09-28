export const immersiveSceneConfig = {
  forest: {
    worldObjectPosition: '50% 42%',
    agent: { left: 36, top: 43, width: 29, flip: false },
    agentOverrides: {
      kira: { left: 34, top: 44, width: 27 },
      nexo: { left: 36, top: 44, width: 27 },
      teo: { left: 35, top: 44, width: 27 },
    },
    markers: [{ left: 24, top: 58 }, { left: 62, top: 47 }, { left: 77, top: 61 }],
  },
  schoolyard: {
    worldObjectPosition: '50% 46%',
    agent: { left: 50, top: 47, width: 25, flip: false },
    agentOverrides: {
      nexo: { left: 49, top: 46, width: 24 },
      kira: { left: 50, top: 46, width: 24 },
    },
    markers: [{ left: 24, top: 50 }, { left: 67, top: 44 }, { left: 79, top: 59 }],
  },
  bridge: {
    worldObjectPosition: '50% 45%',
    agent: { left: 43, top: 44, width: 25, flip: false },
    agentOverrides: {
      nexo: { left: 42, top: 43, width: 24 },
      kira: { left: 43, top: 43, width: 24 },
    },
    markers: [{ left: 26, top: 55 }, { left: 64, top: 44 }, { left: 79, top: 58 }],
  },
  ai: {
    worldObjectPosition: '50% 43%',
    agent: { left: 39, top: 46, width: 26, flip: false },
    markers: [{ left: 27, top: 54 }, { left: 61, top: 45 }, { left: 77, top: 57 }],
  },
  arena: {
    worldObjectPosition: '50% 47%',
    agent: { left: 50, top: 47, width: 25, flip: false },
    markers: [{ left: 25, top: 54 }, { left: 62, top: 45 }, { left: 77, top: 58 }],
  },
  city: {
    worldObjectPosition: '50% 45%',
    agent: { left: 47, top: 44, width: 24, flip: false },
    agentOverrides: {
      nexo: { left: 48, top: 43, width: 23 },
      kira: { left: 47, top: 44, width: 23 },
    },
    markers: [{ left: 22, top: 56 }, { left: 66, top: 44 }, { left: 80, top: 58 }],
  },
  studio: {
    worldObjectPosition: '50% 45%',
    agent: { left: 42, top: 46, width: 26, flip: false },
    markers: [{ left: 27, top: 54 }, { left: 62, top: 44 }, { left: 78, top: 58 }],
  },
  workshop: {
    worldObjectPosition: '50% 45%',
    agent: { left: 42, top: 46, width: 27, flip: false },
    markers: [{ left: 27, top: 54 }, { left: 62, top: 43 }, { left: 78, top: 57 }],
  },
  boss: {
    worldObjectPosition: '50% 45%',
    agent: { left: 44, top: 46, width: 27, flip: false },
    markers: [{ left: 26, top: 54 }, { left: 62, top: 43 }, { left: 78, top: 57 }],
  },
  reveal: {
    worldObjectPosition: '50% 45%',
    agent: { left: 45, top: 46, width: 26, flip: false },
    markers: [{ left: 28, top: 54 }, { left: 62, top: 43 }, { left: 78, top: 57 }],
  },
  final: {
    worldObjectPosition: '50% 45%',
    agent: { left: 45, top: 46, width: 26, flip: false },
    markers: [{ left: 28, top: 54 }, { left: 62, top: 43 }, { left: 78, top: 57 }],
  },
  inventory: {
    worldObjectPosition: '50% 42%',
    agent: { left: 34, top: 42, width: 27, flip: false },
    markers: [],
  },
  tradeoff: {
    worldObjectPosition: '50% 43%',
    agent: { left: 34, top: 43, width: 27, flip: false },
    markers: [],
  },
};

export function getImmersiveSceneConfig(world, agentId) {
  const base = immersiveSceneConfig[world];
  if (!base) return null;

  const override = base.agentOverrides?.[agentId];

  return {
    ...base,
    agent: override ? { ...base.agent, ...override } : base.agent,
  };
}

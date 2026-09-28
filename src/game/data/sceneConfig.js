export const immersiveSceneConfig = {
  forest: {
    worldObjectPosition: '50% 42%',
    agent: { left: 38, ground: 61, width: 22, flip: false },
    agentOverrides: {
      kira: { left: 38, ground: 61, width: 21 },
      nexo: { left: 38, ground: 61, width: 21 },
      teo: { left: 38, ground: 61, width: 21 },
    },
    markers: [],
  },
  schoolyard: {
    worldObjectPosition: '50% 46%',
    agent: { left: 52, ground: 61, width: 22, flip: false },
    agentOverrides: {
      nexo: { left: 52, ground: 61, width: 21 },
      kira: { left: 52, ground: 61, width: 21 },
    },
    markers: [],
  },
  bridge: {
    worldObjectPosition: '50% 45%',
    agent: { left: 45, ground: 58, width: 21, flip: false },
    agentOverrides: {
      nexo: { left: 45, ground: 58, width: 20 },
      kira: { left: 45, ground: 58, width: 20 },
    },
    markers: [],
  },
  ai: {
    worldObjectPosition: '50% 43%',
    agent: { left: 44, ground: 60, width: 21, flip: false },
    markers: [],
  },
  arena: {
    worldObjectPosition: '50% 47%',
    agent: { left: 50, ground: 60, width: 21, flip: false },
    markers: [],
  },
  city: {
    worldObjectPosition: '50% 45%',
    agent: { left: 57, ground: 59, width: 20, flip: false },
    agentOverrides: {
      nexo: { left: 57, ground: 59, width: 19 },
      kira: { left: 57, ground: 59, width: 19 },
    },
    markers: [],
  },
  studio: {
    worldObjectPosition: '50% 45%',
    agent: { left: 43, ground: 60, width: 21, flip: false },
    markers: [],
  },
  workshop: {
    worldObjectPosition: '50% 45%',
    agent: { left: 44, ground: 60, width: 21, flip: false },
    markers: [],
  },
  boss: {
    worldObjectPosition: '50% 45%',
    agent: { left: 45, ground: 59, width: 21, flip: false },
    markers: [],
  },
  reveal: {
    worldObjectPosition: '50% 45%',
    agent: { left: 45, ground: 59, width: 21, flip: false },
    markers: [],
  },
  final: {
    worldObjectPosition: '50% 45%',
    agent: { left: 46, ground: 59, width: 21, flip: false },
    markers: [],
  },
  inventory: {
    worldObjectPosition: '50% 42%',
    agent: { left: 35, ground: 56, width: 21, flip: false },
    markers: [],
  },
  tradeoff: {
    worldObjectPosition: '50% 43%',
    agent: { left: 36, ground: 57, width: 21, flip: false },
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

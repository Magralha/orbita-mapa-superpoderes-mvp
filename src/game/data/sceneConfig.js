export const immersiveSceneConfig = {
  forest: {
    worldObjectPosition: '50% 42%',
    agent: { left: 36, top: 43, width: 29, flip: false },
    markers: [{ left: 29, top: 55 }, { left: 63, top: 48 }, { left: 78, top: 57 }],
  },
  schoolyard: {
    worldObjectPosition: '50% 46%',
    agent: { left: 51, top: 47, width: 26, flip: false },
    markers: [{ left: 26, top: 48 }, { left: 66, top: 43 }, { left: 76, top: 58 }],
  },
  bridge: {
    worldObjectPosition: '50% 45%',
    agent: { left: 39, top: 45, width: 27, flip: false },
    markers: [{ left: 31, top: 54 }, { left: 58, top: 43 }, { left: 77, top: 56 }],
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
    agent: { left: 43, top: 46, width: 25, flip: false },
    markers: [{ left: 28, top: 54 }, { left: 60, top: 43 }, { left: 78, top: 56 }],
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
};

export function getImmersiveSceneConfig(world) {
  return immersiveSceneConfig[world] || null;
}

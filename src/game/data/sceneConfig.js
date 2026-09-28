export const immersiveSceneConfig = {
  forest: {
    worldObjectPosition: '50% 38%',
    agent: { left: 33, top: 43, width: 24, flip: false },
    markers: [
      { left: 24, top: 54 },
      { left: 63, top: 48 },
      { left: 78, top: 60 },
    ],
  },
};

export function getImmersiveSceneConfig(world) {
  return immersiveSceneConfig[world] || null;
}

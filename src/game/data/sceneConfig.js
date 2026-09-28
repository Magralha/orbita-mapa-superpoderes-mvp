export const immersiveSceneConfig = {
  forest: {
    worldObjectPosition: '50% 42%',
    agent: { left: 36, top: 43, width: 29, flip: false },
    markers: [
      { left: 29, top: 55 },
      { left: 63, top: 48 },
      { left: 78, top: 57 },
    ],
  },
};

export function getImmersiveSceneConfig(world) {
  return immersiveSceneConfig[world] || null;
}

function hashString(value = '') {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function parseObjectPosition(value = '50% 50%') {
  const parts = String(value).trim().split(/\s+/);
  const parse = (part, fallback) => {
    if (!part) return fallback;
    if (part.endsWith('%')) return clamp(Number.parseFloat(part) / 100, 0, 1);
    const number = Number.parseFloat(part);
    return Number.isFinite(number) ? clamp(number, 0, 1) : fallback;
  };

  return {
    x: parse(parts[0], 0.5),
    y: parse(parts[1], 0.5),
  };
}

export function getCoverGeometry({
  containerWidth,
  containerHeight,
  imageWidth,
  imageHeight,
  objectPosition,
}) {
  if (!containerWidth || !containerHeight || !imageWidth || !imageHeight) return null;

  const scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
  const renderedWidth = imageWidth * scale;
  const renderedHeight = imageHeight * scale;
  const position = parseObjectPosition(objectPosition);
  const offsetX = (containerWidth - renderedWidth) * position.x;
  const offsetY = (containerHeight - renderedHeight) * position.y;

  return {
    scale,
    renderedWidth,
    renderedHeight,
    offsetX,
    offsetY,
  };
}

export function getDepthScale(anchor = {}) {
  const mappedDepth = Number.isFinite(Number(anchor.depth))
    ? Number(anchor.depth)
    : Number.isFinite(Number(anchor.y))
      ? Number(anchor.y)
      : 0.56;

  // 0 = farther into the scene, 1 = closer to the camera.
  // 0.56 is the neutral floor plane used by most mapped scenes.
  const depth = clamp(mappedDepth, 0, 1);
  const perspectiveScale = clamp(1 + (depth - 0.56) * 1.5, 0.82, 1.18);
  const manualScale = Number.isFinite(Number(anchor.zScale))
    ? clamp(Number(anchor.zScale), 0.72, 1.35)
    : 1;

  return {
    depth,
    scale: clamp(perspectiveScale * manualScale, 0.72, 1.35),
  };
}

export function projectSourceAnchor(anchor, geometry, containerWidth) {
  if (!anchor || !geometry) return null;

  // X/Y always come from the source image. The feet stay attached to this
  // projected point regardless of crop/aspect ratio. Z is simulated only by
  // changing the avatar scale around its bottom-center transform origin.
  const x = geometry.offsetX + anchor.x * geometry.renderedWidth;
  const y = geometry.offsetY + anchor.y * geometry.renderedHeight;
  const depthModel = getDepthScale(anchor);
  const rawWidth = geometry.renderedWidth * (Number(anchor.width || 13) / 100);
  const width = clamp(rawWidth * depthModel.scale, containerWidth * 0.09, containerWidth * 0.23);
  const height = width * (4 / 3);

  return {
    anchor,
    x,
    y,
    width,
    height,
    depth: depthModel.depth,
    depthScale: depthModel.scale,
    box: {
      left: x - width * 0.5,
      right: x + width * 0.5,
      top: y - height,
      bottom: y,
    },
  };
}

function overlapArea(a, b) {
  if (!a || !b) return 0;
  const left = Math.max(a.left, b.left);
  const right = Math.min(a.right, b.right);
  const top = Math.max(a.top, b.top);
  const bottom = Math.min(a.bottom, b.bottom);
  return Math.max(0, right - left) * Math.max(0, bottom - top);
}

function normalizedRect(element, shellRect) {
  if (!element || !shellRect) return null;
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left - shellRect.left,
    right: rect.right - shellRect.left,
    top: rect.top - shellRect.top,
    bottom: rect.bottom - shellRect.top,
  };
}

export function chooseProjectedPlacement({
  config,
  stageType,
  nodeId,
  containerWidth,
  containerHeight,
  imageWidth,
  imageHeight,
  reservedElements = [],
}) {
  const candidates = config?.placementCandidates?.length
    ? config.placementCandidates
    : config?.agent
      ? [config.agent]
      : [];

  const geometry = getCoverGeometry({
    containerWidth,
    containerHeight,
    imageWidth,
    imageHeight,
    objectPosition: config?.worldObjectPosition,
  });

  if (!geometry || !candidates.length) return null;

  const isSpecial = ['inventory', 'use-item', 'tradeoff', 'power-challenge', 'mission'].includes(stageType);
  const safe = isSpecial ? (config.specialSafeArea || config.safeArea) : config.safeArea;
  const safeRect = {
    left: containerWidth * (safe?.left ?? 0.10),
    right: containerWidth * (safe?.right ?? 0.90),
    top: containerHeight * (safe?.top ?? 0.22),
    bottom: containerHeight * (safe?.bottom ?? 0.62),
  };

  const shellRect = reservedElements.find((entry) => entry?.shellRect)?.shellRect;
  const reservedRects = reservedElements
    .map((entry) => entry?.rect || (entry?.element && shellRect ? normalizedRect(entry.element, shellRect) : null))
    .filter(Boolean);

  const seed = hashString(nodeId || 'orbita-placement');

  const ranked = candidates.map((anchor, index) => {
    const projected = projectSourceAnchor(anchor, geometry, containerWidth);
    if (!projected) return null;

    const area = Math.max(1, projected.width * projected.height);
    let score = Number(anchor.priority || 0) * 10;

    // Keep the feet on-screen and above the decision sheet.
    if (projected.x < safeRect.left) score -= (safeRect.left - projected.x) * 1.4;
    if (projected.x > safeRect.right) score -= (projected.x - safeRect.right) * 1.4;
    if (projected.y < safeRect.top) score -= (safeRect.top - projected.y) * 1.6;
    if (projected.y > safeRect.bottom) score -= (projected.y - safeRect.bottom) * 2.2;

    // Prefer the whole body inside the scene.
    if (projected.box.left < 2) score -= Math.abs(projected.box.left) * 2;
    if (projected.box.right > containerWidth - 2) score -= (projected.box.right - containerWidth) * 2;
    if (projected.box.top < 0) score -= Math.abs(projected.box.top) * 2.5;

    // Avoid covering HUD, profile controls and the decision sheet.
    for (const rect of reservedRects) {
      const overlap = overlapArea(projected.box, rect);
      if (overlap > 0) score -= (overlap / area) * 500;
    }

    // Stable variation between nodes that use the same world.
    const tieBreak = ((seed + index * 37) % 101) / 100;
    score += tieBreak;

    return { ...projected, score };
  }).filter(Boolean);

  ranked.sort((a, b) => b.score - a.score);
  return ranked[0] || null;
}

export function buildReservedElements(shell) {
  if (!shell) return [];
  const shellRect = shell.getBoundingClientRect();
  const selectors = [
    '.immersiveTopHud',
    '.immersiveAgentChip',
    '.immersiveInventoryChip',
    '.immersiveRestartButton',
    '.immersiveDecisionSheet',
  ];

  return [
    { shellRect },
    ...selectors.map((selector) => ({ element: shell.querySelector(selector), shellRect })),
  ];
}

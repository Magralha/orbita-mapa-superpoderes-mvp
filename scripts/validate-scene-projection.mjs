import { immersiveSceneConfig } from '../src/game/data/sceneConfig.js';
import {
  getCoverGeometry,
  getDepthScale,
  projectSourceAnchor,
} from '../src/game/engine/scenePlacementEngine.js';

const errors = [];
const viewports = [
  [320, 568],
  [360, 800],
  [390, 844],
  [430, 932],
  [560, 1024],
];
const imageSizes = [
  [1536, 1024],
  [1024, 1536],
];

function close(a, b, tolerance = 0.001) {
  return Math.abs(Number(a) - Number(b)) <= tolerance;
}

for (const [world, config] of Object.entries(immersiveSceneConfig)) {
  const anchors = [...(config.anchors || []), ...(config.specialAnchors || [])];

  for (const anchor of anchors) {
    const baseDepth = getDepthScale(anchor);
    if (!(baseDepth.scale >= 0.72 && baseDepth.scale <= 1.35)) {
      errors.push(world + '/' + anchor.id + ': invalid base Z scale ' + baseDepth.scale);
    }

    for (const [containerWidth, containerHeight] of viewports) {
      for (const [imageWidth, imageHeight] of imageSizes) {
        const geometry = getCoverGeometry({
          containerWidth,
          containerHeight,
          imageWidth,
          imageHeight,
          objectPosition: config.worldObjectPosition,
        });

        const base = projectSourceAnchor(anchor, geometry, containerWidth);
        const far = projectSourceAnchor({ ...anchor, zScale: 0.78 }, geometry, containerWidth);
        const near = projectSourceAnchor({ ...anchor, zScale: 1.22 }, geometry, containerWidth);

        if (!base || !far || !near) {
          errors.push(world + '/' + anchor.id + ': projection returned null');
          continue;
        }

        // X/Y define the feet point. Z is allowed to change only the avatar size.
        if (!close(base.x, far.x) || !close(base.x, near.x)) {
          errors.push(world + '/' + anchor.id + ': Z changed projected X');
        }
        if (!close(base.y, far.y) || !close(base.y, near.y)) {
          errors.push(world + '/' + anchor.id + ': Z changed projected Y');
        }

        // Bottom of the character box must remain exactly on the mapped floor point.
        if (!close(base.box.bottom, base.y) || !close(far.box.bottom, far.y) || !close(near.box.bottom, near.y)) {
          errors.push(world + '/' + anchor.id + ': feet detached from support point');
        }

        // Projection must map back to the same source-image coordinates after cover crop.
        const sourceX = (base.x - geometry.offsetX) / geometry.renderedWidth;
        const sourceY = (base.y - geometry.offsetY) / geometry.renderedHeight;
        if (!close(sourceX, anchor.x) || !close(sourceY, anchor.y)) {
          errors.push(world + '/' + anchor.id + ': projected point no longer matches source-image X/Y');
        }

        if (!Number.isFinite(base.width) || base.width <= 0) {
          errors.push(world + '/' + anchor.id + ': invalid projected width');
        }
      }
    }
  }
}

if (errors.length) {
  console.error('\nÓrbita scene projection validation failed:\n');
  errors.forEach((error) => console.error('- ' + error));
  process.exit(1);
}

console.log(
  'Órbita scene projection OK: source-image X/Y stay fixed while Z changes avatar scale across ' +
  viewports.length + ' viewport shapes.',
);

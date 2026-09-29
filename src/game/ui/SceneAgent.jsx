import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { assets } from '../data/assets';
import {
  buildReservedElements,
  chooseProjectedPlacement,
} from '../engine/scenePlacementEngine';

function fallbackPlacement(config) {
  const agent = config?.agent;
  if (!agent) return null;

  const xPercent = Number.isFinite(Number(agent.left))
    ? Number(agent.left)
    : Number.isFinite(Number(agent.x))
      ? Number(agent.x) * 100
      : 50;

  const yPercent = Number.isFinite(Number(agent.ground))
    ? Number(agent.ground)
    : Number.isFinite(Number(agent.y))
      ? Number(agent.y) * 100
      : 55;

  return {
    anchor: agent,
    xPercent,
    yPercent,
    widthPercent: Number(agent.width || 13),
  };
}

export default function SceneAgent({
  agent,
  config,
  nodeId,
  stageType,
}) {
  const rootRef = useRef(null);
  const [placement, setPlacement] = useState(null);
  const fallback = useMemo(() => fallbackPlacement(config), [config]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const shell = root?.closest('.immersiveGameShell');
    const worldImage = shell?.querySelector('.immersiveWorldImage');
    if (!root || !shell || !worldImage) return undefined;

    let frame = 0;

    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!worldImage.naturalWidth || !worldImage.naturalHeight) return;

        const shellRect = shell.getBoundingClientRect();
        const next = chooseProjectedPlacement({
          config,
          stageType,
          nodeId,
          containerWidth: shellRect.width,
          containerHeight: shellRect.height,
          imageWidth: worldImage.naturalWidth,
          imageHeight: worldImage.naturalHeight,
          reservedElements: buildReservedElements(shell),
        });

        if (!next) return;

        setPlacement((current) => {
          if (
            current
            && current.anchor?.id === next.anchor?.id
            && Math.abs(current.x - next.x) < 0.5
            && Math.abs(current.y - next.y) < 0.5
            && Math.abs(current.width - next.width) < 0.5
          ) {
            return current;
          }
          return next;
        });
      });
    };

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(update)
      : null;

    observer?.observe(shell);
    window.addEventListener('resize', update);
    worldImage.addEventListener('load', update);
    update();

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', update);
      worldImage.removeEventListener('load', update);
    };
  }, [config, nodeId, stageType]);

  const active = placement?.anchor || config?.agent || {};
  const style = placement
    ? {
        left: `${placement.x}px`,
        top: `${placement.y}px`,
        width: `${placement.width}px`,
      }
    : {
        left: `${fallback?.xPercent ?? 50}%`,
        top: `${fallback?.yPercent ?? 55}%`,
        width: `${fallback?.widthPercent ?? 13}%`,
      };

  return (
    <div
      ref={rootRef}
      className={`immersiveAgentSprite immersiveAgentSprite-${agent.id}`}
      data-scene-anchor={active.id || 'fallback'}
      data-scene-surface={active.surface || 'floor'}
      style={{
        ...style,
        zIndex: active.zIndex || 9,
        '--agent-shadow-width': `${active.shadowWidth || 58}%`,
        '--agent-shadow-height': `${active.shadowHeight || 8}%`,
        '--agent-shadow-opacity': active.shadowOpacity ?? 0.34,
        '--agent-shadow-blur': `${active.shadowBlur || 5}px`,
        '--agent-shadow-rotate': `${active.shadowRotate || 0}deg`,
        '--agent-shadow-skew-x': `${active.shadowSkewX || 0}deg`,
        '--agent-brightness': active.brightness ?? 1,
        '--agent-contrast': active.contrast ?? 1,
        '--agent-saturate': active.saturate ?? 1,
        transform: [
          'translate(-50%, -100%)',
          `rotate(${active.rotate || 0}deg)`,
          `skewX(${active.skewX || 0}deg)`,
          `scaleX(${(active.flip ? -1 : 1) * (active.perspectiveScaleX || 1)})`,
        ].join(' '),
      }}
    >
      <span className="immersiveAgentGlow" />
      <img src={assets.agents[agent.id]} alt="" />
      <i className="immersiveAgentShadow" />
    </div>
  );
}

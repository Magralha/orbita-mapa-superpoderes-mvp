import React from 'react';
import { boardAssets, boardSteps } from '../data/boardAssets';

export default function BoardJourney({ step = 0, total = 1, compact = false }) {
  const safeStep = Math.min(step, boardSteps.length - 1);
  const current = boardSteps[safeStep] || boardSteps[0];

  return (
    <section className={`boardJourney ${compact ? 'boardCompact' : ''}`}>
      <picture>
        <source media="(min-width: 900px)" srcSet={boardAssets.boards.desktop} />
        <img className="boardBg" src={boardAssets.boards.mobile} alt="" />
      </picture>

      <div className="boardOverlay">
        <div className="boardTop">
          <div>
            <span className="boardEyebrow">Tabuleiro vivo</span>
            <h2>{current.label}</h2>
          </div>
          <div className="boardCounter">
            {safeStep + 1}/{total}
          </div>
        </div>

        <div className="miniPath">
          {boardSteps.slice(0, total).map((node, index) => {
            const isDone = index < safeStep;
            const isCurrent = index === safeStep;
            const img =
              isDone ? boardAssets.ui.tileCompleted :
              isCurrent ? boardAssets.ui.tileChoice :
              boardAssets.ui.tileLocked;

            return (
              <div
                className={`miniNode ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                key={`${node.label}-${index}`}
              >
                <img src={img} alt="" />
                {isCurrent ? (
                  <img className="playerToken" src={boardAssets.ui.token} alt="" />
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="worldBadge">
          <img src={boardAssets.worlds[current.world]} alt="" />
        </div>
      </div>
    </section>
  );
}

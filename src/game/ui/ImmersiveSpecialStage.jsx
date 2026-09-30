import React from 'react';
import { assets } from '../data/assets';
import { OrbitaWordmark } from './MobileUI';
import { getImmersiveSceneConfig } from '../data/sceneConfig';
import SceneAgent from './SceneAgent';

export function canUseImmersiveSpecialStage(node) {
  return ['inventory', 'use-item', 'tradeoff', 'power-challenge', 'mission'].includes(node?.type)
    && Boolean(assets.worlds[node?.world])
    && Boolean(getImmersiveSceneConfig(node?.world));
}

export default function ImmersiveSpecialStage({
  agent,
  node,
  visitedCount,
  inventory = [],
  onExit,
  onRestart,
  children,
}) {
  const config = getImmersiveSceneConfig(node.world, agent?.id, {
    nodeId: node.id,
    stageType: node.type,
  });
  if (!config) return null;

  const progress = Math.min(100, Math.max(4, (visitedCount / 40) * 100));

  return (
    <main className={`immersiveGamePage immersiveSpecialPage immersiveSpecial-${node.type}`}>
      <section className="immersiveGameShell">
        <img
          className="immersiveWorldImage"
          src={assets.worlds[node.world]}
          alt=""
          style={{ objectPosition: config.worldObjectPosition }}
        />
        <div className="immersiveWorldShade immersiveSpecialShade" />

        <header className="immersiveTopHud">
          <button type="button" className="immersiveExitButton" onClick={onExit} aria-label="Salvar progresso">‹</button>
          <OrbitaWordmark compact />
          <div className="immersiveSavedChip"><span>✓</span><strong>salvo</strong></div>
          <div className="immersiveProgressChip">
            <span>Jornada {Math.round(progress)}%</span>
            <i><em style={{ width: `${progress}%` }} /></i>
          </div>
        </header>

        {onRestart && (
          <button
            type="button"
            className="immersiveRestartButton"
            onClick={onRestart}
            aria-label="Refazer teste desde o início"
          >
            ↻ Refazer teste
          </button>
        )}

        <aside className="immersiveAgentChip immersiveAgentChipSpecial">
          <strong>{agent.name}</strong>
          <span>em missão</span>
        </aside>

        <div className="immersiveInventoryChip">
          <span>▣</span>
          <strong>Mochila</strong>
          {inventory.length > 0 && <b>{inventory.length}</b>}
        </div>

        <SceneAgent
          agent={agent}
          config={config}
          nodeId={node.id}
          stageType={node.type}
        />

        <section className="immersiveDecisionSheet immersiveSpecialSheet">
          <div className="immersiveLocationTag">{node.chapter}</div>
          <h1>{node.title}</h1>
          <p>{node.text}</p>
          <div className="immersiveSpecialContent">{children}</div>
        </section>
      </section>
    </main>
  );
}

import React from 'react';
import { assets } from '../data/assets';
import { OrbitaWordmark } from './MobileUI';
import { getImmersiveSceneConfig } from '../data/sceneConfig';

export function canUseImmersiveSpecialStage(node) {
  return ['inventory', 'use-item', 'tradeoff', 'power-challenge', 'mission'].includes(node?.type)
    && Boolean(getImmersiveSceneConfig(node?.world));
}

export default function ImmersiveSpecialStage({
  agent,
  node,
  visitedCount,
  inventory = [],
  onExit,
  children,
}) {
  const config = getImmersiveSceneConfig(node.world, agent?.id);
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

        <aside className="immersiveAgentChip immersiveAgentChipSpecial">
          <strong>{agent.name}</strong>
          <span>em missão</span>
        </aside>

        <div className="immersiveInventoryChip">
          <span>▣</span>
          <strong>Mochila</strong>
          <b>{inventory.length}</b>
        </div>

        <div
          className={`immersiveAgentSprite immersiveAgentSprite-${agent.id}`}
          style={{
            left: `${config.agent.left}%`,
            top: `${config.agent.top}%`,
            width: `${config.agent.width}%`,
            transform: `translate(-50%, -50%) ${config.agent.flip ? 'scaleX(-1)' : ''}`,
          }}
        >
          <span className="immersiveAgentGlow" />
          <img src={assets.agents[agent.id]} alt="" />
          <i className="immersiveAgentShadow" />
        </div>

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

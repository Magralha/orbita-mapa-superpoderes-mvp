import React from 'react';
import { assets } from '../data/assets';
import { OrbitaWordmark } from './MobileUI';
import { getImmersiveSceneConfig } from '../data/sceneConfig';

const powerLabels = {
  investigar: 'Investigar',
  criar: 'Criar',
  cuidar: 'Cuidar',
  construir: 'Construir',
  comunicar: 'Comunicar',
  organizar: 'Organizar',
  proteger: 'Proteger',
  conectar: 'Conectar',
};

function dominantPower(powers = {}) {
  return Object.entries(powers).sort((a, b) => Number(b[1] || 0) - Number(a[1] || 0))[0]?.[0] || 'investigar';
}

export function canUseImmersiveScene(node) {
  return node?.world === 'forest' && node?.type === 'choice';
}

export default function ImmersiveScene({
  agent,
  node,
  visitedCount,
  inventory = [],
  powerTokens = {},
  onExit,
  children,
}) {
  const config = getImmersiveSceneConfig(node.world);
  if (!config) return null;

  const topPowers = Object.entries(powerTokens)
    .filter(([, value]) => value > 0)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 2);

  const choices = (node.choices || []).slice(0, 3);
  const progress = Math.min(100, Math.max(4, (visitedCount / 40) * 100));

  return (
    <main className="immersiveGamePage">
      <section className="immersiveGameShell">
        <img
          className="immersiveWorldImage"
          src={assets.worlds[node.world]}
          alt=""
          style={{ objectPosition: config.worldObjectPosition }}
        />
        <div className="immersiveWorldShade" />

        <header className="immersiveTopHud">
          <button
            type="button"
            className="immersiveExitButton"
            onClick={onExit}
            aria-label="Sair da missão"
          >
            ‹
          </button>

          <OrbitaWordmark compact />

          <div className="immersiveSavedChip">
            <span>✓</span>
            <strong>Salvo</strong>
          </div>

          <div className="immersiveProgressChip">
            <span>Etapa {Math.max(1, visitedCount)}/40</span>
            <i><em style={{ width: `${progress}%` }} /></i>
          </div>
        </header>

        <aside className="immersiveAgentMiniHud">
          <div className="immersiveAgentMiniPortrait">
            <img src={assets.agents[agent.id]} alt="" />
          </div>
          <div className="immersiveAgentMiniInfo">
            <strong>{agent.name}</strong>
            <div className="immersiveMiniPowers">
              {topPowers.length ? topPowers.map(([key, value]) => (
                <span key={key} title={powerLabels[key] || key}>
                  <img src={assets.badges[key]} alt="" />
                  <i><em style={{ width: `${Math.min(100, 28 + Number(value) * 15)}%` }} /></i>
                </span>
              )) : (
                <small>poderes carregando</small>
              )}
            </div>
          </div>
        </aside>

        <div className="immersiveInventoryChip" aria-label={`Mochila com ${inventory.length} itens`}>
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

        <div className="immersiveChoiceMarkers" aria-hidden="true">
          {config.markers.map((marker, index) => {
            const choice = choices[index];
            const key = dominantPower(choice?.powers);
            return (
              <span
                key={`${marker.left}-${marker.top}`}
                style={{ left: `${marker.left}%`, top: `${marker.top}%` }}
              >
                <img src={assets.badges[key]} alt="" />
              </span>
            );
          })}
        </div>

        <section className="immersiveDecisionSheet">
          <div className="immersiveDecisionGrabber" />
          <div className="immersiveLocationTag">{node.chapter}</div>
          <h1>{node.title}</h1>
          <p>{node.text}</p>
          <div className="immersiveDecisionContent">{children}</div>
        </section>
      </section>
    </main>
  );
}

import React, { useMemo, useState } from 'react';
import { assets } from '../game/data/assets';
import { getTopPowers } from '../game/player/playerProfile';
import RoleSwitcher from '../app/RoleSwitcher';

const POWER_LABELS = {
  investigar: 'Investigar',
  criar: 'Criar',
  cuidar: 'Cuidar',
  construir: 'Construir',
  comunicar: 'Comunicar',
  organizar: 'Organizar',
  proteger: 'Proteger',
  conectar: 'Conectar',
};

const FAMILY_MISSIONS = [
  {
    id: 'fam-organiza',
    title: 'Missão Menos Caos',
    territory: 'Casa',
    duration: '10 min',
    xp: 25,
    powers: ['organizar', 'construir'],
    text: 'Escolha uma rotina de casa que poderia ficar mais simples e organize em três passos.',
  },
  {
    id: 'fam-ensina',
    title: 'Ensine uma Coisa',
    territory: 'Casa',
    duration: '10 min',
    xp: 25,
    powers: ['comunicar', 'cuidar'],
    text: 'Ensine para alguém de casa algo que você sabe fazer bem.',
  },
  {
    id: 'fam-inventa',
    title: 'Dois Objetos, Uma Ideia',
    territory: 'Casa',
    duration: '8 min',
    xp: 20,
    powers: ['criar', 'construir'],
    text: 'Escolha dois objetos de casa e imagine uma invenção que combine os dois.',
  },
];

export default function FamilyPortal({ agent, profile, opportunities = [], onModeChange }) {
  const top = getTopPowers(profile, 3);
  const [sentMissions, setSentMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(FAMILY_MISSIONS[0].id);

  const selected = useMemo(
    () => FAMILY_MISSIONS.find((mission) => mission.id === selectedMission) || FAMILY_MISSIONS[0],
    [selectedMission],
  );

  function sendMission() {
    if (!sentMissions.includes(selected.id)) {
      setSentMissions((current) => [...current, selected.id]);
    }
  }

  return (
    <main className="portalPage familyPortal portalGameSkin">
      <div className="portalShell">
        <RoleSwitcher mode="family" onChange={onModeChange} />

        <header className="portalHeader portalHeaderGame">
          <div>
            <div className="gameBadge">Órbita Família</div>
            <h1>Acompanhar, conversar e criar novas experiências.</h1>
            <p>
              A família vê recorrências, interesses e experiências do jovem sem transformar
              o mapa em nota ou diagnóstico.
            </p>
          </div>

          <div className="familyStudentMini familyStudentGame">
            <div className="familyAgentScene">
              <img src={assets.worlds.forest} alt="" />
              <img className="familyAgentSprite" src={assets.agents[agent.id]} alt="" />
            </div>
            <span>
              <small>Agente atual</small>
              <strong>{agent.name}</strong>
              <b>Nível {profile.progression?.level || 1} · {profile.progression?.xp || 0} XP</b>
            </span>
          </div>
        </header>

        <section className="portalGrid portalGridThree">
          {top.map((power) => (
            <article className="portalMetric powerSignalCard portalGameCard" key={power.key}>
              <img src={assets.badges[power.key]} alt="" />
              <span>Aparece com frequência</span>
              <strong>{POWER_LABELS[power.key] || power.key}</strong>
              <small>{power.value} sinais acumulados na jornada</small>
            </article>
          ))}
        </section>

        <section className="portalGrid">
          <article className="portalPanel portalGameCard">
            <span className="portalEyebrow">Missão para enviar</span>
            <h2>Crie continuidade em casa</h2>
            <div className="familyMissionPicker">
              {FAMILY_MISSIONS.map((mission) => (
                <button
                  type="button"
                  key={mission.id}
                  className={selectedMission === mission.id ? 'active' : ''}
                  onClick={() => setSelectedMission(mission.id)}
                >
                  <span>{mission.territory}</span>
                  <strong>{mission.title}</strong>
                  <small>{mission.duration} · +{mission.xp} XP</small>
                </button>
              ))}
            </div>

            <div className="familyMissionPreview">
              <span>MISSÃO DE CASA</span>
              <h3>{selected.title}</h3>
              <p>{selected.text}</p>
              <div className="familyMissionPowers">
                {selected.powers.map((key) => (
                  <span key={key}>
                    <img src={assets.badges[key]} alt="" />
                    {POWER_LABELS[key]}
                  </span>
                ))}
              </div>
              <button type="button" className="portalPrimaryAction" onClick={sendMission}>
                {sentMissions.includes(selected.id) ? 'Missão enviada ✓' : 'Enviar para o Órbita'}
              </button>
            </div>
          </article>

          <article className="portalPanel familyConversation portalGameCard">
            <span className="portalEyebrow">Conversa sugerida</span>
            <h2>Uma pergunta para esta semana</h2>
            <blockquote>
              “Qual foi uma coisa que você descobriu que consegue fazer melhor do que imaginava?”
            </blockquote>
            <p>
              O objetivo é abrir espaço para reflexão e novas experiências, não avaliar desempenho.
            </p>
          </article>
        </section>

        <section className="portalGrid">
          <article className="portalPanel portalGameCard">
            <span className="portalEyebrow">Experiências registradas</span>
            <h2>O que já entrou no Passaporte Órbita</h2>
            <div className="familyExperiences">
              {(profile.experiences || []).map((experience) => (
                <div key={experience.id}>
                  <span>{experience.verified ? '✓' : '•'}</span>
                  <b>{experience.label}</b>
                  <small>{experience.category}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="portalPanel portalGameCard">
            <span className="portalEyebrow">Missões enviadas</span>
            <h2>Continuidade em casa</h2>
            <div className="familySentMissions">
              {sentMissions.length ? sentMissions.map((id) => {
                const mission = FAMILY_MISSIONS.find((item) => item.id === id);
                return (
                  <div key={id}>
                    <span>✓</span>
                    <strong>{mission.title}</strong>
                    <small>Aguardando conclusão do jovem</small>
                  </div>
                );
              }) : (
                <p>Nenhuma missão enviada ainda.</p>
              )}
            </div>
          </article>
        </section>

        <section className="portalPanel portalGameCard">
          <span className="portalEyebrow">Oportunidades para explorar</span>
          <h2>Experiências disponíveis no território</h2>
          <div className="opportunityCards">
            {opportunities.map((opportunity) => (
              <article key={opportunity.id}>
                <span>{opportunity.category}</span>
                <strong>{opportunity.title}</strong>
                <small>{opportunity.territory} · {opportunity.capacity} vagas</small>
                <button type="button">Ver oportunidade</button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

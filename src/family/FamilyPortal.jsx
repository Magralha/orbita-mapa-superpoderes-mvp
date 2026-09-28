import React, { useMemo, useState } from 'react';
import { assets } from '../game/data/assets';
import { getTopPowers } from '../game/player/playerProfile';
import { FAMILY_MISSION_TEMPLATES } from '../game/engine/assignmentEngine';
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



export default function FamilyPortal({
  agent,
  profile,
  opportunities = [],
  assignments = [],
  onAssignMission,
  onModeChange,
}) {
  const top = getTopPowers(profile, 3);
  const [selectedMission, setSelectedMission] = useState(FAMILY_MISSION_TEMPLATES[0].id);

  const selected = useMemo(
    () => FAMILY_MISSION_TEMPLATES.find((mission) => mission.id === selectedMission) || FAMILY_MISSION_TEMPLATES[0],
    [selectedMission],
  );

  const familyAssignments = assignments.filter((item) => item.source === 'family');

  function sendMission() {
    onAssignMission?.(selected, { targetLabel: 'Meu jovem' });
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
              {FAMILY_MISSION_TEMPLATES.map((mission) => (
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
                {selected.powerKeys.map((key) => (
                  <span key={key}>
                    <img src={assets.badges[key]} alt="" />
                    {POWER_LABELS[key]}
                  </span>
                ))}
              </div>
              <button type="button" className="portalPrimaryAction" onClick={sendMission}>
                {familyAssignments.some((item) => item.templateId === selected.id && item.status === 'assigned')
                  ? 'Missão enviada ✓'
                  : 'Enviar para o Órbita'}
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
              {familyAssignments.length ? [...familyAssignments].reverse().map((mission) => (
                <div key={mission.assignmentId}>
                  <span>{mission.status === 'completed' ? '✓' : '→'}</span>
                  <strong>{mission.title}</strong>
                  <small>{mission.status === 'completed' ? 'Concluída pelo jovem' : 'Aguardando conclusão do jovem'}</small>
                </div>
              )) : (
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

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

export default function FamilyPortal({ agent, profile, opportunities = [], onModeChange }) {
  const top = getTopPowers(profile, 3);

  return (
    <main className="portalPage familyPortal">
      <div className="portalShell">
        <RoleSwitcher mode="family" onChange={onModeChange} />

        <header className="portalHeader">
          <div>
            <div className="gameBadge">Órbita · Responsável</div>
            <h1>Acompanhar sem colocar a criança em uma caixa.</h1>
            <p>
              Esta visão mostra sinais de desenvolvimento, experiências e oportunidades
              para ajudar a família a conversar e apoiar os próximos passos.
            </p>
          </div>
          <div className="familyStudentMini">
            <img src={assets.agents[agent.id]} alt="" />
            <span>
              <small>Agente escolhido</small>
              <strong>{agent.name}</strong>
              <b>Nível {profile.progression?.level || 1}</b>
            </span>
          </div>
        </header>

        <section className="portalGrid portalGridThree">
          {top.map((power) => (
            <article className="portalMetric powerSignalCard" key={power.key}>
              <img src={assets.badges[power.key]} alt="" />
              <span>Aparece com frequência</span>
              <strong>{POWER_LABELS[power.key] || power.key}</strong>
              <small>{power.value} sinais acumulados nesta jornada</small>
            </article>
          ))}
        </section>

        <section className="portalGrid">
          <article className="portalPanel">
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

          <article className="portalPanel familyConversation">
            <span className="portalEyebrow">Conversa sugerida</span>
            <h2>Uma pergunta para esta semana</h2>
            <blockquote>
              “Qual foi uma coisa que você descobriu que consegue fazer melhor do que imaginava?”
            </blockquote>
            <p>
              O objetivo é abrir conversa sobre experiências, não transformar o mapa em boletim.
            </p>
          </article>
        </section>

        <section className="portalPanel">
          <span className="portalEyebrow">Oportunidades que podem combinar</span>
          <h2>Experiências disponíveis para explorar</h2>
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

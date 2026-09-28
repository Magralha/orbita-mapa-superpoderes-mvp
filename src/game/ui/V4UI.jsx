import React, { useState } from 'react';
import { assets } from '../data/assets';
import { getTopPowers } from '../player/playerProfile';
import { OrbitaWordmark, MobileBottomNav } from './MobileUI';

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

const territoryMeta = {
  escola: { icon: '◆', label: 'Escola' },
  casa: { icon: '⌂', label: 'Casa' },
  mundo: { icon: '◎', label: 'Mundo' },
};

export function V4Home({
  agent,
  profile,
  mission,
  completedToday,
  weeklyCount,
  onStartMission,
  onOpenProfile,
  onOpenJourney,
  onOpenMissions,
}) {
  const top = getTopPowers(profile, 3);
  const level = profile?.progression?.level || 1;
  const xp = profile?.progression?.xp || 0;
  const progress = Math.max(0, Math.min(100, xp % 100));
  const territory = territoryMeta[mission?.territory] || territoryMeta.escola;

  return (
    <main className="v4Page">
      <section className="v4Shell">
        <header className="v4Top">
          <OrbitaWordmark />
          <div className="v4Level">
            <span>✦</span>
            <div>
              <strong>Nível {level}</strong>
              <small>{xp} XP</small>
            </div>
          </div>
        </header>

        <section className="v4Welcome">
          <div>
            <span className="v4Eyebrow">Seu Órbita continua</span>
            <h1>Hoje tem uma nova missão.</h1>
            <p>Cada experiência adiciona novos sinais ao seu mapa. Nenhuma resposta define você sozinha.</p>
          </div>
          <img src={assets.agents[agent.id]} alt="" />
        </section>

        <section className="v4ProgressCard">
          <div className="v4ProgressCopy">
            <strong>Constelação da semana</strong>
            <span>{weeklyCount}/5 estrelas encontradas</span>
          </div>
          <div className="v4WeekStars" aria-label={`${weeklyCount} de 5 missões concluídas`}>
            {[0, 1, 2, 3, 4].map((index) => (
              <i key={index} className={index < weeklyCount ? 'done' : ''}>★</i>
            ))}
          </div>
          <div className="v4XpTrack"><i style={{ width: `${progress}%` }} /></div>
        </section>

        <section className={`v4DailyCard v4Territory-${mission.territory}`}>
          <div className="v4DailyVisual">
            <img src={assets.worlds[mission.territory === 'escola' ? 'schoolyard' : mission.territory === 'casa' ? 'forest' : 'city']} alt="" />
            <span className="v4TerritoryTag">{territory.icon} {territory.label}</span>
          </div>
          <div className="v4DailyBody">
            <div className="v4DailyMeta">
              <span>MISSÃO DE HOJE</span>
              <small>{mission.duration} · +{mission.xp} XP</small>
            </div>
            <h2>{mission.title}</h2>
            <p>{mission.prompt}</p>
            <button type="button" className="v4PrimaryButton" onClick={onStartMission} disabled={completedToday}>
              {completedToday ? 'Missão concluída hoje ✓' : 'Começar missão'}
            </button>
          </div>
        </section>

        <section className="v4PowerStrip">
          <div className="v4SectionTitle">
            <div>
              <span>Mapa Vivo</span>
              <strong>Seus sinais mais fortes agora</strong>
            </div>
            <button type="button" onClick={onOpenProfile}>Ver mapa</button>
          </div>
          <div className="v4PowerCards">
            {top.map((power) => (
              <article key={power.key}>
                <img src={assets.badges[power.key]} alt="" />
                <span>{powerLabels[power.key] || power.key}</span>
                <strong>{power.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="v4MissionInboxCard">
          <div>
            <span>NOVAS MISSÕES</span>
            <strong>2 aguardando você</strong>
            <small>1 da escola · 1 da família</small>
          </div>
          <button type="button" onClick={onOpenMissions}>Abrir central</button>
        </section>

        <section className="v4QuestCard">
          <div>
            <span>QUEST DA SEMANA</span>
            <h2>O futuro da minha escola</h2>
            <p>Observe um problema real, reúna pistas e imagine uma primeira solução que possa ser testada.</p>
          </div>
          <button type="button" onClick={onOpenJourney}>Explorar</button>
        </section>

        <MobileBottomNav active="inicio" onHome={() => {}} onMissions={onOpenMissions} onProfile={onOpenProfile} />
      </section>
    </main>
  );
}

export function DailyMissionView({ mission, onComplete, onBack }) {
  const [selected, setSelected] = useState(null);
  const territory = territoryMeta[mission?.territory] || territoryMeta.escola;

  return (
    <main className="v4Page">
      <section className="v4Shell v4MissionShell">
        <header className="v4Top">
          <button className="v4BackButton" type="button" onClick={onBack}>‹</button>
          <OrbitaWordmark compact />
          <span className="v4TerritoryTag">{territory.icon} {territory.label}</span>
        </header>

        <section className="v4MissionHero">
          <span>MISSÃO DO DIA · {mission.duration}</span>
          <h1>{mission.title}</h1>
          <p>{mission.prompt}</p>
          <div className="v4Reward">+{mission.xp} XP</div>
        </section>

        <section className="v4ReflectionCard">
          <span>REGISTRE O QUE ACONTECEU</span>
          <h2>{mission.reflection}</h2>
          <div className="v4ReflectionOptions">
            {mission.options.map((option) => (
              <button
                type="button"
                key={option.id}
                className={selected?.id === option.id ? 'selected' : ''}
                onClick={() => setSelected(option)}
              >
                <span>{option.label}</span>
                <b>{selected?.id === option.id ? '✓' : '›'}</b>
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          className="v4PrimaryButton v4CompleteButton"
          disabled={!selected}
          onClick={() => onComplete(selected)}
        >
          Concluir missão
        </button>
      </section>
    </main>
  );
}


export function MissionCenter({ mission, completedToday, onStartDaily, onBack, onOpenProfile }) {
  const inbox = [
    {
      id: 'school-recreio',
      source: 'Escola',
      sourceClass: 'school',
      title: 'Desafio do Recreio',
      text: 'Observe o recreio e identifique um problema que você gostaria de melhorar.',
      meta: '15 min · +30 XP',
    },
    {
      id: 'family-menos-caos',
      source: 'Família',
      sourceClass: 'family',
      title: 'Missão Menos Caos',
      text: 'Escolha uma rotina de casa que poderia ficar mais simples e organize em três passos.',
      meta: '10 min · +25 XP',
    },
  ];

  return (
    <main className="v4Page">
      <section className="v4Shell v4MissionCenterShell">
        <header className="v4Top">
          <button className="v4BackButton" type="button" onClick={onBack}>‹</button>
          <OrbitaWordmark compact />
          <span className="v4TerritoryTag">◎ Missões</span>
        </header>

        <section className="v4MissionCenterHero">
          <span>CENTRAL DE MISSÕES</span>
          <h1>Escolha o que explorar agora.</h1>
          <p>O Órbita organiza missões da plataforma, da escola e da família em uma única jornada.</p>
        </section>

        <section className="v4MissionCenterList">
          <article className="v4MissionSourceCard orbita">
            <div className="v4MissionSourceHead">
              <span>ÓRBITA</span>
              <small>{mission.duration} · +{mission.xp} XP</small>
            </div>
            <h2>{mission.title}</h2>
            <p>{mission.prompt}</p>
            <button type="button" onClick={onStartDaily} disabled={completedToday}>
              {completedToday ? 'Concluída hoje ✓' : 'Começar missão'}
            </button>
          </article>

          {inbox.map((item) => (
            <article className={`v4MissionSourceCard ${item.sourceClass}`} key={item.id}>
              <div className="v4MissionSourceHead">
                <span>{item.source}</span>
                <small>{item.meta}</small>
              </div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <button type="button">Abrir missão</button>
            </article>
          ))}
        </section>

        <MobileBottomNav
          active="missao"
          onHome={onBack}
          onMissions={() => {}}
          onProfile={onOpenProfile}
        />
      </section>
    </main>
  );
}

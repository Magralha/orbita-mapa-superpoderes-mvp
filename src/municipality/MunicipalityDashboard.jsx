import React, { useMemo, useState } from 'react';
import { assets } from '../game/data/assets';
import RoleSwitcher from '../app/RoleSwitcher';

const SCHOOL_MISSIONS = [
  {
    id: 'school-recreio',
    title: 'Desafio do Recreio',
    territory: 'Escola',
    duration: '15 min',
    xp: 30,
    powers: ['investigar', 'criar'],
    text: 'Observe o recreio por dois dias e identifique um problema que você gostaria de melhorar.',
  },
  {
    id: 'school-respeito',
    title: 'Respeito Digital',
    territory: 'Escola',
    duration: '10 min',
    xp: 25,
    powers: ['proteger', 'comunicar'],
    text: 'Crie uma ideia simples para melhorar a convivência digital da turma.',
  },
  {
    id: 'school-prototipo',
    title: 'Versão 0.1',
    territory: 'Escola',
    duration: '20 min',
    xp: 35,
    powers: ['construir', 'organizar'],
    text: 'Transforme uma ideia da turma em uma primeira versão que possa ser testada.',
  },
];

export default function MunicipalityDashboard({
  municipality,
  signals,
  opportunities = [],
  onModeChange,
}) {
  const [selectedMission, setSelectedMission] = useState(SCHOOL_MISSIONS[0].id);
  const [selectedSchool, setSelectedSchool] = useState(municipality.schools[0]?.id);
  const [launched, setLaunched] = useState([]);

  const mission = useMemo(
    () => SCHOOL_MISSIONS.find((item) => item.id === selectedMission) || SCHOOL_MISSIONS[0],
    [selectedMission],
  );

  function launchMission() {
    const key = `${selectedSchool}-${mission.id}`;
    if (!launched.includes(key)) setLaunched((current) => [...current, key]);
  }

  return (
    <main className="portalPage municipalityPortal portalGameSkin">
      <div className="portalShell">
        <RoleSwitcher mode="municipality" onChange={onModeChange} />

        <header className="portalHeader municipalityHeader portalHeaderGame">
          <div>
            <div className="gameBadge">Central Órbita Escola</div>
            <h1>Transformar sinais em experiências reais.</h1>
            <p>
              A escola acompanha participação e recorrências agregadas, identifica lacunas
              e lança missões para turmas sem criar ranking individual de alunos.
            </p>
          </div>
          <div className="municipalityName municipalityGameName">
            <small>Rede demonstrativa</small>
            <strong>{municipality.name}</strong>
            <span>{municipality.schools.length} escolas · {signals.totalStudents} alunos</span>
          </div>
        </header>

        <section className="portalGrid portalGridThree">
          <article className="portalMetric portalGameCard">
            <span>Alunos no mapa</span>
            <strong>{signals.totalStudents}</strong>
            <small>6º ao 9º ano · base sintética</small>
          </article>
          <article className="portalMetric portalGameCard">
            <span>Participação ativa</span>
            <strong>{signals.activeStudents}</strong>
            <small>{Math.round((signals.activeStudents / signals.totalStudents) * 100)}% da base</small>
          </article>
          <article className="portalMetric portalGameCard">
            <span>3+ experiências</span>
            <strong>{signals.studentsWithThreeOrMoreExperiences}</strong>
            <small>jovens que já experimentaram três ou mais áreas</small>
          </article>
        </section>

        <section className="portalGrid">
          <article className="portalPanel portalGameCard">
            <span className="portalEyebrow">Criar missão</span>
            <h2>Lançar uma Quest para uma escola</h2>

            <div className="schoolMissionControls">
              <label>
                <span>Escola</span>
                <select value={selectedSchool} onChange={(event) => setSelectedSchool(event.target.value)}>
                  {municipality.schools.map((school) => (
                    <option value={school.id} key={school.id}>{school.name}</option>
                  ))}
                </select>
              </label>

              <div className="schoolMissionPicker">
                {SCHOOL_MISSIONS.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={selectedMission === item.id ? 'active' : ''}
                    onClick={() => setSelectedMission(item.id)}
                  >
                    <span>{item.territory}</span>
                    <strong>{item.title}</strong>
                    <small>{item.duration} · +{item.xp} XP</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="schoolMissionPreview">
              <span>MISSÃO DA ESCOLA</span>
              <h3>{mission.title}</h3>
              <p>{mission.text}</p>
              <div className="schoolMissionPowers">
                {mission.powers.map((key) => (
                  <span key={key}><img src={assets.badges[key]} alt="" />{key}</span>
                ))}
              </div>
              <button type="button" className="portalPrimaryAction" onClick={launchMission}>
                {launched.includes(`${selectedSchool}-${mission.id}`) ? 'Missão lançada ✓' : 'Lançar missão'}
              </button>
            </div>
          </article>

          <article className="portalPanel portalGameCard">
            <span className="portalEyebrow">Missão para a escola</span>
            <h2>A própria escola também recebe desafios</h2>
            <div className="institutionMission">
              <span>RECOMENDAÇÃO ÓRBITA</span>
              <strong>Mais experiências maker</strong>
              <p>
                Interesse em tecnologia está alto, mas o acesso prático ainda é baixo.
                Crie uma experiência de prototipagem nas próximas quatro semanas.
              </p>
              <button type="button">Transformar em plano</button>
            </div>
          </article>
        </section>

        <section className="portalPanel portalGameCard">
          <span className="portalEyebrow">Interesse × acesso</span>
          <h2>Onde existe demanda ainda não atendida</h2>
          <div className="accessGapTable">
            {signals.interestVsAccess.map((row) => {
              const gap = row.interested - row.withAccess;
              const accessPercent = Math.round((row.withAccess / row.interested) * 100);
              return (
                <div className="accessGapRow" key={row.area}>
                  <strong>{row.area}</strong>
                  <div className="accessGapBar"><i style={{ width: `${accessPercent}%` }} /></div>
                  <span>{row.withAccess}/{row.interested} com acesso</span>
                  <b>{gap} sem acesso</b>
                </div>
              );
            })}
          </div>
        </section>

        <section className="portalGrid">
          <article className="portalPanel portalGameCard">
            <span className="portalEyebrow">Rede participante</span>
            <h2>Escolas e territórios</h2>
            <div className="schoolList">
              {municipality.schools.map((school) => (
                <div key={school.id}>
                  <span>{school.territory}</span>
                  <strong>{school.name}</strong>
                  <small>{school.students} alunos</small>
                </div>
              ))}
            </div>
          </article>

          <article className="portalPanel portalGameCard">
            <span className="portalEyebrow">Programas e experiências</span>
            <h2>Oportunidades em circulação</h2>
            <div className="municipalOpportunityList">
              {opportunities.map((opportunity) => (
                <div key={opportunity.id}>
                  <span>{opportunity.category}</span>
                  <strong>{opportunity.title}</strong>
                  <small>{opportunity.territory} · capacidade {opportunity.capacity}</small>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="municipalityAction municipalityActionGame">
          <div>
            <span>Leitura do território</span>
            <h2>187 jovens demonstram interesse em audiovisual; 144 ainda não tiveram acesso.</h2>
            <p>
              O sinal orienta oferta e território. Ele não define mérito individual nem substitui avaliação humana.
            </p>
          </div>
          <button type="button">Criar experiência</button>
        </section>
      </div>
    </main>
  );
}

import RoleSwitcher from '../app/RoleSwitcher';

export default function MunicipalityDashboard({
  municipality,
  signals,
  opportunities = [],
  onModeChange,
}) {
  return (
    <main className="portalPage municipalityPortal">
      <div className="portalShell">
        <RoleSwitcher mode="municipality" onChange={onModeChange} />

        <header className="portalHeader municipalityHeader">
          <div>
            <div className="gameBadge">Órbita · Inteligência Pública</div>
            <h1>Onde existe interesse, onde falta acesso e onde agir.</h1>
            <p>
              Dados sintéticos da demo. A visão municipal trabalha com grupos e territórios,
              não com um ranking individual de crianças.
            </p>
          </div>
          <div className="municipalityName">
            <small>Município demonstrativo</small>
            <strong>{municipality.name}</strong>
            <span>{municipality.schools.length} escolas · {signals.totalStudents} alunos</span>
          </div>
        </header>

        <section className="portalGrid portalGridThree">
          <article className="portalMetric">
            <span>Alunos no mapa</span>
            <strong>{signals.totalStudents}</strong>
            <small>6º ao 9º ano · base sintética</small>
          </article>
          <article className="portalMetric">
            <span>Participação ativa</span>
            <strong>{signals.activeStudents}</strong>
            <small>{Math.round((signals.activeStudents / signals.totalStudents) * 100)}% da base</small>
          </article>
          <article className="portalMetric">
            <span>3+ experiências</span>
            <strong>{signals.studentsWithThreeOrMoreExperiences}</strong>
            <small>jovens que já experimentaram três ou mais áreas</small>
          </article>
        </section>

        <section className="portalPanel">
          <span className="portalEyebrow">Interesse × acesso</span>
          <h2>Onde a cidade tem demanda ainda não atendida</h2>
          <div className="accessGapTable">
            {signals.interestVsAccess.map((row) => {
              const gap = row.interested - row.withAccess;
              const accessPercent = Math.round((row.withAccess / row.interested) * 100);
              return (
                <div className="accessGapRow" key={row.area}>
                  <strong>{row.area}</strong>
                  <div className="accessGapBar">
                    <i style={{ width: `${accessPercent}%` }} />
                  </div>
                  <span>{row.withAccess}/{row.interested} com acesso</span>
                  <b>{gap} sem acesso</b>
                </div>
              );
            })}
          </div>
        </section>

        <section className="portalGrid">
          <article className="portalPanel">
            <span className="portalEyebrow">Território escolar</span>
            <h2>Rede participante</h2>
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

          <article className="portalPanel">
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

        <section className="municipalityAction">
          <div>
            <span>Exemplo de leitura</span>
            <h2>187 jovens demonstram interesse em audiovisual; 144 ainda não tiveram acesso.</h2>
            <p>
              O dado pode orientar oferta de oficinas, capacidade e território. Ele não define
              mérito individual nem substitui avaliação humana para políticas públicas.
            </p>
          </div>
          <button type="button">Simular nova oportunidade</button>
        </section>
      </div>
    </main>
  );
}

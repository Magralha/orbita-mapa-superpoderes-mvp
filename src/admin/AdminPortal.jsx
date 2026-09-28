import React, { useMemo, useState } from 'react';
import { dailyMissions } from '../game/data/dailyMissions';
import {
  FAMILY_MISSION_TEMPLATES,
  SCHOOL_MISSION_TEMPLATES,
  assignmentStatusLabel,
} from '../game/engine/assignmentEngine';
import { seasonOne, weeklyQuests } from '../game/data/seasonData';
import {
  pilotAccounts,
  pilotClasses,
  pilotGuardians,
  pilotSchools,
  pilotStudents,
  pilotStaff,
} from '../pilot/pilotData';
import { OrbitaWordmark } from '../game/ui/MobileUI';
import { analyticsSummary } from '../core/analytics/localAnalytics';

const tabs = [
  ['overview', 'Visão geral'],
  ['people', 'Pessoas'],
  ['content', 'Conteúdo'],
  ['missions', 'Missões'],
  ['pilot', 'Piloto'],
];

export default function AdminPortal({ assignments = [] }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notice, setNotice] = useState('');
  const analytics = analyticsSummary();

  const metrics = useMemo(() => {
    const completed = assignments.filter((item) => item.status === 'completed').length;
    const pending = assignments.filter((item) => item.status === 'assigned').length;
    const acknowledged = assignments.filter((item) => Boolean(item.acknowledgedAt)).length;

    return {
      students: pilotStudents.length,
      guardians: pilotGuardians.length,
      staff: pilotStaff.length,
      schools: pilotSchools.length,
      classes: pilotClasses.length,
      pending,
      completed,
      acknowledged,
      content:
        dailyMissions.length +
        FAMILY_MISSION_TEMPLATES.length +
        SCHOOL_MISSION_TEMPLATES.length +
        weeklyQuests.length,
    };
  }, [assignments]);

  function demoAction(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 1800);
  }

  return (
    <main className="adminPage">
      <section className="adminShell">
        <header className="adminTop">
          <OrbitaWordmark />
          <div>
            <span>BACKOFFICE · PILOTO</span>
            <strong>Admin Órbita</strong>
          </div>
        </header>

        <nav className="adminTabs">
          {tabs.map(([id, label]) => (
            <button
              type="button"
              key={id}
              className={activeTab === id ? 'active' : ''}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        {notice && <div className="adminNotice">{notice}</div>}

        {activeTab === 'overview' && (
          <>
            <section className="adminHero">
              <div>
                <span>OPERAÇÃO DO PILOTO</span>
                <h1>Uma visão para administrar o ecossistema.</h1>
                <p>
                  Cadastro, conteúdo, missões e acompanhamento operacional sem entrar no
                  espaço privado do aluno além do necessário.
                </p>
              </div>
              <div className="adminHeroStatus">
                <span>STATUS</span>
                <strong>Demo estruturada</strong>
                <small>Backend real ainda não conectado</small>
              </div>
            </section>

            <section className="adminMetricGrid">
              <article><span>Escolas</span><strong>{metrics.schools}</strong><small>{metrics.classes} turma(s)</small></article>
              <article><span>Alunos</span><strong>{metrics.students}</strong><small>{metrics.guardians} responsável(is)</small></article>
              <article><span>Educadores</span><strong>{metrics.staff}</strong><small>vinculados às turmas</small></article>
              <article><span>Conteúdos</span><strong>{metrics.content}</strong><small>missões + quests</small></article>
              <article><span>Pendentes</span><strong>{metrics.pending}</strong><small>missões em andamento</small></article>
              <article><span>Concluídas</span><strong>{metrics.completed}</strong><small>{metrics.acknowledged} acompanhada(s)</small></article>
              <article><span>Eventos demo</span><strong>{analytics.total}</strong><small>analytics locais</small></article>
            </section>

            <section className="adminGrid">
              <article className="adminPanel">
                <span>Próximas ações operacionais</span>
                <h2>Checklist do piloto</h2>
                <div className="adminChecklist">
                  {[
                    ['Cadastro e vínculos', true],
                    ['Conteúdo mínimo de 4 semanas', true],
                    ['Fluxo família → aluno → retorno', true],
                    ['Fluxo escola → aluno → retorno', true],
                    ['Banco compartilhado', false],
                    ['Autenticação real', false],
                    ['Consentimento e LGPD', false],
                    ['QA em dispositivos reais', false],
                  ].map(([label, done]) => (
                    <div key={label} className={done ? 'done' : ''}>
                      <b>{done ? '✓' : '○'}</b>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="adminPanel">
                <span>Saúde do conteúdo</span>
                <h2>Biblioteca mínima</h2>
                <div className="adminContentHealth">
                  <div><strong>{dailyMissions.length}</strong><span>Missões diárias</span></div>
                  <div><strong>{FAMILY_MISSION_TEMPLATES.length}</strong><span>Família</span></div>
                  <div><strong>{SCHOOL_MISSION_TEMPLATES.length}</strong><span>Escola</span></div>
                  <div><strong>{weeklyQuests.length}</strong><span>Quests semanais</span></div>
                </div>
              </article>
            </section>

            <section className="adminPanel adminWidePanel adminAnalyticsPanel">
              <span>Analytics locais do protótipo</span>
              <h2>Últimos eventos desta sessão</h2>
              <div className="adminMissionTable">
                {analytics.recent.length ? analytics.recent.map((event) => (
                  <div key={event.id}>
                    <b>evento</b>
                    <strong>{event.name}</strong>
                    <span>{new Date(event.createdAt).toLocaleString('pt-BR')}</span>
                    <small>{Object.keys(event.properties || {}).length} propriedades</small>
                  </div>
                )) : <p>Nenhum evento registrado ainda.</p>}
              </div>
            </section>
          </>
        )}

        {activeTab === 'people' && (
          <section className="adminPanel adminWidePanel">
            <span>Pessoas e vínculos</span>
            <h2>Diretório do piloto</h2>
            <div className="adminDirectory">
              {pilotAccounts.filter((account) => account.role !== 'admin').map((account) => (
                <div key={account.id}>
                  <b>{account.label}</b>
                  <strong>{account.displayName}</strong>
                  <span>{account.subtitle}</span>
                  <button type="button" onClick={() => demoAction('Edição simulada nesta versão.')}>Editar</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'content' && (
          <section className="adminGrid">
            <article className="adminPanel">
              <span>Temporada ativa</span>
              <h2>{seasonOne.title}</h2>
              <p>{seasonOne.subtitle}</p>
              <div className="adminSeasonRows">
                {seasonOne.weeks.map((week) => (
                  <div key={week.id}>
                    <b>Semana {week.number}</b>
                    <strong>{week.title}</strong>
                    <small>+{week.xp} XP</small>
                  </div>
                ))}
              </div>
            </article>
            <article className="adminPanel">
              <span>Catálogo</span>
              <h2>Conteúdo publicado</h2>
              <div className="adminContentHealth stacked">
                <div><strong>{dailyMissions.length}</strong><span>diárias · Escola/Casa/Mundo</span></div>
                <div><strong>{SCHOOL_MISSION_TEMPLATES.length}</strong><span>templates Escola</span></div>
                <div><strong>{FAMILY_MISSION_TEMPLATES.length}</strong><span>templates Família</span></div>
                <div><strong>{weeklyQuests.length}</strong><span>quests de temporada</span></div>
              </div>
              <button className="adminPrimary" type="button" onClick={() => demoAction('Editor de conteúdo entra após o backend.')}>
                Novo conteúdo
              </button>
            </article>
          </section>
        )}

        {activeTab === 'missions' && (
          <section className="adminPanel adminWidePanel">
            <span>Operação de missões</span>
            <h2>Status recente</h2>
            <div className="adminMissionTable">
              {assignments.length ? [...assignments].reverse().map((item) => (
                <div key={item.assignmentId}>
                  <b>{item.sourceLabel}</b>
                  <strong>{item.title}</strong>
                  <span>{item.targetLabel}</span>
                  <small>{assignmentStatusLabel(item)}</small>
                </div>
              )) : <p>Nenhuma missão registrada.</p>}
            </div>
          </section>
        )}

        {activeTab === 'pilot' && (
          <section className="adminGrid">
            <article className="adminPanel">
              <span>Escola piloto</span>
              <h2>{pilotSchools[0]?.name}</h2>
              <div className="adminPilotFacts">
                <div><b>Turma</b><span>{pilotClasses[0]?.label}</span></div>
                <div><b>Ano</b><span>{pilotClasses[0]?.grade}º</span></div>
                <div><b>Alunos demo</b><span>{pilotStudents.length}</span></div>
                <div><b>Educadores demo</b><span>{pilotStaff.length}</span></div>
              </div>
            </article>
            <article className="adminPanel">
              <span>Infraestrutura</span>
              <h2>Próximo salto técnico</h2>
              <p>
                O schema PostgreSQL já está no repositório. Falta provisionar o ambiente,
                autenticação e políticas reais de acesso.
              </p>
              <button className="adminPrimary" type="button" onClick={() => demoAction('Aguardando backend/credenciais do piloto.')}>
                Ver pendência
              </button>
            </article>
          </section>
        )}
      </section>
    </main>
  );
}

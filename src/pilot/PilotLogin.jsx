import React from 'react';
import { pilotAccounts } from './pilotData';
import { OrbitaWordmark } from '../game/ui/MobileUI';

const roleMeta = {
  student: { eyebrow: 'JOGAR', icon: '✦' },
  family: { eyebrow: 'ACOMPANHAR', icon: '⌂' },
  school: { eyebrow: 'ORGANIZAR', icon: '◆' },
};

export default function PilotLogin({ onSelect }) {
  return (
    <main className="pilotLoginPage">
      <section className="pilotLoginShell">
        <header className="pilotLoginTop">
          <OrbitaWordmark />
          <span>MODO PILOTO</span>
        </header>

        <section className="pilotLoginHero">
          <span>ENTRAR NO ÓRBITA</span>
          <h1>Uma jornada. Três pontos de vista.</h1>
          <p>
            Escolha um perfil demonstrativo para testar o vínculo entre aluno, família e escola.
          </p>
        </section>

        <section className="pilotAccountGrid">
          {pilotAccounts.map((account) => {
            const meta = roleMeta[account.role];
            return (
              <button
                type="button"
                key={account.id}
                className={`pilotAccountCard pilotAccount-${account.role}`}
                onClick={() => onSelect(account.id)}
              >
                <div className="pilotAccountIcon">{meta.icon}</div>
                <span>{meta.eyebrow}</span>
                <strong>{account.label}</strong>
                <b>{account.displayName}</b>
                <small>{account.subtitle}</small>
                <i>Entrar ›</i>
              </button>
            );
          })}
        </section>

        <footer className="pilotLoginFoot">
          Dados demonstrativos · sem login real nesta etapa
        </footer>
      </section>
    </main>
  );
}

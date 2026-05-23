import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Sparkles, RotateCcw, Compass, AlertTriangle, Timer, Layers } from 'lucide-react';
import { experiences } from './data/experiences';
import { analyzeAnswers } from './logic/scoring';
import { powerKeys } from './data/powers';
import './styles.css';

function StartScreen({ onStart }) {
  return (
    <main className="page">
      <section className="hero brutalHero">
        <div className="badge">Órbita Municipal · MVP 0.3</div>
        <h1>Descubra seus superpoderes para mudar o mundo</h1>
        <p>
          Uma jornada visual com games, metáforas, mochila mágica, fases difíceis,
          escolhas rápidas e missões. Você não responde prova. Você joga escolhas.
        </p>
        <div className="notice">
          O sistema observa padrões de escolha, ordem, energia e tempo de resposta.
          Isso não mede QI, QE, diagnóstico psicológico ou profissão. É uma leitura
          pedagógica provisória dos seus jeitos de aprender e agir.
        </div>
        <button className="primary" onClick={onStart}>
          <Sparkles size={18} />
          Entrar na jornada
        </button>
      </section>
    </main>
  );
}

function ChoiceCard({ option, selected, order, onClick }) {
  return (
    <button className={`option gameCard ${selected ? 'selected' : ''}`} onClick={onClick}>
      {order ? <span className="orderBadge">{order}</span> : null}
      <span className="emoji">{option.emoji}</span>
      <strong>{option.label}</strong>
      {option.desc ? <span>{option.desc}</span> : null}
    </button>
  );
}

function VisualChoice({ experience, onComplete }) {
  const [startedAt] = useState(Date.now());

  function choose(option) {
    onComplete({
      type: experience.type,
      experienceId: experience.id,
      item: option,
      responseMs: Date.now() - startedAt,
    });
  }

  return (
    <div className="options">
      {experience.options.map((option) => (
        <ChoiceCard key={option.label} option={option} onClick={() => choose(option)} />
      ))}
    </div>
  );
}

function PickThree({ experience, onComplete }) {
  const [startedAt] = useState(Date.now());
  const [selected, setSelected] = useState([]);

  const max = experience.max || 3;

  function toggle(option) {
    const exists = selected.some((item) => item.label === option.label);

    if (exists) {
      setSelected((prev) => prev.filter((item) => item.label !== option.label));
      return;
    }

    if (selected.length < max) {
      setSelected((prev) => [...prev, option]);
    }
  }

  function finish() {
    onComplete({
      type: experience.type,
      experienceId: experience.id,
      items: selected,
      responseMs: Date.now() - startedAt,
    });
  }

  return (
    <>
      <div className="selectionCounter">
        Escolhidos: {selected.length}/{max}
      </div>

      <div className="options">
        {experience.options.map((option) => {
          const index = selected.findIndex((item) => item.label === option.label);
          return (
            <ChoiceCard
              key={option.label}
              option={option}
              selected={index >= 0}
              order={index >= 0 ? index + 1 : null}
              onClick={() => toggle(option)}
            />
          );
        })}
      </div>

      <button className="primary stickyAction" disabled={selected.length !== max} onClick={finish}>
        Confirmar mochila
      </button>
    </>
  );
}

function OrderCards({ experience, onComplete }) {
  const [startedAt] = useState(Date.now());
  const [ordered, setOrdered] = useState([]);

  function pick(card) {
    const exists = ordered.some((item) => item.label === card.label);
    if (exists) {
      setOrdered((prev) => prev.filter((item) => item.label !== card.label));
      return;
    }
    setOrdered((prev) => [...prev, card]);
  }

  function finish() {
    onComplete({
      type: experience.type,
      experienceId: experience.id,
      items: ordered,
      responseMs: Date.now() - startedAt,
    });
  }

  return (
    <>
      <div className="selectionCounter">
        Ordem escolhida: {ordered.length}/{experience.cards.length}
      </div>

      <div className="options">
        {experience.cards.map((card) => {
          const index = ordered.findIndex((item) => item.label === card.label);
          return (
            <ChoiceCard
              key={card.label}
              option={card}
              selected={index >= 0}
              order={index >= 0 ? index + 1 : null}
              onClick={() => pick(card)}
            />
          );
        })}
      </div>

      <button
        className="primary stickyAction"
        disabled={ordered.length < 3}
        onClick={finish}
      >
        Fechar minha ordem
      </button>
    </>
  );
}

function EnergyMeter({ experience, onComplete }) {
  const [startedAt] = useState(Date.now());
  const [values, setValues] = useState({});

  const labels = {
    '-1': 'me trava',
    0: 'tanto faz',
    1: 'me chama',
    2: 'me acende',
  };

  function setValue(prompt, value) {
    setValues((prev) => ({
      ...prev,
      [prompt.label]: { ...prompt, energyValue: value },
    }));
  }

  function finish() {
    const items = Object.values(values).filter((item) => item.energyValue > 0);
    onComplete({
      type: experience.type,
      experienceId: experience.id,
      items,
      responseMs: Date.now() - startedAt,
    });
  }

  return (
    <>
      <div className="meterList">
        {experience.prompts.map((prompt) => (
          <div className="meterRow" key={prompt.label}>
            <strong>{prompt.label}</strong>
            <div className="meterButtons">
              {[-1, 0, 1, 2].map((value) => (
                <button
                  key={value}
                  className={values[prompt.label]?.energyValue === value ? 'activeMeter' : ''}
                  onClick={() => setValue(prompt, value)}
                >
                  {labels[value]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="primary stickyAction"
        disabled={Object.keys(values).length < experience.prompts.length}
        onClick={finish}
      >
        Ver o que isso revela
      </button>
    </>
  );
}

function ExperienceScreen({ experience, step, total, onComplete }) {
  const ExperienceIcon = experience.icon;
  const progress = ((step + 1) / total) * 100;

  return (
    <main className="page">
      <section className="quiz">
        <div className="topbar">
          <div className="badge">
            {experience.eyebrow} · Etapa {step + 1} de {total}
          </div>
          <div className="progress">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="questionHead">
          <div className="bigIcon">
            <ExperienceIcon size={36} />
          </div>
          <div>
            <h1>{experience.title}</h1>
            <p>{experience.subtitle}</p>
          </div>
        </div>

        {experience.type === 'visual-choice' || experience.type === 'quick-choice' ? (
          <VisualChoice experience={experience} onComplete={onComplete} />
        ) : null}

        {experience.type === 'pick-three' ? (
          <PickThree experience={experience} onComplete={onComplete} />
        ) : null}

        {experience.type === 'order-cards' ? (
          <OrderCards experience={experience} onComplete={onComplete} />
        ) : null}

        {experience.type === 'energy-meter' ? (
          <EnergyMeter experience={experience} onComplete={onComplete} />
        ) : null}
      </section>
    </main>
  );
}

function BrutalBars({ scores }) {
  const max = Math.max(...Object.values(scores), 1);

  return (
    <div className="barChart">
      {powerKeys.map((key) => {
        const value = scores[key] || 0;
        const width = `${Math.max(6, (value / max) * 100)}%`;

        return (
          <div className="barRow" key={key}>
            <span>{key}</span>
            <div className="barTrack">
              <div className="barFill" style={{ width }} />
            </div>
            <b>{Math.round(value)}</b>
          </div>
        );
      })}
    </div>
  );
}

function ResultDashboard({ entries, onReset }) {
  const analysis = useMemo(() => analyzeAnswers(entries), [entries]);
  const {
    topPowers,
    mainPower,
    mainMode,
    mainEnergy,
    missions,
    tools,
    avgResponseMs,
    rankedWorlds,
    powerScores,
  } = analysis;

  const MainIcon = mainPower.icon;
  const avgSeconds = avgResponseMs ? (avgResponseMs / 1000).toFixed(1) : null;
  const identityName = `${mainMode.label} ${mainPower.label}`;

  function printResult() {
    window.print();
  }

  return (
    <main className="page">
      <section className="result dashboard">
        <div className="badge">Dashboard v0.4</div>

        <div className="dashboardHeroCard">
          <div className="heroCardContent">
            <span className="heroCardLabel">Meu Mapa de Superpoderes</span>
            <h1 className="heroCardTitle">
              {topPowers.map((power) => power.label).join(' + ')}
            </h1>
            <p className="heroCardSubtitle">
              Seu mapa mostra uma mistura de {mainPower.label.toLowerCase()},
              energia de {mainEnergy.label.toLowerCase()} e modo de decisão
              {` ${mainMode.label.toLowerCase()}`}.
            </p>
          </div>
        </div>

        <div className="identityStrip">
          <article className="identityCard">
            <small>Avatar simbólico</small>
            <strong>{identityName}</strong>
          </article>

          <article className="identityCard">
            <small>Energia dominante</small>
            <strong>{mainEnergy.label}</strong>
          </article>

          <article className="identityCard">
            <small>Modo de decisão</small>
            <strong>{mainMode.label}</strong>
          </article>
        </div>

        <div className="dashboardGrid">
          <article className="panel widePanel">
            <div className="panelTitle">
              <Layers size={22} />
              <h2>Radar brutalista de superpoderes</h2>
            </div>
            <BrutalBars scores={powerScores} />
          </article>

          <article className="panel">
            <div className="panelTitle">
              <Compass size={22} />
              <h2>Como você entra nos desafios</h2>
            </div>
            <h3>{mainMode.label}</h3>
            <p>{mainMode.text}</p>
          </article>

          <article className="panel">
            <div className="panelTitle">
              <Sparkles size={22} />
              <h2>O que te acende</h2>
            </div>
            <h3>{mainEnergy.label}</h3>
            <p>{mainEnergy.text}</p>
          </article>

          <article className="panel warningPanel">
            <div className="panelTitle">
              <AlertTriangle size={22} />
              <h2>Trava possível</h2>
            </div>
            <p>{mainPower.shadow}</p>
          </article>

          <article className="panel">
            <div className="panelTitle">
              <Timer size={22} />
              <h2>Ritmo médio</h2>
            </div>
            <h3>{avgSeconds ? `${avgSeconds}s` : 'sem dado'}</h3>
            <p>
              Esse tempo é só uma pista de interação. Não mede inteligência,
              emoção ou capacidade.
            </p>
          </article>
        </div>

        <div className="powerGrid">
          {topPowers.map((power, index) => {
            const PowerIcon = power.icon;
            return (
              <article className="powerCard" key={power.key}>
                <span className="rank">#{index + 1}</span>
                <PowerIcon size={30} />
                <h3>{power.label}</h3>
                <p>{power.text}</p>
              </article>
            );
          })}
        </div>

        {rankedWorlds.length ? (
          <div className="panel">
            <h2>Mundos que mais chamaram você</h2>
            <div className="chips">
              {rankedWorlds.slice(0, 4).map((world) => (
                <span key={world.key}>{world.label}</span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="panel">
          <h2>Missões que combinam com você</h2>
          <div className="chips">
            {missions.map((mission) => (
              <span key={mission}>{mission}</span>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2>Mochila de ferramentas</h2>
          <div className="chips muted">
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>

        <article className="storyCard">
          <span className="storyBadge">Card para print</span>
          <h2>Eu sou {identityName}</h2>
          <p>
            Meu mapa mostra que eu posso explorar futuros possíveis usando
            meus superpoderes de:
          </p>
          <div className="storyPowers">
            {topPowers.map((power) => (
              <span key={power.key}>{power.label}</span>
            ))}
          </div>
          <h3>Minha próxima missão</h3>
          <p>{missions[0]}</p>
          <div className="printHint">
            Dica: use o botão de imprimir/salvar para guardar este resultado.
          </div>
        </article>

        <div className="notice">
          Esse mapa não escolhe sua profissão. Ele mostra pistas do que te acende
          agora e quais tipos de missão podem te ajudar a explorar futuros possíveis.
        </div>

        <button className="primary" onClick={printResult}>
          Salvar / imprimir resultado
        </button>

        <button className="secondary" onClick={onReset}>
          <RotateCcw size={18} />
          Jogar de novo
        </button>
      </section>
    </main>
  );
}

function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [entries, setEntries] = useState([]);

  const finished = step >= experiences.length;

  function complete(entry) {
    setEntries((prev) => [...prev, entry]);
    setStep((prev) => prev + 1);
  }

  function reset() {
    setStarted(false);
    setStep(0);
    setEntries([]);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, started]);

  if (!started) return <StartScreen onStart={() => setStarted(true)} />;

  if (finished) return <ResultDashboard entries={entries} onReset={reset} />;

  return (
    <ExperienceScreen
      experience={experiences[step]}
      step={step}
      total={experiences.length}
      onComplete={complete}
    />
  );
}

createRoot(document.getElementById('root')).render(<App />);

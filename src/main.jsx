import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  PawPrint,
  Gamepad2,
  Film,
  Backpack,
  Sparkles,
  RotateCcw,
  Search,
  Wand2,
  Heart,
  Hammer,
  MessageCircle,
  Map,
  Shield,
  Users,
} from 'lucide-react';
import './styles.css';

const powers = {
  investigar: {
    label: 'Investigar',
    icon: Search,
    text: 'Você gosta de descobrir pistas, entender o que está acontecendo e fazer perguntas melhores.',
    missions: ['Mapear um problema da escola', 'Entrevistar pessoas do bairro', 'Comparar informações antes de decidir'],
    tools: ['pesquisa', 'entrevista', 'dados simples', 'IA para organizar perguntas'],
  },
  criar: {
    label: 'Criar',
    icon: Wand2,
    text: 'Você ganha energia quando pode imaginar, misturar ideias e transformar algo comum em algo com a sua cara.',
    missions: ['Criar uma campanha visual', 'Inventar uma solução diferente', 'Montar um protótipo ou história'],
    tools: ['desenho', 'vídeo', 'storytelling', 'design', 'IA generativa'],
  },
  cuidar: {
    label: 'Cuidar',
    icon: Heart,
    text: 'Você percebe pessoas, clima do grupo e situações em que alguém precisa ser ouvido ou incluído.',
    missions: ['Aproximar pessoas da turma', 'Criar uma ação de acolhimento', 'Escutar histórias da comunidade'],
    tools: ['escuta', 'roda de conversa', 'mediação', 'observação'],
  },
  construir: {
    label: 'Construir',
    icon: Hammer,
    text: 'Você prefere colocar a mão na massa, testar ideias e ver algo funcionando no mundo real.',
    missions: ['Montar um protótipo simples', 'Testar uma melhoria na escola', 'Transformar ideia em plano prático'],
    tools: ['prototipagem', 'materiais simples', 'robótica', 'maquetes'],
  },
  comunicar: {
    label: 'Comunicar',
    icon: MessageCircle,
    text: 'Você tende a explicar, contar, apresentar ou traduzir ideias para outras pessoas entenderem.',
    missions: ['Produzir um vídeo curto', 'Apresentar uma ideia para a turma', 'Criar uma história sobre o futuro da cidade'],
    tools: ['fala', 'texto', 'vídeo', 'podcast', 'apresentação'],
  },
  organizar: {
    label: 'Organizar',
    icon: Map,
    text: 'Você ajuda a transformar bagunça em caminho, separando etapas, prioridades e combinados.',
    missions: ['Montar um plano de ação', 'Dividir tarefas do grupo', 'Criar uma trilha de passos'],
    tools: ['checklist', 'cronograma', 'mapa mental', 'quadros de tarefas'],
  },
  proteger: {
    label: 'Proteger',
    icon: Shield,
    text: 'Você repara em riscos, injustiças, segurança, regras e no impacto que uma decisão pode ter.',
    missions: ['Criar combinados de uso de IA', 'Pensar em segurança digital', 'Defender uma solução justa'],
    tools: ['ética', 'privacidade', 'checagem', 'direitos', 'sustentabilidade'],
  },
  conectar: {
    label: 'Conectar',
    icon: Users,
    text: 'Você liga pessoas, ideias e grupos. Muitas vezes seu valor aparece quando ninguém está se entendendo.',
    missions: ['Juntar pessoas para uma causa', 'Criar ponte entre alunos e professores', 'Organizar um grupo por afinidade'],
    tools: ['rede', 'convite', 'facilitação', 'parcerias'],
  },
};

const questions = [
  {
    id: 'dog',
    icon: PawPrint,
    title: 'Se você fosse um cachorro em uma aventura, qual seria?',
    subtitle: 'Escolha pelo instinto. Não existe resposta certa.',
    options: [
      { label: 'Border collie', desc: 'Entende rápido a missão e organiza o grupo.', weights: { organizar: 3, investigar: 1, conectar: 1 } },
      { label: 'Golden retriever', desc: 'Aproxima todo mundo e deixa o clima melhor.', weights: { cuidar: 3, conectar: 2, comunicar: 1 } },
      { label: 'Vira-lata esperto', desc: 'Se adapta, improvisa e encontra saídas.', weights: { construir: 2, criar: 2, investigar: 1 } },
      { label: 'Pastor alemão', desc: 'Protege o grupo e percebe riscos antes.', weights: { proteger: 3, cuidar: 1, organizar: 1 } },
      { label: 'Husky', desc: 'Ama explorar caminhos novos e não gosta de ficar parado.', weights: { investigar: 2, criar: 1, construir: 1 } },
      { label: 'Dachshund curioso', desc: 'Entra em qualquer canto para descobrir pistas.', weights: { investigar: 3, construir: 1 } },
      { label: 'Shiba inu', desc: 'Independente, autêntico e faz do próprio jeito.', weights: { criar: 2, investigar: 1, proteger: 1 } },
      { label: 'Labrador', desc: 'Aprende brincando e gosta de fazer junto.', weights: { conectar: 2, cuidar: 2, comunicar: 1 } },
    ],
  },
  {
    id: 'game',
    icon: Gamepad2,
    title: 'Em um jogo novo, qual classe você escolheria?',
    subtitle: 'Pense no papel que daria mais vontade de jogar.',
    options: [
      { label: 'Explorador do mapa', desc: 'Descobre caminhos, atalhos e lugares escondidos.', weights: { investigar: 3, criar: 1 } },
      { label: 'Curandeiro do time', desc: 'Cuida do grupo e ajuda quem está ficando para trás.', weights: { cuidar: 3, conectar: 1 } },
      { label: 'Estrategista', desc: 'Monta o plano antes da missão começar.', weights: { organizar: 3, investigar: 1 } },
      { label: 'Inventor de ferramentas', desc: 'Cria recursos para resolver problemas.', weights: { construir: 3, criar: 2 } },
      { label: 'Guardião da base', desc: 'Protege o time e pensa nos riscos.', weights: { proteger: 3, organizar: 1 } },
      { label: 'Comunicador da equipe', desc: 'Alinha as pessoas para ninguém se perder.', weights: { comunicar: 3, conectar: 2 } },
      { label: 'Hacker do bem', desc: 'Descobre sistemas, padrões e possibilidades.', weights: { investigar: 2, proteger: 2, construir: 1 } },
      { label: 'Criador de mundos', desc: 'Personaliza tudo e inventa novas formas de jogar.', weights: { criar: 3, comunicar: 1 } },
    ],
  },
  {
    id: 'movie',
    icon: Film,
    title: 'Se sua turma virasse um filme, você seria mais...',
    subtitle: 'Escolha o personagem que parece mais com seu jeito.',
    options: [
      { label: 'Quem percebe o mistério antes dos outros', desc: 'Observa detalhes e liga os pontos.', weights: { investigar: 3, proteger: 1 } },
      { label: 'Quem une o grupo quando dá briga', desc: 'Ajuda as pessoas a se entenderem.', weights: { conectar: 3, cuidar: 2 } },
      { label: 'Quem tem uma ideia inesperada', desc: 'Vira o jogo com criatividade.', weights: { criar: 3, construir: 1 } },
      { label: 'Quem monta o plano', desc: 'Organiza o caminho para a missão acontecer.', weights: { organizar: 3, comunicar: 1 } },
      { label: 'Quem enfrenta a injustiça', desc: 'Não gosta de ver alguém sendo prejudicado.', weights: { proteger: 3, cuidar: 1 } },
      { label: 'Quem conta a história para todo mundo entender', desc: 'Transforma acontecimento em mensagem.', weights: { comunicar: 3, criar: 1 } },
    ],
  },
  {
    id: 'item',
    icon: Backpack,
    title: 'Escolha um item mágico para levar em uma missão.',
    subtitle: 'O item diz muito sobre como você entra nos desafios.',
    options: [
      { label: 'Lupa da verdade', desc: 'Para encontrar pistas escondidas.', weights: { investigar: 3 } },
      { label: 'Escudo do cuidado', desc: 'Para proteger pessoas e evitar injustiças.', weights: { proteger: 2, cuidar: 2 } },
      { label: 'Mapa dos caminhos', desc: 'Para criar rota quando tudo parece confuso.', weights: { organizar: 3, investigar: 1 } },
      { label: 'Microfone das ideias', desc: 'Para fazer uma mensagem chegar nas pessoas.', weights: { comunicar: 3, conectar: 1 } },
      { label: 'Mochila de ferramentas', desc: 'Para construir soluções práticas.', weights: { construir: 3 } },
      { label: 'Pincel de mundos', desc: 'Para inventar uma versão nova das coisas.', weights: { criar: 3 } },
    ],
  },
];

function scoreAnswers(answers) {
  const scores = Object.keys(powers).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  answers.forEach((answer) => {
    Object.entries(answer.weights).forEach(([key, value]) => {
      scores[key] += value;
    });
  });
  return scores;
}

function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const finished = step >= questions.length;

  const ranked = useMemo(() => {
    const scores = scoreAnswers(answers);
    return Object.entries(scores)
      .map(([key, score]) => ({ key, score, ...powers[key] }))
      .sort((a, b) => b.score - a.score);
  }, [answers]);

  function choose(option) {
    setAnswers((prev) => [...prev, option]);
    setStep((prev) => prev + 1);
  }

  function reset() {
    setStarted(false);
    setStep(0);
    setAnswers([]);
  }

  if (!started) {
    return (
      <main className="page">
        <section className="hero">
          <div className="badge">Órbita Municipal · MVP</div>
          <h1>Descubra seus superpoderes para mudar o mundo</h1>
          <p>
            Uma jornada visual de escolhas criativas. Você responde sem prova, sem certo ou errado.
            Por trás, o sistema monta um mapa dos seus jeitos de aprender, criar, cuidar e resolver problemas.
          </p>
          <div className="notice">
            Não é teste vocacional, diagnóstico psicológico, medição de QI ou laudo. É uma foto provisória de interesses e potências.
          </div>
          <button className="primary" onClick={() => setStarted(true)}>
            <Sparkles size={18} />
            Começar jornada
          </button>
        </section>
      </main>
    );
  }

  if (finished) {
    const top = ranked.slice(0, 3);
    const main = top[0];
    const Icon = main.icon;

    return (
      <main className="page">
        <section className="result">
          <div className="badge">Seu Mapa de Superpoderes</div>
          <div className="resultHead">
            <div className="bigIcon"><Icon size={42} /></div>
            <div>
              <h1>Você acende mais em {top.map((p) => p.label).join(' + ')}</h1>
              <p>{main.text}</p>
            </div>
          </div>

          <div className="powerGrid">
            {top.map((power, index) => {
              const PowerIcon = power.icon;
              return (
                <article className="powerCard" key={power.key}>
                  <span className="rank">#{index + 1}</span>
                  <PowerIcon size={28} />
                  <h3>{power.label}</h3>
                  <p>{power.text}</p>
                </article>
              );
            })}
          </div>

          <div className="panel">
            <h2>Missões que combinam com você</h2>
            <div className="chips">
              {[...new Set(top.flatMap((p) => p.missions))].slice(0, 6).map((mission) => (
                <span key={mission}>{mission}</span>
              ))}
            </div>
          </div>

          <div className="panel">
            <h2>Ferramentas para testar</h2>
            <div className="chips muted">
              {[...new Set(top.flatMap((p) => p.tools))].slice(0, 8).map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>

          <div className="notice">
            Esse mapa não define quem você é para sempre. Ele mostra pistas do que está acendendo em você agora.
          </div>

          <button className="secondary" onClick={reset}>
            <RotateCcw size={18} />
            Refazer
          </button>
        </section>
      </main>
    );
  }

  const question = questions[step];
  const QuestionIcon = question.icon;

  return (
    <main className="page">
      <section className="quiz">
        <div className="topbar">
          <div className="badge">Missão {step + 1} de {questions.length}</div>
          <div className="progress"><span style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
        </div>

        <div className="questionHead">
          <div className="bigIcon"><QuestionIcon size={36} /></div>
          <div>
            <h1>{question.title}</h1>
            <p>{question.subtitle}</p>
          </div>
        </div>

        <div className="options">
          {question.options.map((option) => (
            <button className="option" key={option.label} onClick={() => choose(option)}>
              <strong>{option.label}</strong>
              <span>{option.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

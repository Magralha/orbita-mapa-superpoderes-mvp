export const seasonOne = {
  id: 'temporada-01',
  title: 'O Futuro da Minha Escola',
  subtitle: '4 semanas para investigar, imaginar, construir e comunicar uma melhoria real.',
  weeks: [
    {
      id: 'semana-1',
      number: 1,
      title: 'Investigar',
      power: 'investigar',
      mission: 'Observe um problema real da escola, converse com pessoas e reúna três pistas sobre por que ele acontece.',
      xp: 60,
    },
    {
      id: 'semana-2',
      number: 2,
      title: 'Imaginar',
      power: 'criar',
      mission: 'Crie três caminhos diferentes para melhorar o problema e escolha um para aprofundar.',
      xp: 60,
    },
    {
      id: 'semana-3',
      number: 3,
      title: 'Construir',
      power: 'construir',
      mission: 'Faça uma primeira versão simples da solução: desenho, protótipo, roteiro, mapa ou teste.',
      xp: 80,
    },
    {
      id: 'semana-4',
      number: 4,
      title: 'Comunicar',
      power: 'comunicar',
      mission: 'Apresente a proposta para alguém da escola, escute o feedback e registre o que mudaria.',
      xp: 80,
    },
  ],
  epic: {
    id: 'epic-melhorar',
    title: 'Epic Quest · Melhorar uma coisa de verdade',
    text: 'Transforme as quatro semanas em uma proposta simples para a escola: problema, evidências, ideia, teste e próximo passo.',
    xp: 150,
  },
};

export const weeklyQuests = [
  {
    id: 'quest-semana-1-investigar',
    week: 1,
    title: 'Caça às Causas',
    territory: 'Escola',
    duration: '20–30 min',
    xp: 50,
    powerKeys: ['investigar', 'cuidar'],
    steps: [
      'Escolha um problema que você percebe na escola.',
      'Encontre duas pistas sobre por que ele acontece.',
      'Converse com pelo menos uma pessoa afetada.',
      'Registre uma causa que você ainda precisa confirmar.',
    ],
    reflection: 'Qual pista mudou mais a sua primeira impressão?',
  },
  {
    id: 'quest-semana-2-imaginar',
    week: 2,
    title: 'Três Futuros Possíveis',
    territory: 'Escola',
    duration: '20–30 min',
    xp: 50,
    powerKeys: ['criar', 'conectar'],
    steps: [
      'Pegue o problema investigado na semana anterior.',
      'Imagine três soluções bem diferentes.',
      'Peça a opinião de alguém sobre as três.',
      'Escolha uma para levar para teste.',
    ],
    reflection: 'O que fez uma ideia parecer mais interessante do que as outras?',
  },
  {
    id: 'quest-semana-3-construir',
    week: 3,
    title: 'Versão 0.1',
    territory: 'Escola',
    duration: '30–40 min',
    xp: 70,
    powerKeys: ['construir', 'organizar'],
    steps: [
      'Escolha a ideia que vai virar teste.',
      'Defina o menor protótipo possível.',
      'Monte, desenhe ou simule essa primeira versão.',
      'Anote o que falhou ou precisaria mudar.',
    ],
    reflection: 'O que o primeiro teste ensinou que a ideia no papel não mostrava?',
  },
  {
    id: 'quest-semana-4-comunicar',
    week: 4,
    title: 'Apresentar, Ouvir, Melhorar',
    territory: 'Escola',
    duration: '20–30 min',
    xp: 70,
    powerKeys: ['comunicar', 'conectar'],
    steps: [
      'Organize problema, evidências, ideia e teste em uma história curta.',
      'Apresente para alguém da escola.',
      'Escute pelo menos um feedback sem defender a ideia imediatamente.',
      'Registre uma mudança que você faria.',
    ],
    reflection: 'Qual feedback faria sua solução ficar mais forte?',
  },
];

export const weeklyQuest = weeklyQuests[0];

export function questForWeek(week = 1) {
  const normalized = Math.min(4, Math.max(1, Number(week) || 1));
  return weeklyQuests.find((quest) => quest.week === normalized) || weeklyQuests[0];
}

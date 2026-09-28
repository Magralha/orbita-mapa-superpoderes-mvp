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
    title: 'Epic Quest · Melhorar uma coisa de verdade',
    text: 'Transforme as quatro semanas em uma proposta simples para a escola: problema, evidências, ideia, teste e próximo passo.',
    xp: 150,
  },
};

export const weeklyQuest = {
  id: 'quest-semanal-escola',
  title: 'O futuro da minha escola',
  territory: 'Escola',
  duration: '20–30 min',
  xp: 50,
  steps: [
    'Escolha um problema que você percebe na escola.',
    'Encontre duas pistas sobre por que ele acontece.',
    'Converse com pelo menos uma pessoa afetada.',
    'Imagine uma pequena mudança que poderia ser testada.',
  ],
};

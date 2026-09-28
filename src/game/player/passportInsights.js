const INTEREST_AREAS = [
  {
    id: 'tecnologia',
    label: 'Tecnologia',
    categories: ['tecnologia'],
    keywords: ['ia', 'digital', 'fonte', 'prompt', 'tecnologia'],
    powers: ['investigar', 'proteger'],
  },
  {
    id: 'criacao',
    label: 'Criação & audiovisual',
    categories: ['cultura'],
    keywords: ['vídeo', 'ideia', 'campanha', 'história', 'criativo', 'apresentação'],
    powers: ['criar', 'comunicar'],
  },
  {
    id: 'maker',
    label: 'Maker & construção',
    categories: ['experiencias'],
    keywords: ['protótipo', 'construir', 'ferramenta', 'teste', 'oficina'],
    powers: ['construir', 'organizar'],
  },
  {
    id: 'pessoas',
    label: 'Pessoas & colaboração',
    categories: ['comunidade'],
    keywords: ['grupo', 'pessoa', 'escuta', 'conversa', 'ajuda', 'clima'],
    powers: ['cuidar', 'conectar'],
  },
  {
    id: 'cidade',
    label: 'Cidade & comunidade',
    categories: ['comunidade'],
    keywords: ['cidade', 'bairro', 'comunidade', 'escola', 'recreio'],
    powers: ['organizar', 'conectar'],
  },
  {
    id: 'esporte',
    label: 'Esporte',
    categories: ['esporte'],
    keywords: ['esporte', 'arena'],
    powers: ['organizar', 'proteger'],
  },
];

function normalizeText(value = '') {
  return String(value).toLowerCase();
}

export function deriveInterestSignals(profile) {
  const events = profile?.events || [];
  const experiences = profile?.experiences || [];
  const explicit = profile?.interests || {};

  return INTEREST_AREAS.map((area) => {
    let score = Number(explicit[area.id] || 0);
    let evidence = 0;

    events.forEach((event) => {
      const text = normalizeText([event.label, event.meta?.territory, event.meta?.category].filter(Boolean).join(' '));
      const keywordHits = area.keywords.filter((keyword) => text.includes(keyword)).length;
      const powerHits = area.powers.reduce(
        (total, key) => total + (Number(event.powers?.[key] || 0) > 0 ? 1 : 0),
        0,
      );

      if (keywordHits || powerHits >= 2) {
        evidence += 1;
        score += keywordHits * 2 + Math.max(0, powerHits - 1);
      }
    });

    experiences.forEach((experience) => {
      if (area.categories.includes(experience.category)) {
        evidence += 1;
        score += 4;
      }
    });

    return { ...area, score, evidence };
  })
    .filter((area) => area.score > 0)
    .sort((a, b) => b.score - a.score || b.evidence - a.evidence)
    .slice(0, 5);
}

export function buildPassportHistory(profile) {
  return [...(profile?.events || [])]
    .reverse()
    .map((event) => {
      let source = 'Jogo';
      if (event.type === 'daily_mission') source = 'Missão do dia';
      if (event.type === 'real_life_experience') source = 'Experiência real';
      if (event.type === 'mission_completed') source = 'Quest';

      return {
        id: event.id,
        label: event.label || 'Movimento da jornada',
        source,
        xp: Number(event.xp || 0),
        territory: event.meta?.territory || event.meta?.category || null,
      };
    });
}

export function deriveMilestones(profile) {
  const events = profile?.events || [];
  const experiences = profile?.experiences || [];
  const daily = events.filter((event) => event.type === 'daily_mission');
  const territories = new Set(daily.map((event) => event.meta?.territory).filter(Boolean));
  const level = profile?.progression?.level || 1;

  const milestones = [
    {
      id: 'primeiro-passo',
      label: 'Primeiro passo',
      text: 'Começou a construir o Mapa Órbita.',
      unlocked: events.length > 0,
    },
    {
      id: 'rotina',
      label: 'Em movimento',
      text: 'Concluiu 5 missões do dia.',
      unlocked: daily.length >= 5,
    },
    {
      id: 'tres-mundos',
      label: 'Três mundos',
      text: 'Experimentou Escola, Casa e Mundo.',
      unlocked: territories.size >= 3,
    },
    {
      id: 'mundo-real',
      label: 'Saiu da tela',
      text: 'Registrou uma experiência real.',
      unlocked: experiences.length > 0,
    },
    {
      id: 'nivel-3',
      label: 'Órbita ampliada',
      text: 'Chegou ao nível 3.',
      unlocked: level >= 3,
    },
  ];

  return milestones;
}

export function nextExplorationSuggestions(profile) {
  const interests = deriveInterestSignals(profile);
  const top = interests[0]?.id;

  const suggestions = {
    tecnologia: ['Testar uma atividade maker', 'Criar algo com IA e revisar criticamente', 'Visitar um espaço de tecnologia'],
    criacao: ['Produzir um vídeo curto', 'Criar uma campanha', 'Experimentar uma oficina de design'],
    maker: ['Montar um protótipo simples', 'Consertar ou adaptar alguma coisa', 'Participar de uma oficina prática'],
    pessoas: ['Liderar uma atividade em grupo', 'Ajudar a organizar uma ação coletiva', 'Experimentar mediação ou voluntariado'],
    cidade: ['Mapear um problema do bairro', 'Conversar com alguém da comunidade', 'Propor uma microação local'],
    esporte: ['Experimentar uma modalidade nova', 'Ajudar a organizar um treino ou evento', 'Observar liderança e trabalho em equipe'],
  };

  return suggestions[top] || [
    'Experimentar um contexto novo',
    'Registrar uma experiência fora do jogo',
    'Escolher uma missão em um território diferente',
  ];
}

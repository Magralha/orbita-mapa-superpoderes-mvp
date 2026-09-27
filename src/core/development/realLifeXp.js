export const REAL_LIFE_XP_CATALOG = {
  school_progress: {
    id: 'school_progress',
    category: 'escola',
    label: 'Evolução escolar',
    description: 'Reconhece evolução individual, sem comparar o aluno com os colegas.',
    baseXp: 40,
  },
  school_project: {
    id: 'school_project',
    category: 'escola',
    label: 'Projeto escolar',
    baseXp: 35,
  },
  sport_participation: {
    id: 'sport_participation',
    category: 'esporte',
    label: 'Participação esportiva',
    baseXp: 30,
  },
  culture_participation: {
    id: 'culture_participation',
    category: 'cultura',
    label: 'Participação cultural',
    baseXp: 30,
  },
  technology_activity: {
    id: 'technology_activity',
    category: 'tecnologia',
    label: 'Atividade de tecnologia',
    baseXp: 35,
  },
  community_project: {
    id: 'community_project',
    category: 'comunidade',
    label: 'Projeto comunitário',
    baseXp: 35,
  },
  learning_experience: {
    id: 'learning_experience',
    category: 'experiencias',
    label: 'Experiência de aprendizagem',
    baseXp: 25,
  },
};

export function buildRealLifeExperience(type, {
  id,
  label,
  powers = {},
  verified = false,
  source = 'school',
  xp,
} = {}) {
  const catalog = REAL_LIFE_XP_CATALOG[type];
  if (!catalog) return null;

  return {
    id: id || `${type}-demo`,
    category: catalog.category,
    label: label || catalog.label,
    xp: Number.isFinite(Number(xp)) ? Number(xp) : catalog.baseXp,
    powers,
    verified,
    source,
  };
}

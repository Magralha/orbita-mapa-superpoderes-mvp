export const POWER_KEYS = [
  'investigar',
  'criar',
  'cuidar',
  'construir',
  'comunicar',
  'organizar',
  'proteger',
  'conectar',
];

export const REAL_LIFE_CATEGORIES = [
  'escola',
  'esporte',
  'cultura',
  'tecnologia',
  'comunidade',
  'experiencias',
];

export function emptyPowerMap() {
  return POWER_KEYS.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});
}

export function createPlayerProfile({ agent = null, grade = 9 } = {}) {
  return {
    version: 2,
    student: {
      id: 'demo-player',
      displayName: 'Jogador Órbita',
      grade,
      agentId: agent?.id || null,
    },
    progression: {
      xp: 0,
      level: 1,
      missionsCompleted: 0,
    },
    powers: emptyPowerMap(),
    interests: {},
    experiences: [],
    achievements: [],
    events: [],
  };
}

export function levelFromXp(xp = 0) {
  return Math.max(1, 1 + Math.floor(xp / 100));
}

function mergePowers(current = {}, gained = {}) {
  const next = { ...emptyPowerMap(), ...current };

  Object.entries(gained || {}).forEach(([key, value]) => {
    if (!POWER_KEYS.includes(key) || !Number.isFinite(Number(value))) return;
    next[key] = Math.max(0, (next[key] || 0) + Number(value));
  });

  return next;
}

export function applyDevelopmentEvent(profile, {
  type,
  label,
  xp = 0,
  powers = {},
  meta = {},
} = {}) {
  const current = profile || createPlayerProfile();
  const nextXp = Math.max(0, (current.progression?.xp || 0) + xp);

  return {
    ...current,
    progression: {
      ...(current.progression || {}),
      xp: nextXp,
      level: levelFromXp(nextXp),
    },
    powers: mergePowers(current.powers, powers),
    events: [
      ...(current.events || []),
      {
        id: `${type || 'event'}-${(current.events || []).length + 1}`,
        type: type || 'event',
        label: label || '',
        xp,
        powers: { ...powers },
        meta: { ...meta },
      },
    ],
  };
}

export function completeMission(profile, mission) {
  const current = applyDevelopmentEvent(profile, {
    type: 'mission_completed',
    label: mission?.label || 'Missão concluída',
    xp: 50,
    powers: mission?.powers || {},
    meta: { missionId: mission?.id || null },
  });

  return {
    ...current,
    progression: {
      ...current.progression,
      missionsCompleted: (current.progression?.missionsCompleted || 0) + 1,
    },
    achievements: [
      ...(current.achievements || []),
      {
        id: `mission-${mission?.id || current.progression.missionsCompleted}`,
        type: 'mission',
        label: mission?.label || 'Missão concluída',
      },
    ],
  };
}

export function addRealLifeExperience(profile, experience) {
  if (!experience?.id || !experience?.category) return profile;
  if (!REAL_LIFE_CATEGORIES.includes(experience.category)) return profile;

  const current = profile || createPlayerProfile();
  const alreadyExists = (current.experiences || []).some((item) => item.id === experience.id);
  if (alreadyExists) return current;

  const withEvent = applyDevelopmentEvent(current, {
    type: 'real_life_experience',
    label: experience.label || experience.id,
    xp: Number(experience.xp || 0),
    powers: experience.powers || {},
    meta: {
      experienceId: experience.id,
      category: experience.category,
      verified: Boolean(experience.verified),
    },
  });

  return {
    ...withEvent,
    experiences: [
      ...(withEvent.experiences || []),
      {
        id: experience.id,
        category: experience.category,
        label: experience.label || experience.id,
        verified: Boolean(experience.verified),
        source: experience.source || 'manual',
      },
    ],
  };
}

export function getTopPowers(profile, limit = 3) {
  return Object.entries(profile?.powers || {})
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

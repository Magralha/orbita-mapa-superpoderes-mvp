import { applyDevelopmentEvent } from '../player/playerProfile';

export const FAMILY_MISSION_TEMPLATES = [
  {
    id: 'fam-organiza',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Missão Menos Caos',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '10 min',
    xp: 25,
    powerKeys: ['organizar', 'construir'],
    text: 'Escolha uma rotina de casa que poderia ficar mais simples e organize em três passos.',
  },
  {
    id: 'fam-ensina',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Ensine uma Coisa',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '10 min',
    xp: 25,
    powerKeys: ['comunicar', 'cuidar'],
    text: 'Ensine para alguém de casa algo que você sabe fazer bem.',
  },
  {
    id: 'fam-inventa',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Dois Objetos, Uma Ideia',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '8 min',
    xp: 20,
    powerKeys: ['criar', 'construir'],
    text: 'Escolha dois objetos de casa e imagine uma invenção que combine os dois.',
  },
];

export const SCHOOL_MISSION_TEMPLATES = [
  {
    id: 'school-recreio',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Desafio do Recreio',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '15 min',
    xp: 30,
    powerKeys: ['investigar', 'criar'],
    text: 'Observe o recreio por dois dias e identifique um problema que você gostaria de melhorar.',
  },
  {
    id: 'school-respeito',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Respeito Digital',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '10 min',
    xp: 25,
    powerKeys: ['proteger', 'comunicar'],
    text: 'Crie uma ideia simples para melhorar a convivência digital da turma.',
  },
  {
    id: 'school-prototipo',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Versão 0.1',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '20 min',
    xp: 35,
    powerKeys: ['construir', 'organizar'],
    text: 'Transforme uma ideia da turma em uma primeira versão que possa ser testada.',
  },
];

export function seededAssignmentState() {
  return {
    version: 1,
    assignments: [
      {
        ...SCHOOL_MISSION_TEMPLATES[0],
        templateId: SCHOOL_MISSION_TEMPLATES[0].id,
        assignmentId: 'seed-school-recreio',
        status: 'assigned',
        targetLabel: 'Turma 7B',
      },
      {
        ...FAMILY_MISSION_TEMPLATES[0],
        templateId: FAMILY_MISSION_TEMPLATES[0].id,
        assignmentId: 'seed-family-organiza',
        status: 'assigned',
        targetLabel: 'Meu jovem',
      },
    ],
  };
}

export function normalizeAssignmentState(value) {
  return {
    ...seededAssignmentState(),
    ...(value || {}),
    assignments: Array.isArray(value?.assignments)
      ? value.assignments
      : seededAssignmentState().assignments,
  };
}

export function addAssignment(state, template, { targetLabel = 'Meu jovem' } = {}) {
  const current = normalizeAssignmentState(state);
  const duplicate = current.assignments.find(
    (item) => item.templateId === template.id && item.status === 'assigned',
  );

  if (duplicate) return current;

  const assignment = {
    ...template,
    templateId: template.id,
    assignmentId: `${template.source}-${template.id}-${current.assignments.length + 1}`,
    status: 'assigned',
    targetLabel,
  };

  return {
    ...current,
    assignments: [...current.assignments, assignment],
  };
}

export function completeAssignment(state, assignmentId, reflectionId) {
  const current = normalizeAssignmentState(state);

  return {
    ...current,
    assignments: current.assignments.map((assignment) => (
      assignment.assignmentId === assignmentId
        ? { ...assignment, status: 'completed', reflectionId }
        : assignment
    )),
  };
}

export function completeAssignedMissionProfile(profile, assignment, reflectionId) {
  const powerGain = {};
  (assignment?.powerKeys || []).forEach((key) => {
    powerGain[key] = 2;
  });

  return applyDevelopmentEvent(profile, {
    type: 'assigned_mission',
    label: assignment?.title || 'Missão recebida',
    xp: Number(assignment?.xp || 0),
    powers: powerGain,
    meta: {
      assignmentId: assignment?.assignmentId || null,
      source: assignment?.source || null,
      territory: assignment?.territory || null,
      reflectionId: reflectionId || null,
    },
  });
}

export function activeAssignments(state) {
  return normalizeAssignmentState(state).assignments.filter((item) => item.status === 'assigned');
}

export function completedAssignments(state) {
  return normalizeAssignmentState(state).assignments.filter((item) => item.status === 'completed');
}

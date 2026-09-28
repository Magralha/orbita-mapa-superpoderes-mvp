import { applyDevelopmentEvent } from '../player/playerProfile';

const DAY_MS = 86400000;

function isoNow() {
  return new Date().toISOString();
}

function dueAtFromDays(days = 5, from = new Date()) {
  const due = new Date(from.getTime() + Number(days || 0) * DAY_MS);
  due.setHours(23, 59, 59, 999);
  return due.toISOString();
}

export const FAMILY_MISSION_TEMPLATES = [
  {
    id: 'fam-organiza',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Missão Menos Caos',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '10 min',
    dueDays: 5,
    xp: 25,
    powerKeys: ['organizar', 'construir'],
    text: 'Escolha uma rotina de casa que poderia ficar mais simples e organize em três passos.',
    evidencePrompt: 'Se quiser, conte em uma frase o que ficou mais simples.',
  },
  {
    id: 'fam-ensina',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Ensine uma Coisa',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '10 min',
    dueDays: 5,
    xp: 25,
    powerKeys: ['comunicar', 'cuidar'],
    text: 'Ensine para alguém de casa algo que você sabe fazer bem.',
    evidencePrompt: 'Se quiser, registre o que ajudou a outra pessoa a entender.',
  },
  {
    id: 'fam-inventa',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Dois Objetos, Uma Ideia',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '8 min',
    dueDays: 5,
    xp: 20,
    powerKeys: ['criar', 'construir'],
    text: 'Escolha dois objetos de casa e imagine uma invenção que combine os dois.',
    evidencePrompt: 'Se quiser, descreva sua ideia em uma frase.',
  },
  {
    id: 'fam-curiosidade',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Pergunta que Ninguém Faz',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '8 min',
    dueDays: 5,
    xp: 20,
    powerKeys: ['investigar', 'comunicar'],
    text: 'Escolha algo comum da rotina e faça uma pergunta que normalmente ninguém faz sobre aquilo.',
    evidencePrompt: 'Se quiser, registre a pergunta que mais abriu conversa.',
  },
  {
    id: 'fam-mapa-rotina',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Mapa da Rotina',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '12 min',
    dueDays: 7,
    xp: 25,
    powerKeys: ['organizar', 'investigar'],
    text: 'Mapeie uma rotina de casa do começo ao fim e marque onde existe espera, retrabalho ou confusão.',
    evidencePrompt: 'Se quiser, conte qual etapa mais chamou sua atenção.',
  },
  {
    id: 'fam-escuta',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Escuta de Verdade',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '10 min',
    dueDays: 5,
    xp: 20,
    powerKeys: ['cuidar', 'conectar'],
    text: 'Converse com alguém de casa e tente ouvir até o fim antes de explicar seu próprio ponto de vista.',
    evidencePrompt: 'Se quiser, registre algo que você entendeu melhor.',
  },
  {
    id: 'fam-conserto',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Conserta, Adapta ou Reinventa',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '15 min',
    dueDays: 7,
    xp: 30,
    powerKeys: ['construir', 'criar'],
    text: 'Escolha um objeto simples que poderia ser consertado, adaptado ou usado de outro jeito.',
    evidencePrompt: 'Se quiser, conte qual caminho você escolheu e por quê.',
  },
  {
    id: 'fam-seguranca',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Radar de Segurança',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '8 min',
    dueDays: 5,
    xp: 20,
    powerKeys: ['proteger', 'investigar'],
    text: 'Observe uma situação da rotina em que um pequeno cuidado poderia evitar um problema.',
    evidencePrompt: 'Se quiser, registre o cuidado que você sugeriria.',
  },
  {
    id: 'fam-historia',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Uma História que Eu Não Sabia',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '15 min',
    dueDays: 7,
    xp: 25,
    powerKeys: ['comunicar', 'conectar'],
    text: 'Pergunte para alguém da família sobre uma experiência da idade que você tem hoje.',
    evidencePrompt: 'Se quiser, registre uma coisa que te surpreendeu.',
  },
  {
    id: 'fam-decidir',
    source: 'family',
    sourceLabel: 'Família',
    title: 'Escolha com Limite',
    territory: 'casa',
    territoryLabel: 'Casa',
    duration: '10 min',
    dueDays: 5,
    xp: 20,
    powerKeys: ['organizar', 'cuidar'],
    text: 'Escolha uma decisão simples da rotina e compare duas opções considerando tempo, impacto e pessoas envolvidas.',
    evidencePrompt: 'Se quiser, conte qual critério pesou mais.',
  }

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
    dueDays: 7,
    xp: 30,
    powerKeys: ['investigar', 'criar'],
    text: 'Observe o recreio por dois dias e identifique um problema que você gostaria de melhorar.',
    evidencePrompt: 'Se quiser, registre uma pista que chamou sua atenção.',
  },
  {
    id: 'school-respeito',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Respeito Digital',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '10 min',
    dueDays: 7,
    xp: 25,
    powerKeys: ['proteger', 'comunicar'],
    text: 'Crie uma ideia simples para melhorar a convivência digital da turma.',
    evidencePrompt: 'Se quiser, escreva a ideia principal que você levaria para a turma.',
  },
  {
    id: 'school-prototipo',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Versão 0.1',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '20 min',
    dueDays: 10,
    xp: 35,
    powerKeys: ['construir', 'organizar'],
    text: 'Transforme uma ideia da turma em uma primeira versão que possa ser testada.',
    evidencePrompt: 'Se quiser, conte o que você testou primeiro.',
  },
  {
    id: 'school-escuta',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Mapa de Escuta',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '15 min',
    dueDays: 7,
    xp: 30,
    powerKeys: ['cuidar', 'conectar'],
    text: 'Observe uma atividade em grupo e perceba quem participa muito, pouco ou quase nada.',
    evidencePrompt: 'Se quiser, registre uma mudança que poderia melhorar a participação.',
  },
  {
    id: 'school-fonte',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Fonte Confiável?',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '12 min',
    dueDays: 7,
    xp: 30,
    powerKeys: ['investigar', 'proteger'],
    text: 'Escolha uma informação usada em aula e compare com pelo menos outra fonte antes de aceitá-la.',
    evidencePrompt: 'Se quiser, registre qual critério ajudou mais na comparação.',
  },
  {
    id: 'school-explica',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Explica em 60 Segundos',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '10 min',
    dueDays: 7,
    xp: 25,
    powerKeys: ['comunicar', 'organizar'],
    text: 'Explique um conteúdo difícil em até 60 segundos para alguém da turma.',
    evidencePrompt: 'Se quiser, registre o que você precisou simplificar.',
  },
  {
    id: 'school-sistema',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Por Trás do Problema',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '20 min',
    dueDays: 10,
    xp: 35,
    powerKeys: ['investigar', 'organizar'],
    text: 'Escolha um problema recorrente da escola e conecte uma causa, uma consequência e um possível ponto de ação.',
    evidencePrompt: 'Se quiser, registre qual conexão pareceu menos óbvia.',
  },
  {
    id: 'school-inclusao',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Quem Ficou de Fora?',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '15 min',
    dueDays: 7,
    xp: 30,
    powerKeys: ['cuidar', 'proteger'],
    text: 'Observe uma atividade, regra ou espaço da escola e pense em quem pode ter mais dificuldade de participar.',
    evidencePrompt: 'Se quiser, registre uma adaptação possível.',
  },
  {
    id: 'school-campanha',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Campanha Relâmpago',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '20 min',
    dueDays: 10,
    xp: 35,
    powerKeys: ['criar', 'comunicar'],
    text: 'Escolha um tema importante para a escola e crie uma mensagem curta que faça alguém prestar atenção.',
    evidencePrompt: 'Se quiser, registre a frase principal da sua campanha.',
  },
  {
    id: 'school-ponte',
    source: 'school',
    sourceLabel: 'Escola',
    title: 'Ponte entre Turmas',
    territory: 'escola',
    territoryLabel: 'Escola',
    duration: '20 min',
    dueDays: 10,
    xp: 35,
    powerKeys: ['conectar', 'comunicar'],
    text: 'Descubra algo que outra turma está fazendo e pense em uma forma simples de trocar conhecimento entre vocês.',
    evidencePrompt: 'Se quiser, registre a conexão que você criaria.',
  }

];

function seededAssignment(template, assignmentId, targetLabel, assignedOffsetDays = 0) {
  const assignedDate = new Date(Date.now() - assignedOffsetDays * DAY_MS);
  return {
    ...template,
    templateId: template.id,
    assignmentId,
    status: 'assigned',
    targetLabel,
    assignedAt: assignedDate.toISOString(),
    dueAt: dueAtFromDays(template.dueDays, assignedDate),
    reflectionId: null,
    evidenceText: '',
    completedAt: null,
    acknowledgedAt: null,
  };
}

export function seededAssignmentState() {
  return {
    version: 2,
    assignments: [
      seededAssignment(SCHOOL_MISSION_TEMPLATES[0], 'seed-school-recreio', 'Turma 7B', 1),
      seededAssignment(FAMILY_MISSION_TEMPLATES[0], 'seed-family-organiza', 'Meu jovem', 0),
    ],
  };
}

export function normalizeAssignmentState(value) {
  const seed = seededAssignmentState();
  const rawAssignments = Array.isArray(value?.assignments) ? value.assignments : seed.assignments;

  return {
    ...seed,
    ...(value || {}),
    version: 2,
    assignments: rawAssignments.map((assignment) => ({
      ...assignment,
      templateId: assignment.templateId || assignment.id,
      assignedAt: assignment.assignedAt || isoNow(),
      dueAt: assignment.dueAt || dueAtFromDays(assignment.dueDays || 5),
      evidenceText: assignment.evidenceText || '',
      completedAt: assignment.completedAt || null,
      acknowledgedAt: assignment.acknowledgedAt || null,
    })),
  };
}

export function addAssignment(
  state,
  template,
  { targetLabel = 'Meu jovem', dueDays = template?.dueDays || 5 } = {},
) {
  const current = normalizeAssignmentState(state);
  const duplicate = current.assignments.find(
    (item) =>
      item.templateId === template.id &&
      item.status === 'assigned' &&
      item.targetLabel === targetLabel,
  );

  if (duplicate) return current;

  const assignedAt = new Date();
  const assignment = {
    ...template,
    templateId: template.id,
    assignmentId: `${template.source}-${template.id}-${current.assignments.length + 1}`,
    status: 'assigned',
    targetLabel,
    assignedAt: assignedAt.toISOString(),
    dueAt: dueAtFromDays(dueDays, assignedAt),
    reflectionId: null,
    evidenceText: '',
    completedAt: null,
    acknowledgedAt: null,
  };

  return {
    ...current,
    assignments: [...current.assignments, assignment],
  };
}

export function completeAssignment(
  state,
  assignmentId,
  { reflectionId, evidenceText = '' } = {},
) {
  const current = normalizeAssignmentState(state);

  return {
    ...current,
    assignments: current.assignments.map((assignment) => {
      if (assignment.assignmentId !== assignmentId) return assignment;

      if (reflectionId === 'nao-rolou') {
        return {
          ...assignment,
          lastAttemptAt: isoNow(),
          lastReflectionId: reflectionId,
          evidenceText: evidenceText || assignment.evidenceText || '',
        };
      }

      return {
        ...assignment,
        status: 'completed',
        reflectionId,
        evidenceText: evidenceText.trim(),
        completedAt: isoNow(),
        acknowledgedAt: null,
      };
    }),
  };
}

export function acknowledgeAssignment(state, assignmentId) {
  const current = normalizeAssignmentState(state);

  return {
    ...current,
    assignments: current.assignments.map((assignment) => (
      assignment.assignmentId === assignmentId && assignment.status === 'completed'
        ? { ...assignment, acknowledgedAt: assignment.acknowledgedAt || isoNow() }
        : assignment
    )),
  };
}

export function completeAssignedMissionProfile(profile, assignment, { reflectionId } = {}) {
  if (!profile || !assignment || reflectionId === 'nao-rolou') return profile;

  const partial = reflectionId === 'parcial';
  const powerGain = {};
  (assignment.powerKeys || []).forEach((key) => {
    powerGain[key] = partial ? 1 : 2;
  });

  return applyDevelopmentEvent(profile, {
    type: 'assigned_mission',
    label: assignment.title || 'Missão recebida',
    xp: partial ? Math.max(5, Math.round(Number(assignment.xp || 0) * 0.6)) : Number(assignment.xp || 0),
    powers: powerGain,
    meta: {
      assignmentId: assignment.assignmentId || null,
      source: assignment.source || null,
      territory: assignment.territory || null,
      reflectionId: reflectionId || null,
      completion: partial ? 'partial' : 'complete',
    },
  });
}

export function activeAssignments(state) {
  return normalizeAssignmentState(state).assignments.filter((item) => item.status === 'assigned');
}

export function completedAssignments(state) {
  return normalizeAssignmentState(state).assignments.filter((item) => item.status === 'completed');
}

export function isAssignmentOverdue(assignment, now = new Date()) {
  if (!assignment?.dueAt || assignment.status !== 'assigned') return false;
  return new Date(assignment.dueAt).getTime() < now.getTime();
}

export function formatAssignmentDue(assignment, locale = 'pt-BR') {
  if (!assignment?.dueAt) return 'Sem prazo';
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit' }).format(
    new Date(assignment.dueAt),
  );
}

export function assignmentStatusLabel(assignment) {
  if (assignment?.status === 'completed' && assignment.acknowledgedAt) return 'Concluída · acompanhada';
  if (assignment?.status === 'completed') return 'Concluída · aguardando acompanhamento';
  if (isAssignmentOverdue(assignment)) return 'Prazo passou · continua disponível';
  return 'Em andamento';
}

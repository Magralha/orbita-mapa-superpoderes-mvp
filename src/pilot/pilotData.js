export const pilotSchools = [
  {
    id: 'school-orbita-norte',
    name: 'EM Órbita Norte',
    territory: 'Norte',
  },
];

export const pilotClasses = [
  {
    id: 'class-7b',
    schoolId: 'school-orbita-norte',
    label: '7º B',
    grade: 7,
    year: 2026,
  },
];

export const pilotStudents = [
  {
    id: 'student-lia',
    displayName: 'Lia',
    classId: 'class-7b',
    schoolId: 'school-orbita-norte',
    guardianIds: ['guardian-lia'],
    agentId: 'kira',
  },
];

export const pilotGuardians = [
  {
    id: 'guardian-lia',
    displayName: 'Responsável da Lia',
    studentIds: ['student-lia'],
  },
];

export const pilotStaff = [
  {
    id: 'teacher-7b',
    displayName: 'Educador 7º B',
    schoolId: 'school-orbita-norte',
    classIds: ['class-7b'],
  },
];

export const pilotAccounts = [
  {
    id: 'account-student-lia',
    role: 'student',
    label: 'Aluno',
    displayName: 'Lia',
    subtitle: '7º B · EM Órbita Norte',
    studentId: 'student-lia',
  },
  {
    id: 'account-family-lia',
    role: 'family',
    label: 'Família',
    displayName: 'Responsável da Lia',
    subtitle: 'Acompanha Lia',
    guardianId: 'guardian-lia',
  },
  {
    id: 'account-school-7b',
    role: 'school',
    label: 'Escola',
    displayName: 'Educador 7º B',
    subtitle: 'EM Órbita Norte · 7º B',
    staffId: 'teacher-7b',
  },
];

export function getPilotAccount(accountId) {
  return pilotAccounts.find((account) => account.id === accountId) || null;
}

export function getPilotStudent(studentId) {
  return pilotStudents.find((student) => student.id === studentId) || null;
}

export function getPilotGuardian(guardianId) {
  return pilotGuardians.find((guardian) => guardian.id === guardianId) || null;
}

export function getPilotStaff(staffId) {
  return pilotStaff.find((staff) => staff.id === staffId) || null;
}

export function getPilotClass(classId) {
  return pilotClasses.find((item) => item.id === classId) || null;
}

export function getPilotSchool(schoolId) {
  return pilotSchools.find((school) => school.id === schoolId) || null;
}

export function resolvePilotLinks(account) {
  if (!account) return {};

  if (account.role === 'student') {
    const student = getPilotStudent(account.studentId);
    return {
      student,
      classRoom: getPilotClass(student?.classId),
      school: getPilotSchool(student?.schoolId),
      guardians: (student?.guardianIds || []).map(getPilotGuardian).filter(Boolean),
    };
  }

  if (account.role === 'family') {
    const guardian = getPilotGuardian(account.guardianId);
    const students = (guardian?.studentIds || []).map(getPilotStudent).filter(Boolean);
    return {
      guardian,
      students,
      student: students[0] || null,
      classRoom: students[0] ? getPilotClass(students[0].classId) : null,
      school: students[0] ? getPilotSchool(students[0].schoolId) : null,
    };
  }

  if (account.role === 'school') {
    const staff = getPilotStaff(account.staffId);
    return {
      staff,
      classRooms: (staff?.classIds || []).map(getPilotClass).filter(Boolean),
      school: getPilotSchool(staff?.schoolId),
    };
  }

  return {};
}

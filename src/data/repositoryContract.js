// Frontend repository contract for the Órbita pilot.
//
// V4 currently uses local browser persistence. The purpose of this module is to
// keep the data operations that will move to the real backend explicit.
// A remote implementation should preserve these operation shapes.

export const orbitaRepositoryContract = {
  session: [
    'signIn',
    'signOut',
    'getCurrentAccount',
  ],
  profile: [
    'getStudentProfile',
    'saveStudentProfile',
    'appendDevelopmentEvent',
  ],
  assignments: [
    'listAssignmentsForStudent',
    'createAssignment',
    'completeAssignment',
    'acknowledgeAssignment',
  ],
  school: [
    'listAuthorizedClasses',
    'getClassAggregate',
  ],
  privacy: [
    'getConsentStatus',
    'recordConsent',
    'requestDataDeletion',
  ],
};

export function assertRepositoryShape(repository) {
  const missing = [];

  Object.values(orbitaRepositoryContract)
    .flat()
    .forEach((method) => {
      if (typeof repository?.[method] !== 'function') missing.push(method);
    });

  return {
    valid: missing.length === 0,
    missing,
  };
}

export const mockMunicipality = {
  id: 'cidade-orbita',
  name: 'Cidade Órbita',
  students: 1000,
  schools: [
    { id: 'e01', name: 'EM Órbita Norte', students: 128, territory: 'Norte' },
    { id: 'e02', name: 'EM Caminhos', students: 121, territory: 'Norte' },
    { id: 'e03', name: 'EM Horizonte', students: 134, territory: 'Centro' },
    { id: 'e04', name: 'EM Inventores', students: 119, territory: 'Centro' },
    { id: 'e05', name: 'EM Pontes', students: 126, territory: 'Leste' },
    { id: 'e06', name: 'EM Futuro', students: 117, territory: 'Leste' },
    { id: 'e07', name: 'EM Trilhas', students: 130, territory: 'Sul' },
    { id: 'e08', name: 'EM Conexões', students: 125, territory: 'Sul' },
  ],
};

export const mockOpportunities = [
  {
    id: 'opp-audiovisual',
    title: 'Laboratório de Audiovisual',
    category: 'cultura',
    territory: 'Centro',
    capacity: 20,
    targetSignals: ['criar', 'comunicar'],
  },
  {
    id: 'opp-robotica',
    title: 'Oficina Maker e Robótica',
    category: 'tecnologia',
    territory: 'Norte',
    capacity: 25,
    targetSignals: ['investigar', 'construir'],
  },
  {
    id: 'opp-esporte',
    title: 'Festival Esportivo Escolar',
    category: 'esporte',
    territory: 'Sul',
    capacity: 80,
    targetSignals: ['conectar', 'organizar'],
  },
];

export const mockPublicSignals = {
  totalStudents: 1000,
  activeStudents: 842,
  studentsWithThreeOrMoreExperiences: 538,
  interestVsAccess: [
    { area: 'Tecnologia', interested: 312, withAccess: 84 },
    { area: 'Esporte', interested: 286, withAccess: 219 },
    { area: 'Audiovisual', interested: 187, withAccess: 43 },
    { area: 'Ciência', interested: 164, withAccess: 71 },
    { area: 'Artes', interested: 201, withAccess: 116 },
  ],
};

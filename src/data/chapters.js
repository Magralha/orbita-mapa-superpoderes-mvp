export const chapters = [
  {
    id: 'instinto',
    title: 'Fase 1',
    name: 'Instinto',
    text: 'Aqui você escolhe sem pensar demais. Animal, game, reação inicial. A ideia é captar o que aparece primeiro.',
    startsAt: 0,
    color: 'cyan',
  },
  {
    id: 'inventario',
    title: 'Fase 2',
    name: 'Inventário',
    text: 'Agora você monta sua mochila, descarta cartas e mostra quais recursos levaria para uma fase difícil.',
    startsAt: 2,
    color: 'yellow',
  },
  {
    id: 'mundo-interno',
    title: 'Fase 3',
    name: 'Mundo interno',
    text: 'Nesta fase, suas escolhas mostram como sua cabeça funciona quando imagina, organiza, cria ou cuida.',
    startsAt: 5,
    color: 'purple',
  },
  {
    id: 'time-e-conflito',
    title: 'Fase 4',
    name: 'Time e conflito',
    text: 'Aqui entram grupo, redes sociais, IA, apresentação, pressão e escolhas de convivência.',
    startsAt: 7,
    color: 'green',
  },
  {
    id: 'missao-final',
    title: 'Fase 5',
    name: 'Missão final',
    text: 'A última parte conecta seus superpoderes com impacto: o que você gostaria de transformar ao seu redor.',
    startsAt: 12,
    color: 'pink',
  },
];

export function chapterForStep(step) {
  return [...chapters].reverse().find((chapter) => step >= chapter.startsAt) || chapters[0];
}

export function isChapterStart(step) {
  return chapters.some((chapter) => chapter.startsAt === step);
}

# Órbita game-v2 — arquitetura do produto

## Objetivo

Transformar o MVP atual em um RPG de desenvolvimento para alunos do Ensino Fundamental II, com três experiências conectadas:

1. **Aluno** — joga, experimenta, conquista e descobre padrões de força.
2. **Responsável** — acompanha evolução, interesses e oportunidades sem receber rótulos deterministas.
3. **Escola/Município** — enxerga sinais agregados, lacunas de acesso e possibilidades de política pública.

## Princípio de dados

O sistema não cria uma nota única da criança.

Mantém dimensões separadas:
- XP de jornada;
- superpoderes;
- experiências reais;
- conquistas;
- interesses;
- acesso a oportunidades;
- evolução ao longo do tempo.

A interface pública deve distinguir:
- dado observado;
- interpretação;
- recomendação.

## Núcleo do jogador

O arquivo `src/game/player/playerProfile.js` define o perfil longitudinal.

O perfil contém:
- identidade mínima para o protótipo;
- XP e nível;
- oito superpoderes;
- experiências;
- conquistas;
- eventos da jornada.

## Engine

`src/game/engine/rpgEngine.js` transforma ações em eventos de desenvolvimento.

Primeiros eventos:
- seleção de agente;
- escolhas narrativas;
- mochila;
- uso de item;
- trade-off;
- carta de poder;
- missão concluída.

## Vida real

`src/core/development/realLifeXp.js` prepara experiências de:
- escola;
- esporte;
- cultura;
- tecnologia;
- comunidade;
- outras experiências de aprendizagem.

O protótipo deve valorizar evolução e participação. Não deve premiar apenas resultado absoluto ou disponibilidade financeira da família.

## Dados municipais

`src/mock/municipality.js` usa apenas dados sintéticos.

A V2 não precisa de dados reais de menores para demonstrar:
- interesse x acesso;
- cobertura;
- oportunidades;
- territórios;
- capacidade de programas.

## Próximos PRs

1. Integrar Player Profile ao jogo atual.
2. Criar uma tela de perfil do aluno.
3. Criar experiências reais demonstrativas.
4. Criar portal do responsável.
5. Criar dashboard escola/município.
6. Fechar o loop oportunidade → responsável → aluno.

# Órbita — Mobile Game V3 / Art Direction

## Objetivo

Transformar a experiência do aluno em um jogo mobile-first, altamente visual e com sensação de produto nativo. O código deve funcionar com placeholders atuais, mas todos os slots abaixo serão substituídos por artes finais geradas no Work.

## Direção visual aprovada

- mobile-first, vertical 9:16
- personagens 3D estilizados, ricos e colecionáveis
- ambientes 3D/isométricos com profundidade e iluminação cinematográfica
- HUD compacto, legível e tátil
- menos texto por tela
- decisões grandes e fáceis de tocar
- paleta principal: navy profundo, cyan, mint, amarelo, creme e acentos por agente
- menos contorno neo-brutalista pesado; mais luz, volume, material e profundidade
- público principal: 10–14 anos

## Telas-mãe

1. Home / escolha de agente e cenário
2. Missão / situação / decisão
3. Kit da missão / mochila / poderes / cartas
4. Trade-off / decisão crítica
5. Resultado parcial / recompensa
6. Resultado final / Passaporte Órbita
7. Meu Órbita
8. Responsável
9. Escola / Município

## Assets finais para produzir no Work

### Personagens
8 agentes, cada um com:
- portrait bust 1:1
- full body 4:5
- hero pose 4:5
- reaction happy
- reaction thinking
- reaction challenge
- transparent background versions

IDs:
- luma
- nexo
- kira
- teo
- zuri
- orin
- vega
- mio

### Cenários
16:9, com safe crop central para 9:16:
- escola/pátio
- casa/quarto
- amigos/praça
- games/estação digital
- esporte/quadra
- floresta
- laboratório IA
- ponte
- estúdio criativo
- oficina maker
- cidade
- inventário
- trade-off gate
- boss
- reveal tower
- final mission

### Itens
1:1, fundo transparente, render 3D:
- lanterna
- escudo
- microfone
- mapa
- ferramenta
- pincel
- chave
- corda
- bússola
- relógio
- lupa
- carta coringa

### Poderes
1:1, ícone 3D simples e legível:
- investigar
- criar
- cuidar
- construir
- comunicar
- organizar
- proteger
- conectar

### UI art
- logo Órbita
- card frame agent
- card frame item
- card frame power
- card frame special
- mission badge
- XP/level pill
- progress bar
- coin/token
- backpack icon
- trophy/achievement
- save icon
- bottom nav icons
- scenario tile overlays
- reward burst
- level-up badge

## Slots no código

A troca de arte deve acontecer prioritariamente em:

- `src/game/data/assets.js`
- `public/board/v3/agents/`
- `public/board/v3/worlds/`
- `public/board/v3/items/`
- `public/board/v3/badges/`
- `public/board/v3/ui/`

A interface não deve depender de texto embutido nas imagens.

## Regras de composição

### Agent hero
- cabeça e mãos dentro da safe zone
- silhueta clara em miniatura
- iluminação principal quente + rim light cyan
- equipamento coerente com a função do agente
- sem estereótipos deterministas

### World art
- foco visual deslocado para o lado direito ou centro-direita
- deixar área útil no canto superior esquerdo para HUD
- evitar personagens críticos atrás dos overlays
- profundidade em 3 planos
- leitura clara mesmo em tela de 390 px

### Mobile targets
- referência primária: 390 x 844
- referência secundária: 430 x 932
- touch targets: mínimo 44 px
- escolhas: 3 cards empilhados em mobile
- máximo de 2 linhas por opção quando possível
- texto narrativo curto

## Sequência de produção no Work

1. logo / HUD
2. Kira, Vega e Luma como teste de qualidade
3. pátio da escola
4. home / character select
5. mission decision
6. mission kit
7. demais agentes
8. demais mundos
9. itens e badges
10. resultados / rewards

# Órbita — Pilot QA Matrix

## Functional paths

### Student

- sign in
- choose/start agent journey
- save and exit gameplay
- resume
- complete daily mission
- open Central de Missões
- complete Family mission
- complete School mission
- record partial attempt
- record unsuccessful attempt without false XP
- add optional evidence
- open Season 01
- complete four weekly quests in order
- unlock and complete Epic Quest
- open Mapa Vivo
- open Passaporte
- switch profile through pilot session control

### Family

- sign in
- see linked student
- select mission template
- assign mission
- see pending status
- see optional evidence after completion
- acknowledge completion
- see completed/acknowledged history

### School

- sign in
- see linked school/class
- select mission template
- assign mission
- see mission status
- see optional evidence
- acknowledge completion
- inspect aggregate interest/access panels

### Admin

- sign in
- inspect pilot accounts and links
- inspect content counts
- inspect assignment status
- inspect local analytics
- inspect visual Scene QA grid

## Viewports

| Viewport | Priority |
| --- | --- |
| 320×568 | High |
| 360×800 | High |
| 390×844 | High |
| 430×932 | High |
| 768×1024 | High |
| 1024×768 | Medium |
| 1366×768 | High |
| 1440×900 | Medium |

## Visual acceptance

For each immersive world:

- agent feet visually touch a plausible ground plane;
- scale matches nearby environment objects;
- agent does not cover critical interaction/UI areas;
- HUD does not overlap safe-area/notch;
- bottom sheet does not hide the main point of interest;
- title fits without clipping;
- all choices are readable without page scroll;
- no horizontal overflow;
- no baked UI text in scene art;
- landscape/tablet fallback remains usable.

The Admin → Visual QA tab is the current calibration surface for this pass.

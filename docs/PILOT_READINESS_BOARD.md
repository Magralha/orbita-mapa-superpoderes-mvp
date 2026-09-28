# Órbita — Pilot Readiness Board

## Status legend

- DONE: implemented in V4 demo
- READY: implementation exists but needs real infrastructure/data
- BLOCKED: requires an external dependency or legal decision
- QA: implemented but needs device/user validation

## Product

| Area | Status |
| --- | --- |
| Core game journey | QA |
| 8 power system | DONE |
| Mapa Vivo | DONE |
| Passaporte | DONE |
| Daily mission library (30) | DONE |
| Family mission library (10) | DONE |
| School mission library (10) | DONE |
| 4 weekly quests | DONE |
| 4-week Season 01 | DONE |
| Epic Quest | DONE |
| Family → student → return flow | DONE |
| School → student → return flow | DONE |
| Dead-end navigation cleanup | QA |
| Gameplay scene positioning | QA |

## Operations

| Area | Status |
| --- | --- |
| Pilot role selector | DONE |
| Student-family-school demo links | DONE |
| Admin backoffice | DONE |
| Content overview | DONE |
| Mission status view | DONE |
| Local pilot analytics | DONE |
| Automated V4 content/relationship validation | DONE |
| Visual scene QA panel | DONE |

## Infrastructure

| Area | Status |
| --- | --- |
| PostgreSQL schema | READY |
| Backend architecture | READY |
| Shared database provisioned | BLOCKED |
| Real authentication | BLOCKED |
| Production row-level permissions | BLOCKED |
| Cross-device synchronization | BLOCKED |
| Audit log backend | BLOCKED |

## Privacy / minors

| Area | Status |
| --- | --- |
| Non-ranking product principles | DONE |
| Optional evidence design | DONE |
| Data inventory checklist | READY |
| Consent UI/legal wording | BLOCKED |
| Privacy notice | BLOCKED |
| Retention/deletion policy | BLOCKED |
| Legal review | BLOCKED |

## QA before pilot

Test at minimum:

- iPhone small viewport;
- iPhone large viewport;
- Android small/medium viewport;
- Android large viewport;
- tablet portrait/landscape;
- school desktop Chrome/Edge;
- reload/resume;
- profile switching;
- mission deadline;
- partial completion;
- failed attempt;
- adult acknowledgment;
- weekly quest sequence;
- Epic Quest unlock;
- offline/poor connection behavior after backend exists;
- cross-device state after backend exists.

## External inputs still required

1. Backend provider/environment and credentials.
2. Final pilot school/class/student onboarding data.
3. Legal/privacy decisions and approved wording.
4. Device/user testing with the actual pilot audience.

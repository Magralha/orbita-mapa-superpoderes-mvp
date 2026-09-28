# Órbita — Pilot Backend Architecture

## Goal

Move the current V4 demo from one-browser local state to a pilot-ready multi-user model without changing the product logic already validated in the front end.

## Current state

The V4 preview currently has:

- student, family and school experiences;
- linked pilot identities;
- daily missions;
- family/school assignments;
- optional student evidence;
- mission deadlines and follow-up;
- XP, powers, Mapa Vivo and Passaporte;
- local persistence in the browser.

The pilot login is intentionally synthetic. It demonstrates the relationships but is not authentication.

## Pilot entities

The backend should treat these as separate entities:

1. Account
2. Student
3. Guardian
4. School staff
5. School
6. Class
7. Guardian ↔ Student link
8. Staff ↔ Class link
9. Player profile
10. Mission/assignment
11. Assignment target/completion
12. Development event
13. Real-life experience
14. Daily completion
15. Season progress

The SQL reference is in `infra/postgres/schema.sql`.

## Important product rule

The database stores events and evidence. It should not make opaque child rankings.

The 8 power signals are derived developmental signals used for the student's own journey and contextual adult views. School/municipality views should default to aggregation rather than competitive student ranking.

## Authorization model

### Student

Can:

- read own profile;
- complete own assigned missions;
- add optional evidence to own mission;
- register permitted experiences;
- read own Passaporte and history.

Cannot:

- edit raw power scores;
- see another student's private history;
- acknowledge their own adult-assigned mission on behalf of an adult.

### Family

Can:

- see linked student's permitted developmental view;
- create family missions for linked student;
- see status/evidence for family missions;
- acknowledge completion.

Cannot:

- alter student's raw scores;
- see unrelated students;
- convert the dashboard into a performance grade.

### School

Can:

- create missions for authorized classes/students;
- see mission participation and permitted evidence;
- see school/class aggregate signals;
- acknowledge school mission completion.

Individual drill-down should be limited to legitimate educational follow-up, not ranking.

### Municipality/admin

Should primarily use aggregated data across schools/territories.

## Migration sequence

### Phase 1 — pilot identity

Replace the synthetic `pilotData.js` directory with real authenticated accounts.

### Phase 2 — shared assignments

Move `orbita-assignment-state` out of localStorage and into:

- `orbita_assignments`
- `orbita_assignment_targets`

This is the first feature that must become multi-user because an adult creates a mission and a student completes it from another account/device.

### Phase 3 — player state and events

Move:

- player profile;
- XP;
- power events;
- daily completions;
- experiences;
- Passaporte history.

The event log should be the source of evidence; derived totals can be cached in `orbita_player_profiles`.

### Phase 4 — aggregate school/municipality views

Build aggregate queries/views for:

- participation;
- interest versus access;
- experiences by territory;
- recurring power signals;
- mission completion.

Avoid student leaderboards.

## Frontend adapter target

The UI should eventually depend on a repository layer rather than calling localStorage directly.

Expected operations:

- `signIn()`
- `getCurrentAccount()`
- `getStudentProfile(studentId)`
- `saveStudentProfile(studentId, profile)`
- `listAssignmentsForStudent(studentId)`
- `createAssignment(payload)`
- `completeAssignment(assignmentId, studentId, result)`
- `acknowledgeAssignment(assignmentId, studentId)`
- `appendDevelopmentEvent(studentId, event)`
- `listClassAggregate(classId)`

During V4 these operations can continue using local storage. For the real pilot, the same API should point to the authenticated backend.

## Provider choice

The schema is standard PostgreSQL. It is deliberately not tied to a vendor.

A managed PostgreSQL service with authentication and row-level authorization is sufficient. The provider choice can be made when the pilot environment and credentials are available.

## What is still missing for a real pilot

- real authentication;
- secure passwordless/onboarding flow;
- parental/student consent flow appropriate to the pilot;
- production authorization policies;
- data retention/deletion rules;
- backend environment/secrets;
- migration of localStorage state to the shared database;
- audit logging;
- operational admin tooling.

Do not put production secret keys in the GitHub repository or browser bundle.

-- Órbita pilot backend schema (PostgreSQL)
-- This schema is intentionally provider-neutral. It can be deployed to any managed Postgres.
-- Authentication/RLS policies must be configured by the chosen backend provider before real users.

create extension if not exists pgcrypto;

create table if not exists orbita_accounts (
  id uuid primary key default gen_random_uuid(),
  auth_subject text unique,
  role text not null check (role in ('student','family','school','admin')),
  display_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists orbita_schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  territory text,
  created_at timestamptz not null default now()
);

create table if not exists orbita_classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references orbita_schools(id) on delete cascade,
  label text not null,
  grade integer,
  academic_year integer not null,
  created_at timestamptz not null default now(),
  unique (school_id, label, academic_year)
);

create table if not exists orbita_students (
  id uuid primary key default gen_random_uuid(),
  account_id uuid unique references orbita_accounts(id) on delete set null,
  school_id uuid references orbita_schools(id) on delete set null,
  class_id uuid references orbita_classes(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists orbita_guardians (
  id uuid primary key default gen_random_uuid(),
  account_id uuid unique references orbita_accounts(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists orbita_guardian_students (
  guardian_id uuid not null references orbita_guardians(id) on delete cascade,
  student_id uuid not null references orbita_students(id) on delete cascade,
  relationship_label text,
  created_at timestamptz not null default now(),
  primary key (guardian_id, student_id)
);

create table if not exists orbita_staff (
  id uuid primary key default gen_random_uuid(),
  account_id uuid unique references orbita_accounts(id) on delete cascade,
  school_id uuid not null references orbita_schools(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists orbita_staff_classes (
  staff_id uuid not null references orbita_staff(id) on delete cascade,
  class_id uuid not null references orbita_classes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (staff_id, class_id)
);

create table if not exists orbita_player_profiles (
  student_id uuid primary key references orbita_students(id) on delete cascade,
  agent_id text,
  level integer not null default 1,
  xp integer not null default 0,
  powers jsonb not null default '{}'::jsonb,
  interests jsonb not null default '{}'::jsonb,
  inventory jsonb not null default '[]'::jsonb,
  progression jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists orbita_assignments (
  id uuid primary key default gen_random_uuid(),
  template_id text,
  source_type text not null check (source_type in ('orbita','family','school','municipality')),
  source_account_id uuid references orbita_accounts(id) on delete set null,
  title text not null,
  text text not null,
  territory text,
  duration_label text,
  xp integer not null default 0,
  power_keys jsonb not null default '[]'::jsonb,
  evidence_prompt text,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists orbita_assignment_targets (
  assignment_id uuid not null references orbita_assignments(id) on delete cascade,
  student_id uuid not null references orbita_students(id) on delete cascade,
  class_id uuid references orbita_classes(id) on delete set null,
  status text not null default 'assigned' check (status in ('assigned','completed','cancelled')),
  reflection_id text,
  evidence_text text,
  completed_at timestamptz,
  acknowledged_at timestamptz,
  acknowledged_by uuid references orbita_accounts(id) on delete set null,
  last_attempt_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (assignment_id, student_id)
);

create table if not exists orbita_events (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references orbita_students(id) on delete cascade,
  event_type text not null,
  label text,
  xp integer not null default 0,
  powers jsonb not null default '{}'::jsonb,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists orbita_experiences (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references orbita_students(id) on delete cascade,
  category text not null,
  label text not null,
  source text,
  verified boolean not null default false,
  powers jsonb not null default '{}'::jsonb,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists orbita_daily_completions (
  student_id uuid not null references orbita_students(id) on delete cascade,
  completion_date date not null,
  mission_id text not null,
  territory text,
  reflection_id text,
  xp integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (student_id, completion_date)
);

create table if not exists orbita_season_progress (
  student_id uuid not null references orbita_students(id) on delete cascade,
  season_id text not null,
  week_id text,
  status text not null default 'active',
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (student_id, season_id)
);

create index if not exists idx_orbita_students_class on orbita_students(class_id);
create index if not exists idx_orbita_students_school on orbita_students(school_id);
create index if not exists idx_orbita_events_student_created on orbita_events(student_id, created_at desc);
create index if not exists idx_orbita_assignments_due on orbita_assignments(due_at);
create index if not exists idx_orbita_assignment_targets_student_status on orbita_assignment_targets(student_id, status);
create index if not exists idx_orbita_experiences_student_created on orbita_experiences(student_id, created_at desc);

-- Security note:
-- Do not expose unrestricted table access to browser clients.
-- Before a real pilot, enforce row-level authorization so:
-- 1) students can only read/write their own profile, events and assignment completions;
-- 2) guardians can only read linked students and create family assignments for them;
-- 3) school staff can only read aggregate/authorized student data for linked classes;
-- 4) school/family accounts cannot modify derived power scores directly;
-- 5) service/admin credentials never ship to the browser.

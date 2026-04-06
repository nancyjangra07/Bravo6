-- ============================================================
-- TeamUp — Supabase SQL Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. USERS (extends Supabase auth.users)
create table public.users (
  id            uuid primary key references auth.users(id) on delete cascade,
  name          text not null,
  email         text not null unique,
  skills        text[]   default '{}',
  role          text     check (role in ('frontend','backend','AI','designer','fullstack')),
  experience    text     check (experience in ('beginner','intermediate','advanced')),
  personality   text     check (personality in ('leader','contributor')),
  availability  text     default 'available' check (availability in ('available','busy')),
  github        text     default '',
  quiz_score    int      default 0,
  created_at    timestamptz default now()
);

-- 2. TEAMS
create table public.teams (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  required_roles jsonb default '[]',   -- [{"role":"frontend","count":1}, ...]
  members        uuid[] default '{}',
  created_by     uuid references public.users(id),
  created_at     timestamptz default now()
);

-- 3. SWIPES
create table public.swipes (
  id         uuid primary key default gen_random_uuid(),
  user1      uuid references public.users(id) on delete cascade,
  user2      uuid references public.users(id) on delete cascade,
  action     text check (action in ('like','dislike')),
  created_at timestamptz default now(),
  unique(user1, user2)   -- one swipe per pair direction
);

-- 4. MATCHES (mutual likes)
create table public.matches (
  id         uuid primary key default gen_random_uuid(),
  user1      uuid references public.users(id) on delete cascade,
  user2      uuid references public.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user1, user2)
);

-- 5. QUIZZES
create table public.quizzes (
  id       uuid primary key default gen_random_uuid(),
  skill    text not null,
  question text not null,
  options  jsonb not null,   -- ["Option A", "Option B", "Option C", "Option D"]
  answer   text not null
);

-- 6. MESSAGES (one message per matched pair)
create table public.messages (
  id         uuid primary key default gen_random_uuid(),
  sender     uuid references public.users(id) on delete cascade,
  receiver   uuid references public.users(id) on delete cascade,
  message    text not null,
  created_at timestamptz default now(),
  -- Enforce one message per pair (regardless of direction)
  unique(sender, receiver)
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table public.users    enable row level security;
alter table public.teams    enable row level security;
alter table public.swipes   enable row level security;
alter table public.matches  enable row level security;
alter table public.quizzes  enable row level security;
alter table public.messages enable row level security;

-- Users: anyone can read profiles; only owner can update theirs
create policy "Users are viewable by all" on public.users for select using (true);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.users for insert with check (auth.uid() = id);

-- Teams: anyone can read; authenticated users can create/update
create policy "Teams viewable by all"       on public.teams for select using (true);
create policy "Authenticated can create teams" on public.teams for insert with check (auth.uid() is not null);
create policy "Team creator can update"     on public.teams for update using (auth.uid() = created_by);

-- Swipes: users can only see and create their own swipes
create policy "Own swipes only" on public.swipes for select using (auth.uid() = user1);
create policy "Create own swipes" on public.swipes for insert with check (auth.uid() = user1);

-- Matches: users can see matches they're part of
create policy "View own matches" on public.matches for select
  using (auth.uid() = user1 or auth.uid() = user2);
create policy "System creates matches" on public.matches for insert with check (true);

-- Quizzes: public read
create policy "Quizzes are public" on public.quizzes for select using (true);

-- Messages: users can see messages they sent or received
create policy "View own messages" on public.messages for select
  using (auth.uid() = sender or auth.uid() = receiver);
create policy "Send own messages" on public.messages for insert with check (auth.uid() = sender);

-- ============================================================
-- SAMPLE DATA
-- ============================================================

-- Paste quiz questions (no auth needed for this)
insert into public.quizzes (skill, question, options, answer) values
  ('react',
   'Which hook manages local state in a functional component?',
   '["useState","useEffect","useRef","useContext"]',
   'useState'),

  ('react',
   'What does useEffect do?',
   '["Manages state","Runs side effects after render","Creates components","Handles routing"]',
   'Runs side effects after render'),

  ('nodejs',
   'Which module creates an HTTP server in Node.js?',
   '["fs","path","http","os"]',
   'http'),

  ('nodejs',
   'What does npm stand for?',
   '["Node Package Manager","New Project Manager","Network Protocol Module","Node Process Manager"]',
   'Node Package Manager'),

  ('python',
   'How do you define a function in Python?',
   '["function myFunc():","def myFunc():","func myFunc():","define myFunc():"]',
   'def myFunc():'),

  ('machine learning',
   'What is overfitting?',
   '["Model trains too slowly","Model performs well on training but poorly on test data","Model has too little data","Model uses too many layers"]',
   'Model performs well on training but poorly on test data'),

  ('css',
   'Which property changes text color?',
   '["font-color","text-color","color","background-color"]',
   'color');

// seed.js — Sample data for testing
// ----------------------------------------------------------
// Run this AFTER signing up 10 users via signUp().
// Or paste the SQL version below directly into Supabase SQL Editor.
// ----------------------------------------------------------

// ── JavaScript version (use after auth signup) ─────────────
// Call signUp() from auth.js for each of these, then the
// public.users row is inserted automatically.

export const SEED_USERS = [
  { name:'Arjun Mehta',  email:'arjun@teamup.dev',  password:'Test1234!', role:'frontend',  skills:['React','TypeScript','CSS'],          experience:'intermediate', personality:'contributor' },
  { name:'Priya Sharma', email:'priya@teamup.dev',  password:'Test1234!', role:'backend',   skills:['Node.js','Express','MongoDB'],        experience:'advanced',     personality:'leader'      },
  { name:'Rahul Verma',  email:'rahul@teamup.dev',  password:'Test1234!', role:'AI',        skills:['Python','TensorFlow','Pandas'],       experience:'intermediate', personality:'contributor' },
  { name:'Sneha Kapoor', email:'sneha@teamup.dev',  password:'Test1234!', role:'designer',  skills:['Figma','Adobe XD','UI/UX'],           experience:'advanced',     personality:'contributor' },
  { name:'Dev Patel',    email:'dev@teamup.dev',    password:'Test1234!', role:'fullstack', skills:['React','Node.js','Docker'],           experience:'advanced',     personality:'leader'      },
  { name:'Ananya Singh', email:'ananya@teamup.dev', password:'Test1234!', role:'frontend',  skills:['Vue.js','Tailwind','CSS'],            experience:'beginner',     personality:'contributor' },
  { name:'Vikram Nair',  email:'vikram@teamup.dev', password:'Test1234!', role:'backend',   skills:['Java','Spring Boot','PostgreSQL'],    experience:'advanced',     personality:'contributor' },
  { name:'Meera Joshi',  email:'meera@teamup.dev',  password:'Test1234!', role:'AI',        skills:['Python','Computer Vision','OpenCV'],  experience:'advanced',     personality:'leader'      },
  { name:'Karan Gupta',  email:'karan@teamup.dev',  password:'Test1234!', role:'frontend',  skills:['React Native','Flutter'],             experience:'intermediate', personality:'contributor' },
  { name:'Riya Das',     email:'riya@teamup.dev',   password:'Test1234!', role:'backend',   skills:['GraphQL','Redis','Kafka'],            experience:'intermediate', personality:'leader'      },
]

// To seed via JS:
// import { signUp } from './auth.js'
// for (const u of SEED_USERS) { await signUp(u) }


// ── SQL version — paste into Supabase SQL Editor ───────────
// NOTE: This bypasses auth, so use only for quick demo testing.
// In production, always use the signUp() function above.

/*
insert into public.users (id, name, email, role, skills, experience, personality, availability, quiz_score)
values
  (gen_random_uuid(), 'Arjun Mehta',  'arjun@teamup.dev',  'frontend',  array['React','TypeScript','CSS'],         'intermediate', 'contributor', 'available', 85),
  (gen_random_uuid(), 'Priya Sharma', 'priya@teamup.dev',  'backend',   array['Node.js','Express','MongoDB'],      'advanced',     'leader',      'available', 92),
  (gen_random_uuid(), 'Rahul Verma',  'rahul@teamup.dev',  'AI',        array['Python','TensorFlow','Pandas'],     'intermediate', 'contributor', 'available', 78),
  (gen_random_uuid(), 'Sneha Kapoor', 'sneha@teamup.dev',  'designer',  array['Figma','Adobe XD','UI/UX'],        'advanced',     'contributor', 'available', 60),
  (gen_random_uuid(), 'Dev Patel',    'dev@teamup.dev',    'fullstack', array['React','Node.js','Docker'],        'advanced',     'leader',      'available', 90),
  (gen_random_uuid(), 'Ananya Singh', 'ananya@teamup.dev', 'frontend',  array['Vue.js','Tailwind','CSS'],         'beginner',     'contributor', 'available', 55),
  (gen_random_uuid(), 'Vikram Nair',  'vikram@teamup.dev', 'backend',   array['Java','Spring Boot','PostgreSQL'], 'advanced',     'contributor', 'busy',      40),
  (gen_random_uuid(), 'Meera Joshi',  'meera@teamup.dev',  'AI',        array['Python','Computer Vision'],        'advanced',     'leader',      'available', 95),
  (gen_random_uuid(), 'Karan Gupta',  'karan@teamup.dev',  'frontend',  array['React Native','Flutter'],          'intermediate', 'contributor', 'available', 65),
  (gen_random_uuid(), 'Riya Das',     'riya@teamup.dev',   'backend',   array['GraphQL','Redis','Kafka'],         'intermediate', 'leader',      'available', 80);

insert into public.teams (name, required_roles, members, created_by)
values
  ('ByteBuilders',  '[{"role":"frontend","count":1},{"role":"backend","count":1},{"role":"AI","count":1}]', '{}', null),
  ('NeuralNinjas',  '[{"role":"frontend","count":1},{"role":"AI","count":2}]',                              '{}', null);
*/

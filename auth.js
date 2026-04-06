// auth.js — Signup & Login
// ----------------------------------------------------------

import { supabase } from './supabase.js'

// ── Sign Up ────────────────────────────────────────────────
// Creates a Supabase auth user AND a row in public.users
export async function signUp({ name, email, password, role, skills, experience, personality, github }) {
  // Step 1: create auth account
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })
  if (authError) return { error: authError.message }

  const userId = authData.user.id

  // Step 2: insert profile row
  const { data, error } = await supabase.from('users').insert({
    id: userId,
    name,
    email,
    role,
    skills:      skills || [],
    experience:  experience || 'beginner',
    personality: personality || 'contributor',
    availability:'available',
    github:      github || '',
    quiz_score:  0,
  }).select().single()

  if (error) return { error: error.message }
  return { user: data }
}

// ── Log In ─────────────────────────────────────────────────
export async function logIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  return { session: data.session, user: data.user }
}

// ── Log Out ────────────────────────────────────────────────
export async function logOut() {
  const { error } = await supabase.auth.signOut()
  return error ? { error: error.message } : { success: true }
}

// ── Get current user's profile ─────────────────────────────
export async function getMyProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  const { data, error } = await supabase.from('users').select('*').eq('id', user.id).single()
  return error ? { error: error.message } : { user: data }
}

// ── Update profile ─────────────────────────────────────────
export async function updateProfile(updates) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  const { data, error } = await supabase.from('users').update(updates).eq('id', user.id).select().single()
  return error ? { error: error.message } : { user: data }
}

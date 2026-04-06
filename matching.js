// matching.js — AI Skill Matching Score
// ----------------------------------------------------------

import { supabase } from './supabase.js'

// ── Scoring weights ────────────────────────────────────────
const WEIGHTS = {
  skills:      0.50,  // 50% — shared skills (core)
  experience:  0.30,  // 30% — level compatibility
  personality: 0.20,  // 20% — leader/contributor fit
}

const EXP_RANK = { beginner: 1, intermediate: 2, advanced: 3 }

// ── Calculate match score between two user objects ─────────
// currentUser and otherUser are plain JS objects from the DB
export function getMatchScore(currentUser, otherUser) {
  // --- Skills: Jaccard similarity ---
  const setA = new Set((currentUser.skills || []).map(s => s.toLowerCase()))
  const setB = new Set((otherUser.skills   || []).map(s => s.toLowerCase()))
  const common  = [...setA].filter(s => setB.has(s))
  const union   = new Set([...setA, ...setB])
  const skillScore = union.size === 0 ? 0 : common.length / union.size

  // --- Experience: penalise large gaps ---
  const diff = Math.abs(
    (EXP_RANK[currentUser.experience] || 1) - (EXP_RANK[otherUser.experience] || 1)
  )
  const expScore = Math.max(0, 1 - diff * 0.4)   // gap of 2 → 0.2

  // --- Personality: leader + contributor = perfect ---
  const personalityMap = {
    'leader-contributor':    1.0,
    'contributor-leader':    1.0,
    'leader-leader':         0.5,
    'contributor-contributor': 0.8,
  }
  const pKey = `${currentUser.personality}-${otherUser.personality}`
  const personalityScore = personalityMap[pKey] ?? 0.7

  // --- Weighted total ---
  const raw = (
    skillScore      * WEIGHTS.skills +
    expScore        * WEIGHTS.experience +
    personalityScore* WEIGHTS.personality
  )
  const score = Math.round(raw * 100)

  // --- Human-readable explanation ---
  const reasons = []
  if (common.length > 0)        reasons.push(`you both know ${common.slice(0,3).join(', ')}`)
  if (expScore >= 0.8)          reasons.push('similar experience levels')
  if (personalityScore >= 0.9)  reasons.push('complementary personalities')
  if (otherUser.quiz_score > 70) reasons.push('strong quiz performance')

  const explanation = reasons.length
    ? `Matched because ${reasons.join(', ')}.`
    : 'Some compatibility based on overall profile.'

  return { score, explanation, breakdown: {
    skillScore:      Math.round(skillScore * 100),
    experienceScore: Math.round(expScore * 100),
    personalityScore: Math.round(personalityScore * 100),
    commonSkills: common,
  }}
}

// ── Fetch all other users + calculate scores ───────────────
export async function getMatches() {
  // Get current session user
  const { data: { user: authUser } } = await supabase.auth.getUser()
  if (!authUser) return { error: 'Not logged in' }

  // Fetch own profile
  const { data: me } = await supabase.from('users').select('*').eq('id', authUser.id).single()

  // Fetch everyone else (same availability by default)
  const { data: others, error } = await supabase
    .from('users')
    .select('*')
    .neq('id', authUser.id)

  if (error) return { error: error.message }

  // Score and sort
  const scored = others.map(u => ({
    user: u,
    ...getMatchScore(me, u),
  })).sort((a, b) => b.score - a.score)

  return { matches: scored, currentUser: me }
}

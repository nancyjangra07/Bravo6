// teams.js — Team Builder, Suggestions, Success Prediction
// ----------------------------------------------------------

import { supabase } from './supabase.js'

// ── Create a team ──────────────────────────────────────────
// requiredRoles: [{ role: "frontend", count: 1 }, ...]
export async function createTeam(name, requiredRoles) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  const { data, error } = await supabase.from('teams').insert({
    name,
    required_roles: requiredRoles,
    members:        [user.id],        // creator is first member
    created_by:     user.id,
  }).select().single()

  if (error) return { error: error.message }

  // Detect missing roles right away
  const missing = getMissingRoles(data, [{ id: user.id }])
  return { team: data, missingRoles: missing }
}

// ── Detect which roles are still unfilled ─────────────────
// team.required_roles = [{ role, count }]
// members = array of user objects (with .role)
function getMissingRoles(team, members) {
  const filled = {}
  members.forEach(m => { filled[m.role] = (filled[m.role] || 0) + 1 })

  const missing = []
  ;(team.required_roles || []).forEach(({ role, count }) => {
    const have = filled[role] || 0
    if (have < count) missing.push({ role, needed: count - have })
  })
  return missing
}

// ── Suggest teams where the current user's role is needed ──
export async function getTeamSuggestions() {
  const { data: { user: authUser } } = await supabase.auth.getUser()
  if (!authUser) return { error: 'Not logged in' }

  const { data: me } = await supabase.from('users').select('*').eq('id', authUser.id).single()

  // Fetch all teams with populated members
  const { data: teams, error } = await supabase.from('teams').select('*')
  if (error) return { error: error.message }

  const suggestions = []

  for (const team of teams) {
    // Fetch member profiles
    const { data: memberProfiles } = await supabase
      .from('users')
      .select('id, role, skills, experience')
      .in('id', team.members || [])

    const missing = getMissingRoles(team, memberProfiles || [])
    const needsMyRole = missing.find(m => m.role === me.role)

    if (needsMyRole) {
      suggestions.push({
        team:       { id: team.id, name: team.name },
        missingRoles: missing,
        yourRole:   me.role,
        reason:     `${team.name} needs a ${me.role} — that's you!`,
      })
    }
  }

  return { suggestions }
}

// ── Team Success Prediction ────────────────────────────────
export async function getTeamScore(teamId) {
  // Fetch team
  const { data: team, error: tErr } = await supabase
    .from('teams').select('*').eq('id', teamId).single()
  if (tErr) return { error: tErr.message }

  // Fetch members
  const { data: members, error: mErr } = await supabase
    .from('users')
    .select('role, skills, experience, quiz_score')
    .in('id', team.members || [])
  if (mErr) return { error: mErr.message }

  if (!members.length) return { successScore: 0, explanation: 'No members yet.' }

  // Factor 1: Role completeness (0–100)
  const totalRequired = (team.required_roles || []).reduce((s, r) => s + r.count, 0)
  const missing       = getMissingRoles(team, members)
  const totalMissing  = missing.reduce((s, r) => s + r.needed, 0)
  const roleScore     = totalRequired > 0
    ? Math.round(((totalRequired - totalMissing) / totalRequired) * 100)
    : 100

  // Factor 2: Skill diversity — unique skills across team
  const allSkills   = new Set(members.flatMap(m => (m.skills || []).map(s => s.toLowerCase())))
  const diversityScore = Math.min(100, allSkills.size * 12)   // 8+ unique skills = 100%

  // Factor 3: Experience balance — punish extremes
  const expRank   = { beginner: 1, intermediate: 2, advanced: 3 }
  const expAvg    = members.reduce((s, m) => s + (expRank[m.experience] || 1), 0) / members.length
  const expScore  = expAvg >= 1.5 && expAvg <= 2.5 ? 100 : Math.max(0, 100 - Math.abs(expAvg - 2) * 40)

  // Factor 4: Avg quiz score
  const quizAvg = members.reduce((s, m) => s + (m.quiz_score || 0), 0) / members.length

  // Weighted total
  const successScore = Math.round(
    roleScore       * 0.35 +
    diversityScore  * 0.25 +
    expScore        * 0.20 +
    quizAvg         * 0.20
  )

  const parts = []
  if (roleScore === 100)  parts.push('all roles are filled')
  else                    parts.push(`${totalMissing} role(s) still missing`)
  parts.push(`${allSkills.size} unique skills in the team`)
  if (quizAvg >= 70)      parts.push('strong quiz scores')

  return {
    teamName: team.name,
    successScore,
    breakdown: { roleScore, diversityScore: Math.round(diversityScore), expScore: Math.round(expScore), quizAvg: Math.round(quizAvg) },
    explanation: `${successScore}% success probability — ${parts.join(', ')}.`,
  }
}

// ── Add a member to a team ─────────────────────────────────
export async function joinTeam(teamId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  // Use Postgres array append via RPC (or fetch + update)
  const { data: team } = await supabase.from('teams').select('members').eq('id', teamId).single()
  if ((team.members || []).includes(user.id)) return { error: 'Already a member' }

  const { data, error } = await supabase
    .from('teams')
    .update({ members: [...(team.members || []), user.id] })
    .eq('id', teamId)
    .select().single()

  return error ? { error: error.message } : { team: data }
}

// swipe.js — Swipe System + Auto Match on Mutual Like
// ----------------------------------------------------------

import { supabase } from './supabase.js'

// ── Swipe on another user ──────────────────────────────────
// action: 'like' | 'dislike'
export async function swipeUser(targetUserId, action) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  if (user.id === targetUserId) return { error: 'Cannot swipe on yourself' }

  // Upsert the swipe (replace if already swiped)
  const { error: swipeError } = await supabase.from('swipes').upsert({
    user1:   user.id,
    user2:   targetUserId,
    action,
  }, { onConflict: 'user1,user2' })

  if (swipeError) return { error: swipeError.message }

  let matched = false

  // If it's a like, check if the other person already liked us
  if (action === 'like') {
    const { data: theirLike } = await supabase
      .from('swipes')
      .select('id')
      .eq('user1', targetUserId)
      .eq('user2', user.id)
      .eq('action', 'like')
      .maybeSingle()

    if (theirLike) {
      // Mutual like — create a match (if not already exists)
      const { data: existing } = await supabase
        .from('matches')
        .select('id')
        .or(`and(user1.eq.${user.id},user2.eq.${targetUserId}),and(user1.eq.${targetUserId},user2.eq.${user.id})`)
        .maybeSingle()

      if (!existing) {
        await supabase.from('matches').insert({ user1: user.id, user2: targetUserId })
      }
      matched = true
    }
  }

  return {
    success: true,
    action,
    matched,
    message: matched
      ? "🎉 It's a match! You can now send each other a message."
      : action === 'like' ? 'Liked! Waiting to see if they like you back.' : 'Passed.',
  }
}

// ── Get all mutual matches for the current user ────────────
export async function getMyMatches() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  const { data, error } = await supabase
    .from('matches')
    .select('id, user1, user2, created_at')
    .or(`user1.eq.${user.id},user2.eq.${user.id}`)
    .order('created_at', { ascending: false })

  if (error) return { error: error.message }

  // Fetch the other user's profile for each match
  const enriched = await Promise.all(data.map(async match => {
    const otherId = match.user1 === user.id ? match.user2 : match.user1
    const { data: other } = await supabase
      .from('users').select('id, name, role, skills, github').eq('id', otherId).single()
    return { matchId: match.id, matchedAt: match.created_at, matchedWith: other }
  }))

  return { matches: enriched }
}

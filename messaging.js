// messages.js — One Message Per Matched Pair
// ----------------------------------------------------------
// Rules enforced:
//   1. Sender and receiver must be mutually matched.
//   2. Only ONE message can exist between any two users (either direction).
//   3. Attempting a second message returns a clear error.
// ----------------------------------------------------------

import { supabase } from './supabase.js'

// ── Send a message ─────────────────────────────────────────
export async function sendMessage(receiverId, message) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  const senderId = user.id

  if (senderId === receiverId) return { error: 'Cannot message yourself' }

  // 1. Verify the two users are matched
  const { data: match } = await supabase
    .from('matches')
    .select('id')
    .or(`and(user1.eq.${senderId},user2.eq.${receiverId}),and(user1.eq.${receiverId},user2.eq.${senderId})`)
    .maybeSingle()

  if (!match) return { error: 'You can only message users you have matched with.' }

  // 2. Check if any message already exists between these two users (either direction)
  const { data: existing } = await supabase
    .from('messages')
    .select('id')
    .or(
      `and(sender.eq.${senderId},receiver.eq.${receiverId}),` +
      `and(sender.eq.${receiverId},receiver.eq.${senderId})`
    )
    .maybeSingle()

  if (existing) {
    return { error: 'A message already exists between you two. Only one message per match is allowed.' }
  }

  // 3. Insert the message
  const { data, error } = await supabase.from('messages').insert({
    sender:   senderId,
    receiver: receiverId,
    message,
  }).select().single()

  if (error) return { error: error.message }
  return { success: true, message: data }
}

// ── Get the message thread between current user and another ─
export async function getMessage(otherUserId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  const { data, error } = await supabase
    .from('messages')
    .select('id, sender, receiver, message, created_at')
    .or(
      `and(sender.eq.${user.id},receiver.eq.${otherUserId}),` +
      `and(sender.eq.${otherUserId},receiver.eq.${user.id})`
    )
    .maybeSingle()

  if (error) return { error: error.message }
  return { message: data || null }
}

// ── Get all messages for the current user ─────────────────
export async function getAllMyMessages() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  const { data, error } = await supabase
    .from('messages')
    .select('id, sender, receiver, message, created_at')
    .or(`sender.eq.${user.id},receiver.eq.${user.id}`)
    .order('created_at', { ascending: false })

  if (error) return { error: error.message }
  return { messages: data }
}

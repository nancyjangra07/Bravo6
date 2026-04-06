// quiz.js — Mini Skill Test
// ----------------------------------------------------------

import { supabase } from './supabase.js'

// ── Get quiz questions for a skill ─────────────────────────
// Returns questions WITHOUT the answer field (fair play!)
export async function getQuiz(skill) {
  const { data, error } = await supabase
    .from('quizzes')
    .select('id, skill, question, options')   // no 'answer'
    .eq('skill', skill.toLowerCase())

  if (error) return { error: error.message }
  if (!data.length) return { error: `No quiz found for "${skill}"` }

  return { skill, questions: data }
}

// ── Submit answers and update quiz_score on the user ───────
// answers: [{ questionId: 'uuid', answer: 'useState' }, ...]
export async function submitQuiz(skill, answers) {
  const { data: { user: authUser } } = await supabase.auth.getUser()
  if (!authUser) return { error: 'Not logged in' }

  // Fetch correct answers for these questions
  const questionIds = answers.map(a => a.questionId)
  const { data: questions, error } = await supabase
    .from('quizzes')
    .select('id, answer')
    .in('id', questionIds)

  if (error) return { error: error.message }

  // Score
  let correct = 0
  questions.forEach(q => {
    const submitted = answers.find(a => a.questionId === q.id)
    if (submitted && submitted.answer.toLowerCase() === q.answer.toLowerCase()) correct++
  })

  const score   = Math.round((correct / questions.length) * 100)
  const passed  = score >= 70

  // Update quiz_score on user — only if new score is better
  const { data: me } = await supabase.from('users').select('quiz_score').eq('id', authUser.id).single()
  if (score > (me?.quiz_score || 0)) {
    await supabase.from('users').update({ quiz_score: score }).eq('id', authUser.id)
  }

  return {
    skill,
    score,
    correct,
    total:   questions.length,
    passed,
    message: passed
      ? `You scored ${score}% — passed! ✅`
      : `You scored ${score}%. Need 70% to pass. Try again!`,
  }
}

import express from 'express'
import { supabase } from '../db.js'

const router = express.Router()

// GET teams
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('teams').select('*')
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// POST create team
router.post('/', async (req, res) => {
  const { data, error } = await supabase
    .from('teams')
    .insert(req.body)
    .select()
    .single()

  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
})

// GET team by id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error) return res.status(404).json({ error: error.message })
  res.json(data)
})

export default router

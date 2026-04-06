import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'Swipes working' })
})

export default router


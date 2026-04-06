import express from 'express'
import cors from 'cors'

import usersRoutes from '../routes/users.js'
import teamsRoutes from './routes/teams.js'
import swipesRoutes from '../routes/swipes.js'
import matchesRoutes from './routes/matches.js'
import quizzesRoutes from './routes/quizzes.js'
import messagesRoutes from './routes/messages.js'
import matchingRoutes from './routes/matching.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRoutes)
app.use('/api/teams', teamsRoutes)
app.use('/api/swipes', swipesRoutes)
app.use('/api/matches', matchesRoutes)
app.use('/api/quizzes', quizzesRoutes)
app.use('/api/messages', messagesRoutes)
app.use('/api/matching', matchingRoutes)

app.get('/api/healthz', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

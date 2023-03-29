import { join } from 'node:path'
import express from 'express'
import budgets from './routes/budgets'
import spendings from './routes/spending'


const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))
server.use('/api/v1/budgets', budgets)
server.use('/api/v1/spendings', spendings)

// server.use(checkJwt)

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, './public/index.html'))
})

export default server

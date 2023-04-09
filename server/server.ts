import { join } from 'node:path'
import express from 'express'
import budgets from './routes/budgets'
import expenses from './routes/expenses'


const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))
server.use('/api/v1/budgets', budgets)
server.use('/api/v1/expenses', expenses)

// server.use(checkJwt)

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, './public/index.html'))
})

export default server

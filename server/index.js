import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

let todos = [
  { id: 1, title: 'Learn React', completed: false, createdAt: new Date().toISOString() },
  { id: 2, title: 'Build a fullstack app', completed: false, createdAt: new Date().toISOString() },
]

let nextId = 3

app.use(cors())
app.use(express.json())

app.get('/api/todos', (_req, res) => {
  res.json(todos)
})

app.post('/api/todos', (req, res) => {
  const { title } = req.body
  if (!title) {
    return res.status(400).json({ error: 'Title is required' })
  }
  const todo = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString()
  }
  todos.push(todo)
  res.json(todo)
})

app.patch('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { completed } = req.body
  const todo = todos.find(t => t.id === id)
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' })
  }
  todo.completed = completed
  res.json(todo)
})

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = todos.findIndex(t => t.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' })
  }
  todos.splice(index, 1)
  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
import express from 'express'
import cors from 'cors'
import './loadEnvironment.js'
import 'express-async-errors'
import todos from './routes/todos.js'

const PORT = process.env.PORT || 5050
const app = express()

app.use(cors())
app.use(express.json())

app.use('/todos', todos)

app.use((err, _req, res, next) => {
  res.status(500).send('Uh oh! An unexpected error occurred.')
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

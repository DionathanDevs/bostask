import express from 'express'
import { catError } from './middleware/error.middleware.ts'
import taskRoutes from './api/task/task.route.ts'
export const app = express()

app.use(express.json()) 

app.use('/task', taskRoutes)

app.use(catError)
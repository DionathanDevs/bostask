import { Router } from 'express'
import { getAllTasks, updateOneTask, getTaskById, insertNewTask } from './task.controller.ts'

const route: Router = Router()

route.get('/', getAllTasks)
route.patch('/:id', updateOneTask)
route.get('/:id', getTaskById)
route.post('/', insertNewTask)

export default route;
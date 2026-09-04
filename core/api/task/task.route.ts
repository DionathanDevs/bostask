import { Router } from 'express'
import { getAllTasks, updateOneTask, getTaskById } from './task.controller.ts'

const route: Router = Router()

route.get('/', getAllTasks)
route.patch('/:id', updateOneTask)
route.get('/:id', getTaskById)

export default route;
import { Router } from 'express'
import { getAllTasks, updateOneTask, getTaskById, insertNewTask, deleteOneTask } from './task.controller.ts'

const route: Router = Router()

route.get('/', getAllTasks)
route.patch('/:id', updateOneTask)
route.get('/:id', getTaskById)
route.post('/', insertNewTask)
route.delete('/:id', deleteOneTask )

export default route;
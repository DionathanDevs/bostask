import { Router } from 'express'
import { getAllTasks } from './task.controller.ts'

const route: Router = Router()

route.get('/', getAllTasks)

export default route;
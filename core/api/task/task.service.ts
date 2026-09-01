import { getTasksRepository } from './task.repository.ts'

export const getTasks = async () => {

const result = await getTasksRepository()

}
import { getTasksRepository, updateTasksRepository } from './task.repository.ts'
import { buildDynamicUpdate } from '../../database/builders/update.builder.ts'
import { Task , UpdateTaskDTO} from './task.class.ts'


export const getTasks = async () => {

const result = await getTasksRepository()

return result;

}

export const updateTask = async (values: UpdateTaskDTO, id: Number) => {

const taskSafeForUpdate = Task.createUpdateContract(values);

const result = await updateTasksRepository(taskSafeForUpdate, id)


}
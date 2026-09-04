import { getTasksRepository, updateTasksRepository, findTaskByIdRepository, insertTaskRepository } from './task.repository.ts'
import { buildDynamicUpdate } from '../../database/builders/update.builder.ts'
import { Task, type UpdateTaskDTO } from './task.class.ts'
import { TAG , STATUS } from '../../util/const.ts'



export const getTasks = async () => {

    const result = await getTasksRepository()

    return result;

}

export const updateTask = async (values: UpdateTaskDTO, id: Number): Promise<Boolean> => {

    const taskSafeForUpdate = Task.createUpdateContract(values);

    const result = await updateTasksRepository(taskSafeForUpdate, id)

    if (result === null) {
        return false;
    }

    if (result.affectedRows > 0) {
        return true;
    }

    return false;

}

export const findTaskById = async (id: number): Promise<Task | null> => {

    return await findTaskByIdRepository(id);

}

export const insertTask = async (title: string, description: string, tag: string, status: string): Promise< Boolean > => {

    if (!title || !tag || !description || !status) {
        throw new Error('Dados obrigatorios ( title, description, tag, status ) faltando')
    }

    const titleParsed = String(title).trim()
    let tagParsed: number = 1
    tagParsed = resolveToTag(tag)
    const descriptionParsed = String(description).trim()
    let statusParsed: number = 1
    statusParsed = resolveToStatus(status)

    const taskFormat = new Task(titleParsed, descriptionParsed, statusParsed, tagParsed)

    const createTask = await insertTaskRepository(taskFormat)

    if(createTask.affectedRows > 0){
        return true;
    }

    return false;
}


const resolveToTag = (tag: string) : number => {

  if (tag == "work") {

    return Number(TAG.work)

    }

    if(tag == "study"){

    return Number(TAG.study)
    }

    return 1

}

const resolveToStatus = (status: string): number => {

    if (status == "new") return Number(STATUS.completed)

    if(status == "pending") return Number(STATUS.completed)

    if(status == "completed") return Number(STATUS.completed)

    return 1

}
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { buildDynamicUpdate } from '../../database/builders/update.builder.ts'
import { UpdateTaskDTO } from '../task/task.class.ts'
import { conn } from '../../database/conn.ts'

interface Task extends RowDataPacket {
    id?: number,
    title: string,
    description: string,
    status: number,
    tag: number
}



export const getTasksRepository = async (): Promise<Task[]> => {

    const connection = conn;

    const sql = 'select id, title, description, status, tag from tasks';

    const [rows] = await connection.execute<Task[]>(sql);

    return rows;

}

export const updateTasksRepository = async (params: UpdateTaskDTO, id: Number): Promise<ResultSetHeader | null>  => {

    const dinamicQuery = buildDynamicUpdate(params);

    if (!dinamicQuery) return null;

    const { setClauses, values } = dinamicQuery;

    const connection = conn;

    const sql = `update tasks set ${setClauses} where id = ?`;

    const [rows] = await connection.execute(sql, [...values, id],);

    return rows as ResultSetHeader;

}

export const findTaskByIdRepository = async (id: number): Promise<Task | null> => {

const idParam = id;

const sql = 'select * from tasks where id = ?';

const connection = conn

const [rows] = await connection.execute(sql, [idParam]);

const tasks = rows as Task[]

return tasks.length > 0 ? tasks[0] : null
}

export const insertTaskRepository = async (task: Task): Promise<Task | null> => {
   
    
const sql = 'INSERT INTO tasks (title, description, status, tag) VALUES (?, ?, ? ,?)'

const connection = conn

const [rows] = await connection.execute(sql, [task.title, task.description, task.status, task.status])
    
const taskCreate = rows as Task[];

return taskCreate.length > 0 ? taskCreate[0] : null

}
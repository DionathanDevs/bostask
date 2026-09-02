import type { RowDataPacket } from 'mysql2/promise';
import { buildDynamicUpdate } from '../../database/builders/update.builder.ts'
import { UpdateTaskDTO } from '../task/task.class.ts'
import { conn } from '../../database/conn.ts'

interface Task extends RowDataPacket {
    id: number,
    title: string,
    description: string,
    status: string,
    tag: string
}



export const getTasksRepository = async (): Promise<Task[]> => {

    const connection = conn;

    const sql = 'select t.id, t.title, t.description, ts.name as description_satus, tt.name as description_tag from tasks t inner join tasks_status ts on t.status = ts.id inner join tasks_tags tt on t.tag = tt.id';

    const [rows] = await connection.execute<Task[]>(sql);

    return rows;

}

export const updateTasksRepository = async (params: UpdateTaskDTO, id: Number) => {

    const dinamicQuery = buildDynamicUpdate(params)

    if (!dinamicQuery) return null;


    const { setClauses, values } = dinamicQuery


    const connection = conn;

    const sql = `update tasks set ${setClauses} where id = ?`

    const [rows] = await connection.execute(sql, values)

    return rows
}
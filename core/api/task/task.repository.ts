import type {  RowDataPacket } from 'mysql2/promise';
import { conn } from '../../database/conn.ts'

interface Task extends RowDataPacket{
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
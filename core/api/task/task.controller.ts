import { type Request, type Response, type NextFunction } from "express";
import { getTasks, updateTask, findTaskById } from './task.service.ts'

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const tasks = await getTasks()

        return res.status(200).json({
            success: true,
            tasks: tasks
        })

    } catch (err) {
        next(err)
    }


}

export const updateOneTask = async (req: Request, res: Response, next: NextFunction) => {

    const { task, id } = req.body;

    try {

        const findTask = await findTaskById(id);

        if (!findTask) {
            throw new Error('Tarefa informada nao existe.');
        }
        const update = await updateTask(task, id);

        if (!update) {
            return res.status(200).json({
                success: true,
                message: 'Dados atualizados com sucesso!'
            });
        }

        throw new Error('Erro ao atualizar os dados');

    } catch (err) {
        next(err);
    }
}
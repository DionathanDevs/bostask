import { NextFunction } from "express";
import { getTasks } from './task.service.ts'

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {

try{

const tasks = await getTasks()    

return res.status(200).json({
    success: true,
    tasks: tasks
})

}catch(err){
    next(err)
}


}



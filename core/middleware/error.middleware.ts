import { type Request, type Response, type NextFunction } from 'express'
import AppError from '../util/app.error.ts';

type ErrorsApp = AppError | Error

export const catError = (err: ErrorsApp, req: Request, res: Response, next: NextFunction) => {

    console.log(err)

    if (err instanceof AppError) {
        return res.status(err.status).json({
            success: false,
            error: err.message
        })
    }

    return res.status(500).json({
        success: false,
        error: 'Ocorreu um erro interno ao se conectar com o servidor.'
    })

}
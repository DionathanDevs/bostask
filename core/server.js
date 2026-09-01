import { app } from './app.ts'

const application = app
application.listen(3000, () =>{
    console.log('Porta rodando no localhost:3000')
})
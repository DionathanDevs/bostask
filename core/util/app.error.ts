class AppError extends Error {

    status: number;
    name: string;

    constructor(status: number, message: string){
    
    super(message)
    this.status =  status;
    this.name = 'AppError';

    }
    

}

export default AppError;

export interface UpdateTaskDTO {
    title?: string;
    description?: string;
    status?: number;
    tag?: number;
}

export class Task {

    title: string;
    description: string;
    status: number;
    tag: number;

    constructor(title: string, description: string, status: number, tag: number){
        this.title = title;
        this.description = description;
        this.status = status;
        this.tag = tag;
    }

    static createUpdateContract(data: any): UpdateTaskDTO {
        
        const safeUpdate: UpdateTaskDTO = {}

        if(data.title != undefined) safeUpdate.title = data.title;
        if(data.description != undefined) safeUpdate.description = data.description;
        if(data.status != undefined) safeUpdate.status = data.status;
        if(data.tag != undefined) safeUpdate.tag = data.tag;
        
        return safeUpdate;
    }
}

 
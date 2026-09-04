// ── API response shapes ───────────────────────────────────
// Matches exactly what the backend returns from the DB

export interface ApiTask {
  id: number;
  title: string;
  description: string;
  status: number; // 1=new | 2=pending | 3=completed
  tag: number;    // 1=work | 2=study
}

export interface GetAllTasksResponse {
  success: boolean;
  tasks: ApiTask[];
}

export interface GetTaskByIdResponse {
  success: boolean;
  task: ApiTask;
}

export interface MutationResponse {
  success: boolean;
  message: string;
}

// ── Payload for POST /task ────────────────────────────────
export interface InsertTaskPayload {
  title: string;
  description: string;
  status: string; // 'new' | 'pending' | 'completed'
  tag: string;    // 'work' | 'study'
}

// ── Payload for PATCH /task/:id ───────────────────────────
export interface UpdateTaskPayload {
  task: {
    title?: string;
    description?: string;
    status?: number;
    tag?: number;
  };
  id: number;
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GetAllTasksResponse,
  GetTaskByIdResponse,
  MutationResponse,
  InsertTaskPayload,
  UpdateTaskPayload,
} from '../models/api.model';

// All calls go through Angular's dev proxy (proxy.conf.json)
// /api → http://localhost:3000
const BASE = '/api/task';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  // GET /task
  getAllTasks(): Observable<GetAllTasksResponse> {
    return this.http.get<GetAllTasksResponse>(BASE);
  }

  // GET /task/:id
  getTaskById(id: number): Observable<GetTaskByIdResponse> {
    return this.http.get<GetTaskByIdResponse>(`${BASE}/${id}`);
  }

  // POST /task
  insertTask(payload: InsertTaskPayload): Observable<MutationResponse> {
    return this.http.post<MutationResponse>(BASE, payload);
  }

  // PATCH /task/:id  — body: { task: {...}, id: number }
  updateTask(id: number, payload: UpdateTaskPayload): Observable<MutationResponse> {
    return this.http.patch<MutationResponse>(`${BASE}/${id}`, payload);
  }
}

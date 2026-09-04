import { Injectable, signal, computed, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  Task, TagId, ColumnId, Priority,
  STATUS_TO_COLUMN, COLUMN_TO_STATUS, COLUMN_TO_STATUS_STR, TAG_NUM_TO_ID, TAG_ID_TO_NUM,
} from '../models/task.model';
import { ApiService } from './api.service';
import { ApiTask } from '../models/api.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = inject(ApiService);

  // ── State ──────────────────────────────────────────────
  private _tasks = signal<Task[]>([]);
  readonly loading  = signal(false);
  readonly error    = signal<string | null>(null);

  // ── Public read ────────────────────────────────────────
  readonly tasks = this._tasks.asReadonly();

  readonly tasksByColumn = computed(() => {
    const t = this._tasks();
    return {
      todo:       t.filter(task => task.column === 'todo'),
      inprogress: t.filter(task => task.column === 'inprogress'),
      done:       t.filter(task => task.column === 'done'),
    };
  });

  // ── Load all tasks ─────────────────────────────────────
  async loadTasks(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const res = await firstValueFrom(this.api.getAllTasks());
      if (res.success) {
        this._tasks.set(res.tasks.map(t => this.mapFromApi(t)));
      }
    } catch (err) {
      this.error.set('Failed to load tasks. Is the backend running?');
      console.error('[TaskService] loadTasks:', err);
    } finally {
      this.loading.set(false);
    }
  }

  // ── Add task ───────────────────────────────────────────
  async addTask(data: Omit<Task, 'id' | 'createdAt'>): Promise<void> {
    this.loading.set(true);
    try {
      await firstValueFrom(this.api.insertTask({
        title:       data.title,
        description: data.description ?? '',
        status:      COLUMN_TO_STATUS_STR[data.column],
        tag:         data.tag === 'all' ? 'work' : data.tag,
      }));
      // Refresh list from server to get the real DB id
      await this.loadTasks();
    } catch (err) {
      this.error.set('Failed to create task.');
      console.error('[TaskService] addTask:', err);
      this.loading.set(false);
    }
  }

  // ── Update task ────────────────────────────────────────
  async updateTask(id: number, changes: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<void> {
    // Optimistic update
    this._tasks.update(tasks =>
      tasks.map(t => (t.id === id ? { ...t, ...changes } : t))
    );

    try {
      const payload: Record<string, unknown> = {};
      if (changes.title       !== undefined) payload['title']       = changes.title;
      if (changes.description !== undefined) payload['description'] = changes.description;
      if (changes.column      !== undefined) payload['status']      = COLUMN_TO_STATUS[changes.column];
      if (changes.tag         !== undefined) payload['tag']         = TAG_ID_TO_NUM[changes.tag] ?? 1;

      await firstValueFrom(this.api.updateTask(id, { task: payload, id }));
    } catch (err) {
      this.error.set('Failed to update task.');
      console.error('[TaskService] updateTask:', err);
      // Rollback — re-fetch from server
      await this.loadTasks();
    }
  }

  // ── Delete task (local-only — no DELETE route in backend yet) ─
  deleteTask(id: number): void {
    this._tasks.update(tasks => tasks.filter(t => t.id !== id));
  }

  // ── Move task (column change → PATCH status) ───────────
  async moveTask(id: number, newColumn: ColumnId): Promise<void> {
    await this.updateTask(id, { column: newColumn });
  }

  // ── Reorder within column (local-only) ─────────────────
  reorderColumn(column: ColumnId, orderedIds: number[]): void {
    this._tasks.update(tasks => {
      const others    = tasks.filter(t => t.column !== column);
      const reordered = orderedIds
        .map(id => tasks.find(t => t.id === id))
        .filter((t): t is Task => t !== undefined);
      return [...others, ...reordered];
    });
  }

  // ── Mapping: ApiTask → Task ────────────────────────────
  private mapFromApi(apiTask: ApiTask): Task {
    return {
      id:          apiTask.id,
      title:       apiTask.title,
      description: apiTask.description || undefined,
      tag:         TAG_NUM_TO_ID[apiTask.tag] ?? 'other',
      column:      STATUS_TO_COLUMN[apiTask.status] ?? 'todo',
      priority:    'medium',   // backend has no priority field yet
      createdAt:   new Date().toISOString(),
    };
  }
}

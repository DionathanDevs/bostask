import { Injectable, signal, computed } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Task, TagId, ColumnId, Priority } from '../models/task.model';

const STORAGE_KEY = 'bostask_tasks';

// ── Seed data ─────────────────────────────────────────────
const SEED_TASKS: Task[] = [
  {
    id: uuidv4(),
    title: 'Read Clean Code',
    description: 'Chapters 1–5 before next week.',
    tag: 'study',
    column: 'todo',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Finish project report',
    description: 'Include the Q3 metrics in the executive summary.',
    tag: 'work',
    column: 'inprogress',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Morning run',
    description: '5 km before 7 AM.',
    tag: 'health',
    column: 'todo',
    priority: 'low',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Angular signals deep dive',
    description: 'Watch the official Angular devs talk on YouTube.',
    tag: 'study',
    column: 'done',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Update portfolio site',
    description: 'Add the Bostask project with screenshots.',
    tag: 'personal',
    column: 'todo',
    priority: 'low',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Weekly team sync',
    description: 'Prepare agenda and action items.',
    tag: 'work',
    column: 'done',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
];

@Injectable({ providedIn: 'root' })
export class TaskService {
  // ── State ──────────────────────────────────────────────
  private _tasks = signal<Task[]>(this.loadFromStorage());

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

  // ── CRUD ───────────────────────────────────────────────
  addTask(data: Omit<Task, 'id' | 'createdAt'>): void {
    const task: Task = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    this._tasks.update(tasks => [...tasks, task]);
    this.saveToStorage();
  }

  updateTask(id: string, changes: Partial<Omit<Task, 'id' | 'createdAt'>>): void {
    this._tasks.update(tasks =>
      tasks.map(t => (t.id === id ? { ...t, ...changes } : t))
    );
    this.saveToStorage();
  }

  deleteTask(id: string): void {
    this._tasks.update(tasks => tasks.filter(t => t.id !== id));
    this.saveToStorage();
  }

  moveTask(id: string, newColumn: ColumnId): void {
    this.updateTask(id, { column: newColumn });
  }

  reorderColumn(column: ColumnId, orderedIds: string[]): void {
    this._tasks.update(tasks => {
      const others = tasks.filter(t => t.column !== column);
      const reordered = orderedIds
        .map(id => tasks.find(t => t.id === id))
        .filter((t): t is Task => t !== undefined);
      return [...others, ...reordered];
    });
    this.saveToStorage();
  }

  filterByTag(tag: TagId): Task[] {
    if (tag === 'all') return this._tasks();
    return this._tasks().filter(t => t.tag === tag);
  }

  // ── Persistence ────────────────────────────────────────
  private loadFromStorage(): Task[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Task[];
    } catch {
      // ignore parse errors
    }
    // First run: seed with demo data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TASKS));
    return SEED_TASKS;
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tasks()));
  }
}

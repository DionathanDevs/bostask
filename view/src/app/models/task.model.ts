// ── Tag ──────────────────────────────────────────────────
export type TagId = 'all' | 'study' | 'work' | 'personal' | 'health' | 'other';

export interface Tag {
  id: TagId;
  label: string;
  icon: string; // emoji or lucide icon name
}

export const TAGS: Tag[] = [
  { id: 'all',      label: 'All',      icon: '◈' },
  { id: 'study',    label: 'Study',    icon: '◉' },
  { id: 'work',     label: 'Work',     icon: '◆' },
  { id: 'personal', label: 'Personal', icon: '◇' },
  { id: 'health',   label: 'Health',   icon: '○' },
  { id: 'other',    label: 'Other',    icon: '◌' },
];

// ── Column ────────────────────────────────────────────────
export type ColumnId = 'todo' | 'inprogress' | 'done';

export interface Column {
  id: ColumnId;
  label: string;
}

export const COLUMNS: Column[] = [
  { id: 'todo',       label: 'To Do'       },
  { id: 'inprogress', label: 'In Progress' },
  { id: 'done',       label: 'Done'        },
];

// ── Priority ──────────────────────────────────────────────
export type Priority = 'low' | 'medium' | 'high';

// ── Task ──────────────────────────────────────────────────
export interface Task {
  id: string;
  title: string;
  description?: string;
  tag: TagId;
  column: ColumnId;
  priority: Priority;
  createdAt: string; // ISO string
}

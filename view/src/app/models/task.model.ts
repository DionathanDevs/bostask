// ── Tag ──────────────────────────────────────────────────
export type TagId = 'all' | 'study' | 'work' | 'personal' | 'health' | 'other';

export interface Tag {
  id: TagId;
  label: string;
  icon: string;
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

// ── Task (frontend domain model) ─────────────────────────
export interface Task {
  id: number;          // numeric — matches DB id
  title: string;
  description?: string;
  tag: TagId;
  column: ColumnId;
  priority: Priority;
  createdAt: string;
}

// ── Mapping helpers ───────────────────────────────────────
// Backend status (number) ↔ Frontend ColumnId
export const STATUS_TO_COLUMN: Record<number, ColumnId> = {
  1: 'todo',
  2: 'inprogress',
  3: 'done',
};

export const COLUMN_TO_STATUS: Record<ColumnId, number> = {
  todo:       1,
  inprogress: 2,
  done:       3,
};

// Backend status string names (for POST body)
export const COLUMN_TO_STATUS_STR: Record<ColumnId, string> = {
  todo:       'new',
  inprogress: 'pending',
  done:       'completed',
};

// Backend tag (number) ↔ Frontend TagId
export const TAG_NUM_TO_ID: Record<number, TagId> = {
  1: 'work',
  2: 'study',
};

export const TAG_ID_TO_NUM: Record<string, number> = {
  work:  1,
  study: 2,
  // anything else defaults to 1 (work) — backend only has 1 and 2
  personal: 1,
  health:   1,
  other:    1,
};

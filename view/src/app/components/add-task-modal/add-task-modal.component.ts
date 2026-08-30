import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TAGS, COLUMNS, TagId, ColumnId, Priority } from '../../models/task.model';

@Component({
  selector: 'bsk-add-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss',
})
export class AddTaskModalComponent {
  @Output() close = new EventEmitter<void>();

  private taskService = inject(TaskService);

  readonly tags    = TAGS.filter(t => t.id !== 'all');
  readonly columns = COLUMNS;

  // ── Form state ────────────────────────────────────────
  title       = '';
  description = '';
  tag: TagId       = 'work';
  column: ColumnId = 'todo';
  priority: Priority = 'medium';

  readonly priorities: { value: Priority; label: string }[] = [
    { value: 'low',    label: '▸ Low'    },
    { value: 'medium', label: '▸▸ Medium' },
    { value: 'high',   label: '▸▸▸ High'  },
  ];

  onSubmit(): void {
    if (!this.title.trim()) return;
    this.taskService.addTask({
      title:       this.title.trim(),
      description: this.description.trim() || undefined,
      tag:         this.tag,
      column:      this.column,
      priority:    this.priority,
    });
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.close.emit();
  }
}

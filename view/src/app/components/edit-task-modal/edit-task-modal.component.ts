import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task, TAGS, COLUMNS, TagId, ColumnId, Priority } from '../../models/task.model';

@Component({
  selector: 'bsk-edit-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss',
})
export class EditTaskModalComponent implements OnInit {
  @Input({ required: true }) task!: Task;
  @Output() close = new EventEmitter<void>();

  private taskService = inject(TaskService);

  readonly tags    = TAGS.filter(t => t.id !== 'all');
  readonly columns = COLUMNS;

  title       = '';
  description = '';
  tag!: TagId;
  column!: ColumnId;
  priority!: Priority;

  readonly priorities: { value: Priority; label: string }[] = [
    { value: 'low',    label: '▸ Low'    },
    { value: 'medium', label: '▸▸ Medium' },
    { value: 'high',   label: '▸▸▸ High'  },
  ];

  ngOnInit(): void {
    this.title       = this.task.title;
    this.description = this.task.description ?? '';
    this.tag         = this.task.tag;
    this.column      = this.task.column;
    this.priority    = this.task.priority;
  }

  onSubmit(): void {
    if (!this.title.trim()) return;
    this.taskService.updateTask(this.task.id, {
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

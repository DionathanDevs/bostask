import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, Priority, TAGS } from '../../models/task.model';

@Component({
  selector: 'bsk-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() editTask   = new EventEmitter<Task>();

  get tagLabel(): string {
    return TAGS.find(t => t.id === this.task.tag)?.label ?? this.task.tag;
  }

  get tagIcon(): string {
    return TAGS.find(t => t.id === this.task.tag)?.icon ?? '◌';
  }

  get priorityLabel(): string {
    const map: Record<Priority, string> = {
      low:    '▸ Low',
      medium: '▸▸ Medium',
      high:   '▸▸▸ High',
    };
    return map[this.task.priority];
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteTask.emit(this.task.id);
  }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.editTask.emit(this.task);
  }
}

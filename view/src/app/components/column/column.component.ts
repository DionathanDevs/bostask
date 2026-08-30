import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop, CdkDropList, CdkDrag, CdkDragPlaceholder,
  moveItemInArray, transferArrayItem
} from '@angular/cdk/drag-drop';
import { Task, ColumnId, TagId, COLUMNS } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { FilterByTagPipe } from '../../pipes/filter-by-tag.pipe';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'bsk-column',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    TaskCardComponent,
    FilterByTagPipe,
    EditTaskModalComponent,
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  @Input({ required: true }) columnId!: ColumnId;
  @Input({ required: true }) tasks!: Task[];
  @Input({ required: true }) activeTag!: TagId;
  @Input({ required: true }) connectedTo!: string[];
  @Output() taskDropped = new EventEmitter<CdkDragDrop<Task[]>>();

  private taskService = inject(TaskService);

  editingTask: Task | null = null;

  get label(): string {
    return COLUMNS.find(c => c.id === this.columnId)?.label ?? this.columnId;
  }

  get filteredTasks(): Task[] {
    if (this.activeTag === 'all') return this.tasks;
    return this.tasks.filter(t => t.tag === this.activeTag);
  }

  get taskCount(): number {
    return this.filteredTasks.length;
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    this.taskDropped.emit(event);
  }

  onDeleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

  onEditTask(task: Task): void {
    this.editingTask = task;
  }

  closeEdit(): void {
    this.editingTask = null;
  }
}

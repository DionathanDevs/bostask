import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task, ColumnId, TagId, COLUMNS } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'bsk-board',
  standalone: true,
  imports: [CommonModule, ColumnComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  @Input({ required: true }) activeTag!: TagId;

  protected taskService = inject(TaskService);

  readonly columnIds: ColumnId[] = ['todo', 'inprogress', 'done'];
  // Connected IDs for CDK (all columns can receive cards from each other)
  readonly connectedTo = this.columnIds;

  get tasksByColumn() {
    return this.taskService.tasksByColumn();
  }

  onDrop(event: CdkDragDrop<Task[]>, targetColumn: ColumnId): void {
    const task: Task = event.item.data;

    if (event.previousContainer === event.container) {
      // Same column — reorder
      const column = [...event.container.data];
      moveItemInArray(column, event.previousIndex, event.currentIndex);
      this.taskService.reorderColumn(targetColumn, column.map(t => t.id));
    } else {
      // Different column — move
      this.taskService.moveTask(task.id, targetColumn);
    }
  }
}

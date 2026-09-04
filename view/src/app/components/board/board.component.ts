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

  onWheel(event: WheelEvent): void {
    if (event.shiftKey) return;

    // Check if the wheel event occurred over a column body that has scrollable content
    const target = event.target as HTMLElement | null;
    const columnBody = target?.closest('.column__body') as HTMLElement | null;

    if (columnBody) {
      const hasOverflow = columnBody.scrollHeight > columnBody.clientHeight;
      if (hasOverflow) {
        const canScrollUp = event.deltaY < 0 && columnBody.scrollTop > 0;
        const canScrollDown =
          event.deltaY > 0 &&
          Math.ceil(columnBody.scrollTop + columnBody.clientHeight) < columnBody.scrollHeight;
        if (canScrollUp || canScrollDown) {
          // Allow natural vertical scroll inside the column body
          return;
        }
      }
    }

    // Otherwise, translate vertical wheel scroll to horizontal board scroll
    if (event.deltaY !== 0) {
      const board = event.currentTarget as HTMLElement;
      board.scrollLeft += event.deltaY;
    }
  }
}

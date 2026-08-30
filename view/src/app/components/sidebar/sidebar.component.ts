import { Component, signal, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag, TAGS, TagId } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'bsk-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected taskService = inject(TaskService);

  @Output() tagSelected = new EventEmitter<TagId>();

  readonly tags: Tag[] = TAGS;
  readonly activeTag = signal<TagId>('all');

  selectTag(tagId: TagId): void {
    this.activeTag.set(tagId);
    this.tagSelected.emit(tagId);
  }

  taskCountForTag(tagId: TagId): number {
    const tasks = this.taskService.tasks();
    if (tagId === 'all') return tasks.length;
    return tasks.filter(t => t.tag === tagId).length;
  }
}

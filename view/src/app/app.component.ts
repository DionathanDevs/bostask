import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { TaskService } from './services/task.service';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardComponent } from './components/board/board.component';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { TagId } from './models/task.model';

@Component({
  selector: 'bsk-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    BoardComponent,
    AddTaskModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected themeService = inject(ThemeService);
  protected taskService  = inject(TaskService);

  readonly showAddModal = signal(false);
  readonly activeTag    = signal<TagId>('all');

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  onTagChange(tagId: TagId): void {
    this.activeTag.set(tagId);
  }
}

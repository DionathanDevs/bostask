import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
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
export class AppComponent {
  protected themeService = inject(ThemeService);

  readonly showAddModal = signal(false);
  readonly activeTag    = signal<TagId>('all');

  onTagChange(tagId: TagId): void {
    this.activeTag.set(tagId);
  }
}

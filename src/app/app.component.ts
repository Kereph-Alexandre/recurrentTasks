import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { DisplayTasksComponent } from './display-tasks/display-tasks.component';
import { TaskOperationsService } from './service/task-operations.service';
import { TaskService } from './service/task.service';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ErrorManagerService } from './service/error-manager.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DisplayTasksComponent,
    RouterLink,
    ErrorDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = `Recurrent tasks`;

  showError: Boolean = false;
  errorMessage: string = `Test de message d'erreur`;

  constructor(
    private taskService: TaskService,
    private taskOperationsService: TaskOperationsService
  ) {}

  ngOnInit(): void {
    this.loadTasks();

    this.taskService.taskUpdated$.subscribe(() => this.loadTasks());
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.taskOperationsService.updateAllTasks(tasks);
    });
  }
}

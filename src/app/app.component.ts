import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { DisplayTasksComponent } from './display-tasks/display-tasks.component';
import { TaskOperationsService } from './service/task-operations.service';
import { TaskService } from './service/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DisplayTasksComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = `Recurrent tasks`;

  constructor(
    private taskService: TaskService,
    private taskOperationsService: TaskOperationsService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      console.log('got list of tasks');
      this.taskOperationsService.updateAllTasks(tasks);
    });
  }
}

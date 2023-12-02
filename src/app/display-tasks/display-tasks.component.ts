import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurringTask } from '../recurring-task';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-display-tasks',
  standalone: true,
  templateUrl: './display-tasks.component.html',
  styleUrl: './display-tasks.component.sass',
  imports: [CommonModule, TaskComponent],
})
export class DisplayTasksComponent implements OnInit {
  tasks: RecurringTask[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
    console.log(this.tasks);
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
}

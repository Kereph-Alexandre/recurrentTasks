import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurrentTask } from '../recurring-task';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-tasks',
  standalone: true,
  templateUrl: './display-tasks.component.html',
  styleUrl: './display-tasks.component.sass',
  imports: [CommonModule, TaskComponent],
})
export class DisplayTasksComponent implements OnInit {
  tasks: RecurrentTask[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
    this.taskService.taskUpdated$.subscribe(() => this.getTasks());
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
}

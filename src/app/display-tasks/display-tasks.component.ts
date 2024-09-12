import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurrentTask } from '../interface/recurring-task';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-display-tasks',
  standalone: true,
  templateUrl: './display-tasks.component.html',
  styleUrl: './display-tasks.component.sass',
  imports: [CommonModule, TaskComponent],
})
export class DisplayTasksComponent implements OnInit {
  tasks: RecurrentTask[] = [];

  todaysTasks: RecurrentTask[] = [];
  futureTasks: RecurrentTask[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();

    this.taskService.taskUpdated$.subscribe(() => this.loadTasks());
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.sortTasksByDate();
      this.filterTodaysTasks();
    });
  }

  sortTasksByDate(): void {
    this.tasks = this.tasks.sort((oldestDate, newestDate) => {
      const dateOldest = new Date(oldestDate.execDate);
      const dateNewest = new Date(newestDate.execDate);
      return dateOldest.getTime() - dateNewest.getTime();
    });
  }

  filterTodaysTasks(): void {
    //Get today's date
    const today = new Date();

    //Get all tasks
    this.todaysTasks = this.tasks.filter((task) => {
      //Get task next deadline and compare it to today's date
      const taskDate = new Date(task.execDate);
      return (
        taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
      );
    });

    this.futureTasks = this.tasks.filter((task) => {
      //Get task next deadline and compare it to today's date
      const taskDate = new Date(task.execDate);
      return (
        taskDate.getDate() !== today.getDate() ||
        taskDate.getMonth() !== today.getMonth() ||
        taskDate.getFullYear() !== today.getFullYear()
      );
    });
  }
}

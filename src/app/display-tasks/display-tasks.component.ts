import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurrentTask } from '../interface/recurring-task';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../service/task.service';

import { isEqual, startOfDay } from 'date-fns';

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
    this.tasks = this.tasks.sort((taskA, taskB) => {
      if (taskA.execDate === null && taskB.execDate === null) {
        return 0;
      }

      if (taskA.execDate === null) {
        return 1;
      }

      if (taskB.execDate === null) {
        return 2;
      }

      const dateA = startOfDay(new Date(taskA.execDate));
      const dateB = startOfDay(new Date(taskB.execDate));
      return dateA.getTime() - dateB.getTime();
    });
  }

  filterTodaysTasks(): void {
    //Get today's date
    const today = startOfDay(new Date());

    //Get all tasks
    this.todaysTasks = this.tasks.filter((task) => {
      if (task.execDate === null) {
        return false;
      }

      //Get task next deadline and compare it to today's date
      const taskDate = startOfDay(new Date(task.execDate));
      return isEqual(taskDate, today);
    });

    this.futureTasks = this.tasks.filter((task) => {
      //Get task next deadline and compare it to today's date
      const taskDate = new Date(task.execDate!);
      return (
        taskDate.getDate() !== today.getDate() ||
        taskDate.getMonth() !== today.getMonth() ||
        taskDate.getFullYear() !== today.getFullYear()
      );
    });
  }

  trackTaskById(index: number, task: RecurrentTask): number {
    return task.id!;
  }
}

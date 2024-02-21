import { Injectable } from '@angular/core';
import { RecurrentTask } from '../interface/recurring-task';
import { TaskService } from './task.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//Manage all operations about tasks
export class TaskOperationsService {
  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  updateTaskStatus(tasks: RecurrentTask[]): void {}

  updateTaskDates(tasks: RecurrentTask[]): RecurrentTask[] {
    //get current date
    const currentDate = new Date();

    //filter list to keep only the tasks with date anterior to current day
    const pastDueTasks = tasks.filter((task) => {
      const taskDate = new Date(task.execDate);
      return taskDate.getTime() < currentDate.getTime();
    });

    //foreach task on the list,
    //update the date to current one
    //call for taskService UpdateTask()
    pastDueTasks.forEach((task) => {
      task.execDate = currentDate;
      this.taskService
        .updateTask(task.id!, task)
        .subscribe(() => this.taskService.notifyTaskUpdated());
    });

    return tasks;
  }

  //Mark a task as complete
  complete(task: RecurrentTask): RecurrentTask {
    task.completed = true;

    return task;
  }

  //Mark a task as uncomplete
  regress(task: RecurrentTask): RecurrentTask {
    task.completed = false;
    return task;
  }

  //determine the next deadline by adding the delay to current date
  determineNextDate(task: RecurrentTask): RecurrentTask {
    const today = new Date();

    task.execDate = new Date(
      today.getTime() + task.repeatDelay * 24 * 60 * 60 * 1000
    );

    return task;
  }
}

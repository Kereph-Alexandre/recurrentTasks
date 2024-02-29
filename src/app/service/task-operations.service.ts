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

  updateAllTasks(tasks: RecurrentTask[]) {
    this.updateTaskStatus(tasks);
    this.updateTaskDates(tasks);
    this.taskService.notifyTaskUpdated();
  }

  updateTaskStatus(tasks: RecurrentTask[]): RecurrentTask[] {
    //get current date
    const currentDate = new Date();

    //filter tasks with next deadline set to today
    const todaysTasks: RecurrentTask[] = tasks.filter((task) => {
      const taskDate = new Date(task.execDate);

      return (
        taskDate.getFullYear() === currentDate.getFullYear() &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getDate() === currentDate.getDate() &&
        task.completed
      );
    });

    //mark tasks as incomplete and update them
    todaysTasks.forEach((task) => {
      console.log('mise a jour : ' + task.title);
      this.regress(task);
      this.taskService
        .updateTask(task.id!, task)
        .subscribe(() => this.taskService.notifyTaskUpdated());
    });

    return tasks;
  }

  updateTaskDates(tasks: RecurrentTask[]): RecurrentTask[] {
    //get current date
    const currentDate = new Date();

    //filter list to keep only the tasks with date anterior to current day
    const pastDueTasks = tasks.filter((task) => {
      const taskDate = new Date(task.execDate);

      return (
        taskDate.getFullYear() < currentDate.getFullYear() ||
        (taskDate.getMonth() < currentDate.getMonth() &&
          taskDate.getFullYear() === currentDate.getFullYear()) ||
        (taskDate.getDate() < currentDate.getDate() &&
          taskDate.getMonth() === currentDate.getMonth() &&
          taskDate.getFullYear() === currentDate.getFullYear())
      );
    });

    //foreach task on the list,
    //update the date to current one
    //call for taskService UpdateTask()
    pastDueTasks.forEach((task) => {
      console.log(
        'tache :' +
          task.title +
          'mise a jour. Date tache :' +
          task.execDate +
          'Date : ' +
          currentDate
      );
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

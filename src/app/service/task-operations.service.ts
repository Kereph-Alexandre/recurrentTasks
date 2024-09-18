import { Injectable } from '@angular/core';
import { RecurrentTask } from '../interface/recurring-task';
import { TaskService } from './task.service';
import { Observable, map } from 'rxjs';

import { addDays, startOfDay } from 'date-fns';

@Injectable({
  providedIn: 'root',
})

//Manage all operations about tasks
export class TaskOperationsService {
  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  /**
   * Check every task to find and mark : tasks to be renewed, modify the dates if deadline is over and notify other components of the changes
   * @param tasks list of all registered tasks
   */
  updateAllTasks(tasks: RecurrentTask[]) {
    this.updateTaskStatus(tasks);
    this.updateTaskDates(tasks);
    this.taskService.notifyTaskUpdated();
  }

  /**
   * Re-evaluate the task "complete" status by comparing the next occurence date with today's date
   * @param tasks list of registered tasks
   * @returns updated list of tasks
   */
  updateTaskStatus(tasks: RecurrentTask[]): RecurrentTask[] {
    //get current date
    const currentDate = startOfDay(new Date());

    //filter tasks with next deadline set to today
    const todaysTasks: RecurrentTask[] = tasks.filter((task) => {
      if (!task.execDate) {
        return false;
      }
      const taskDate = startOfDay(new Date(task.execDate));

      return taskDate.getTime() === currentDate.getTime() && task.completed;
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

  /**
   * Updates all tasks with a relevant execDate if not completed and past deadline
   * @param tasks list ofregistered tasks
   * @returns Date-wise updated list of tasks
   */
  updateTaskDates(tasks: RecurrentTask[]): RecurrentTask[] {
    //get current date
    const currentDate = startOfDay(new Date());

    //filter list to keep only the tasks with date anterior to current day
    const pastDueTasks = tasks.filter((task) => {
      if (!task.execDate) {
        return false;
      }
      const taskDate = startOfDay(new Date(task.execDate));

      return taskDate.getTime() < currentDate.getTime();
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

  /**
   * determine the date of the task's next occurence depending on the type of reccurence and its definition
   * @param task considered task to update
   * @returns task with updated execDate
   */
  determineNextDate(task: RecurrentTask): RecurrentTask {
    const today = new Date();

    if (task.reccurenceType === 'number of days' && task.repeatDelay) {
      task.execDate = addDays(today, task.repeatDelay);
    } else if (task.reccurenceType === 'specific day' && task.recurrenceDay) {
      task.execDate = this.determineNextOccurenceDay(
        this.getReccurenceDayIndex(task.recurrenceDay),
        today
      );
    }
    return task;
  }

  /**
   * @param recurrenceDayIndex the index of the day of the week indicated in the recurrence variable
   * @param baseDate today's date
   * @returns the date of the task's next occurence
   */
  determineNextOccurenceDay(recurrenceDayIndex: number, baseDate: Date): Date {
    do {
      baseDate = addDays(baseDate, 1);
    } while (baseDate.getDay() !== recurrenceDayIndex);

    return baseDate;
  }

  /**
   * Get the index of the day selected for the task's recurrence
   * @param recurrenceDay the desired day of the week
   * @returns the index belonging to the recurrenceDay
   */
  getReccurenceDayIndex(recurrenceDay: string): number {
    switch (recurrenceDay.toLowerCase()) {
      case 'dimanche':
        return 0;
      case 'lundi':
        return 1;
      case 'mardi':
        return 2;
      case 'mercredi':
        return 3;
      case 'jeudi':
        return 4;
      case 'vendredi':
        return 5;
      case 'samedi':
        return 6;
      default:
        return 0;
    }
  }
}

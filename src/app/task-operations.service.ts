import { Injectable } from '@angular/core';
import { RecurrentTask } from './recurring-task';

@Injectable({
  providedIn: 'root',
})
export class TaskOperationsService {
  constructor() {}

  complete(task: RecurrentTask): RecurrentTask {
    task.completed = true;

    return task;
  }

  regress(task: RecurrentTask): RecurrentTask {
    task.completed = false;
    return task;
  }

  determineNextDate(task: RecurrentTask): RecurrentTask {
    const today = new Date();

    task.execDate = new Date(
      today.getTime() + task.repeatDelay * 24 * 60 * 60 * 1000
    );

    return task;
  }
}

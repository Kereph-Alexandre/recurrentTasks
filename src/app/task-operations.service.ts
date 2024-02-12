import { Injectable } from '@angular/core';
import { RecurrentTask } from './recurring-task';

@Injectable({
  providedIn: 'root',
})
export class TaskOperationsService {
  constructor() {}

  determineNextDate(task: RecurrentTask): RecurrentTask {
    const today = new Date();

    task.execDate = new Date(
      today.getTime() + task.repeatDelay * 24 * 60 * 60 * 1000
    );

    return task;
  }
}

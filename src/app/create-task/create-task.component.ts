import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecurrentTask } from '../interface/recurring-task';
import { TaskService } from '../service/task.service';
import { Router } from '@angular/router';

import { startOfDay, subDays } from 'date-fns';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.sass',
})
export class CreateTaskComponent {
  //model task to initialise creation component and form
  modelTask: RecurrentTask = {
    title: '',
    description: '',
    repeatDelay: 0, //start at an invalid value to ensure user input
    creationDate: new Date(),
    execDate: null, //initialise to current day date, without hours
    completed: false,
    reccurenceType: 'number of days',
  };

  //Define min date for execDate input
  minDate: string = new Date().toISOString().split('T')[0];

  constructor(private taskService: TaskService, private router: Router) {}

  /**
   * Method called at form submission, prevents default form behaviour and ensures valid form is submitted
   * @param event
   */
  onSubmit(event: Event): void {
    //prevent default behaviour, mainly targeting auto-submission on 'enter' and refreshing page on submission
    event.preventDefault();

    //ensure valid form submission
    if (this.isTaskValid()) {
      //add task to data, subscribe
      this.taskService.addTask(this.modelTask).subscribe(() => {
        //notification a change occured in database
        this.taskService.notifyTaskUpdated();

        //redirect to task list (main page)
        this.redirect();
      });
    } else console.log('cannot add invalid task'); //Change into an error message to notify user the task is invalid
  }

  /**
   * redirect user to application main screen, currently the task list
   */
  private redirect() {
    this.router.navigate(['/recurrentTasks']);
  }

  /**
   * Check for task validity, including date of 1st deadline, days between occurences and title
   * @returns if submitted task form is valid or not
   */
  isTaskValid(): boolean {
    const currentDate = startOfDay(new Date());

    //Ensure task title is not empty, doubles from form validation but just in case
    if (!this.modelTask.title.trim()) {
      console.log(`invalid title ${this.modelTask.title}`); //change to error message
      return false;
    }

    //Ensure execDate is valid, i.e. not in the past
    if (this.modelTask.execDate != null) {
      if (this.modelTask.execDate < currentDate) {
        console.log(
          `invalid date ${this.modelTask.execDate}, task cannot be scheduled to past date`
        );
        return false;
      }
    }

    //Ensure repeatDelay is valid, currently between 1 and 365 days (assuming a repetitive task should not be less than once a year, not taking into account 366 days years)
    if (
      this.modelTask.repeatDelay &&
      (this.modelTask.repeatDelay < 1 || this.modelTask.repeatDelay > 365)
    ) {
      console.log(
        `invalid repeat delay: ${this.modelTask.repeatDelay} days. Must be comprised between 1 and 365 days`
      );
      return false;
    }

    return true;
  }
}

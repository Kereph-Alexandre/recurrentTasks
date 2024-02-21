import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecurrentTask } from '../interface/recurring-task';
import { TaskService } from '../service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.sass',
})
export class CreateTaskComponent {
  modelTask: RecurrentTask = {
    title: '',
    description: '',
    repeatDelay: 0,
    creationDate: new Date(),
    execDate: new Date(),
    completed: false,
  };

  minDate: string = new Date().toISOString().split('T')[0];

  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.isTaskValid()) {
      this.taskService.addTask(this.modelTask).subscribe(() => {
        this.taskService.notifyTaskUpdated();
        this.redirect();
      });
    } else console.log('cannot add invalid task');
  }

  private redirect() {
    this.router.navigate(['/recurrentTasks']);
  }

  isTaskValid(): Boolean {
    if (!this.modelTask.title.trim()) {
      console.log(`invalid title ${this.modelTask.title}`);
      return false;
    }

    if (
      this.modelTask.execDate.toLocaleTimeString ==
      new Date().toLocaleTimeString
    ) {
      console.log(`invalid date ${this.modelTask.execDate.toLocaleTimeString}`);
      return false;
    }
    if (this.modelTask.repeatDelay == 0) {
      console.log(`invalid repeat delay: ${this.modelTask.repeatDelay} days`);
      return false;
    }

    return true;
  }
}

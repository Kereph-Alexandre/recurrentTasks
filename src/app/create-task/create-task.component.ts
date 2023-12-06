import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecurrentTask } from '../recurring-task';
import { TaskService } from '../task.service';

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

  constructor(private taskService: TaskService) {}

  onSubmit() {
    if (this.isTaskValid()) {
      this.addTask(this.modelTask);
    } else console.log('cannot add invalid task');
  }

  addTask(newTask: RecurrentTask) {
    this.taskService
      .addTask(newTask)
      .subscribe((task: any) => console.log(`added task n° ${task.id}`));
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

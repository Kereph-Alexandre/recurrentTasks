import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecurrentTask } from '../recurring-task';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
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
    this.addTask(this.modelTask);
  }

  addTask(newTask: RecurrentTask) {
    this.taskService
      .addTask(newTask)
      .subscribe((task: any) => console.log(`added task n° ${task.id}`));
  }
}

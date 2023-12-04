import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecurrentTask } from '../recurring-task';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.sass',
})
export class CreateTaskComponent {
  modelTask: RecurrentTask = {
    id: 0,
    title: '',
    description: '',
    repeatDelay: 0,
    creationDate: new Date(),
    execDate: new Date(),
    completed: false,
  };
}

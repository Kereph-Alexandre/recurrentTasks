import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecurringTask } from '../recurring-task';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-display-tasks',
  standalone: true,
  templateUrl: './display-tasks.component.html',
  styleUrl: './display-tasks.component.sass',
  imports: [CommonModule, TaskComponent],
})
export class DisplayTasksComponent {
  exampleTask: RecurringTask = {
    id: 1,
    title: 'task number 1',
    description: 'example of a recurring daily task',
    repeatDelay: 1,
    creationDate: new Date(20 / 11 / 23),
    execDate: new Date(),
    completed: false,
  };
}

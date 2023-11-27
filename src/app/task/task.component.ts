import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecurringTask } from '../recurring-task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.sass',
})
export class TaskComponent {
  @Input() task!: RecurringTask;
}

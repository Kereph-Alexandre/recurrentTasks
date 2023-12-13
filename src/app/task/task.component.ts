import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecurrentTask } from '../recurring-task';
import { RouterLink } from '@angular/router';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.sass',
})
export class TaskComponent {
  @Input() task!: RecurrentTask;

  constructor(private taskService: TaskService) {}

  deleteTask(): void {
    console.log('try to delete task with id ', this.task.id);
    if (this.task.id) {
      console.log(`task's id is valid`);
      this.taskService
        .deleteTask(this.task.id)
        .subscribe(() => this.taskService.notifyTaskUpdated());
    }
  }

  toggleCompletion(task: RecurrentTask): void {
    const updatedTask: Partial<RecurrentTask> = { completed: !task.completed };

    this.taskService.updateTask(task.id!, updatedTask).subscribe(() => {
      this.taskService.notifyTaskUpdated();
    });
  }
}

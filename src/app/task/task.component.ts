import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecurrentTask } from '../recurring-task';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { TaskOperationsService } from '../task-operations.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.sass',
})
export class TaskComponent {
  @Input() task!: RecurrentTask;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private taskOperationsService: TaskOperationsService
  ) {}

  deleteTask(): void {
    console.log('try to delete task with id ', this.task.id);
    if (this.task.id) {
      console.log(`task's id is valid`);
      this.taskService
        .deleteTask(this.task.id)
        .subscribe(() => this.taskService.notifyTaskUpdated());
    }
  }

  // on clicking the validation checkbox, complete the task or regress it to uncomplete
  toggleCompletion(task: RecurrentTask): void {
    if (!task.completed) {
      this.completeTask(task);
    } else this.regressTask(task);
  }

  // mark task as incomplete, (if it can still be displayed on the list)
  regressTask(task: RecurrentTask) {
    this.taskOperationsService.regress(task);
    // any need to also revert to last completion deadline ?

    this.taskService
      .updateTask(task.id!, task)
      .subscribe(() => this.taskService.notifyTaskUpdated());
  }

  completeTask(task: RecurrentTask) {
    this.taskOperationsService.complete(task);
    this.taskOperationsService.determineNextDate(task);

    this.taskService
      .updateTask(task.id!, task)
      .subscribe(() => this.taskService.notifyTaskUpdated());
  }

  navigateToDetails(isEditing: boolean): void {
    this.router.navigate([`/recurrentTasks/${this.task.id}`, { isEditing }]);
  }
}

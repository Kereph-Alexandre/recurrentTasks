import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurrentTask } from '../interface/recurring-task';
import { TaskService } from '../service/task.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TaskOperationsService } from '../service/task-operations.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.sass',
  imports: [CommonModule, FormsModule],
})
export class TaskDetailComponent {
  @Input() task!: RecurrentTask;

  isEditing: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private taskOperationService: TaskOperationsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getTask();
    this.taskService.taskUpdated$.subscribe(() => this.getTask());
    this.route.paramMap.subscribe(
      (params) => (this.isEditing = params.get('isEditing') === 'true')
    );
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(id).subscribe((task) => (this.task = task));
  }

  goBack(): void {
    this.location.back();
  }

  deleteTask(): void {
    if (this.task?.id) {
      this.taskService
        .deleteTask(this.task?.id)
        .subscribe(() => this.taskService.notifyTaskUpdated());
      this.goBack();
    }
  }

  toggleCompletion(task: RecurrentTask): void {
    if (!task.completed) {
      this.completeTask(task);
    } else this.regressTask(task);
  }

  regressTask(task: RecurrentTask): void {
    if (task.completed) {
      this.taskOperationService.regress(task);
      this.taskService
        .updateTask(task.id!, task)
        .subscribe(() => this.taskService.notifyTaskUpdated());
    }
  }

  completeTask(task: RecurrentTask): void {
    this.taskOperationService.determineNextDate(task);
    this.taskOperationService.complete(task);

    this.taskService.updateTask(this.task?.id!, task).subscribe(() => {
      this.taskService.notifyTaskUpdated();
    });
  }

  editTask(): void {
    this.isEditing = true;
  }

  confirmTaskEdit(): void {
    if (this.task?.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
        this.taskService.notifyTaskUpdated(), this.goBack();
      });
    }
  }
}

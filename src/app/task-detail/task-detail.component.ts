import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurrentTask } from '../recurring-task';
import { TaskService } from '../task.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormsModule } from '@angular/forms';

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

  completeTask(): void {
    const date = this.determineNextDate();

    this.taskService
      .updateTask(this.task?.id!, {
        completed: true,
        execDate: date,
      })
      .subscribe(() => {
        this.taskService.notifyTaskUpdated();
      });
  }

  determineNextDate(): Date {
    const today = new Date();

    const nextExecDate = new Date(
      today.getTime() + this.task.repeatDelay * 24 * 60 * 60 * 1000
    );

    return nextExecDate;
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

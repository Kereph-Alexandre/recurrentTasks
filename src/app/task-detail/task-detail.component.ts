import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurrentTask } from '../recurring-task';
import { TaskService } from '../task.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.sass',
})
export class TaskDetailComponent {
  @Input() task?: RecurrentTask;

  constructor(
    private route: ActivatedRoute,
    private taskservice: TaskService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getTask();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskservice.getTaskById(id).subscribe((task) => (this.task = task));
  }

  goBack(): void {
    this.location.back();
  }
}

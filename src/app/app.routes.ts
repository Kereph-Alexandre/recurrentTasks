import { Routes } from '@angular/router';
import { DisplayTasksComponent } from './display-tasks/display-tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/recurrentTasks',
    pathMatch: 'full',
  },
  {
    path: 'recurrentTasks',
    component: DisplayTasksComponent,
  },
  {
    path: 'recurrentTasks/:id',
    component: TaskDetailComponent,
  },
];

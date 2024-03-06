import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RecurrentTask } from '../interface/recurring-task';

import { Observable, Subject, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorManagerService } from './error-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = 'http://localhost:3000/tasks';

  //Change from InMemory To JsonServer
  private taskUpdatedSubject = new Subject<void>();
  taskUpdated$ = this.taskUpdatedSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorManager: ErrorManagerService
  ) {}

  getTasks(): Observable<RecurrentTask[]> {
    return this.http.get<RecurrentTask[]>(this.tasksUrl).pipe(
      tap(() => console.log('fetched reccurrent tasks')),
      catchError(this.errorManager.handleError<RecurrentTask[]>('getTasks', []))
    );
  }

  getTaskById(id: number): Observable<RecurrentTask> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<RecurrentTask>(url).pipe(
      tap(() => console.log(`fetched task with id: ${id}`)),
      catchError(
        this.errorManager.handleError<RecurrentTask>(`getTaskById id=${id}`)
      )
    );
  }

  addTask(task: RecurrentTask): Observable<RecurrentTask> {
    return this.http.post<RecurrentTask>(this.tasksUrl, task, this.httpOptions);
  }

  deleteTask(id: number): Observable<void> {
    const taskUrl = `${this.tasksUrl}/${id}`;

    return this.http.delete<void>(taskUrl, this.httpOptions);
  }

  updateTask(
    id: number,
    updatedTask: Partial<RecurrentTask>
  ): Observable<void> {
    const taskUrl = `${this.tasksUrl}/${id}`;

    return this.http.patch<void>(taskUrl, updatedTask);
  }

  notifyTaskUpdated(): void {
    this.taskUpdatedSubject.next();
  }
}

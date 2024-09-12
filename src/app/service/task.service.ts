import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RecurrentTask } from '../interface/recurring-task';

import { Observable, Subject, forkJoin, of } from 'rxjs';
import { catchError, map, tap, shareReplay, switchMap } from 'rxjs/operators';
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

  //Store task data in cache
  private tasksCache$: Observable<RecurrentTask[]> | null = null;

  constructor(
    private http: HttpClient,
    private errorManager: ErrorManagerService
  ) {}

  getTasks(): Observable<RecurrentTask[]> {
    //If the cache is empty, get the tasks list and store it into cache
    if (!this.tasksCache$) {
      this.tasksCache$ = this.http.get<RecurrentTask[]>(this.tasksUrl).pipe(
        //Store the 1 last result from service request
        shareReplay(1),
        catchError(
          this.errorManager.handleError<RecurrentTask[]>('getTasks', [])
        )
      );
    }

    //either way, return the list stored in cache
    return this.tasksCache$;
  }

  getTaskById(id: number): Observable<RecurrentTask | undefined> {
    //if cache is full, get the task from there
    if (this.tasksCache$) {
      return this.tasksCache$.pipe(
        map((tasks) => tasks.find((task) => task.id === id)),
        switchMap((task) => (task ? of(task) : this.loadTaskFromApi(id))),
        catchError(this.errorManager.handleError<RecurrentTask>('getTaskById'))
      );
    }

    //if cache is empty, request full tasks list and find the right one
    return this.getTasks().pipe(
      map((tasks) => tasks.find((task) => task.id === id)),

      //if task is not within the full list for any reason, try to get it with specific id
      switchMap((task) => (task ? of(task) : this.loadTaskFromApi(id))),

      //if still doesn't work, throw error
      catchError(
        this.errorManager.handleError<RecurrentTask>(`getTaskById id=${id}`)
      )
    );
  }

  private loadTaskFromApi(id: number): Observable<RecurrentTask | undefined> {
    return this.http
      .get<RecurrentTask>(`${this.tasksUrl}/${id}`)
      .pipe(
        catchError(
          this.errorManager.handleError<RecurrentTask>(
            `loadTaskFromApi id=${id}`
          )
        )
      );
  }

  addTask(task: RecurrentTask): Observable<RecurrentTask> {
    return this.http
      .post<RecurrentTask>(this.tasksUrl, task, this.httpOptions)
      .pipe(
        tap((newTask) => {
          this.tasksCache$ = null;
          this.taskUpdatedSubject.next();
        }),
        catchError(this.errorManager.handleError<RecurrentTask>('addTask'))
      );
  }

  deleteTask(id: number): Observable<void> {
    const taskUrl = `${this.tasksUrl}/${id}`;

    return this.http.delete<void>(taskUrl, this.httpOptions).pipe(
      tap(() => {
        this.tasksCache$ = null;
        this.taskUpdatedSubject.next();
      }),
      catchError(this.errorManager.handleError<void>('deleteTask'))
    );
  }

  updateTask(
    id: number,
    updatedTask: Partial<RecurrentTask>
  ): Observable<void> {
    const taskUrl = `${this.tasksUrl}/${id}`;

    return this.http.patch<void>(taskUrl, updatedTask).pipe(
      tap(() => {
        this.tasksCache$ = null;
        this.taskUpdatedSubject.next();
      }),
      catchError(this.errorManager.handleError<void>('updateTask'))
    );
  }

  notifyTaskUpdated(): void {
    this.tasksCache$ = null;
  }
}

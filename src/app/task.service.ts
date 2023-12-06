import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RecurrentTask } from './recurring-task';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = 'api/tasks';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTasks(): Observable<RecurrentTask[]> {
    return this.http.get<RecurrentTask[]>(this.tasksUrl).pipe(
      tap(() => console.log('fetched reccurrent tasks')),
      catchError(this.handleError<RecurrentTask[]>('getTasks', []))
    );
  }

  getTaskById(id: number): Observable<RecurrentTask> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<RecurrentTask>(url).pipe(
      tap(() => console.log(`fetched task with id: ${id}`)),
      catchError(this.handleError<RecurrentTask>(`getTaskById id=${id}`))
    );
  }

  addTask(task: RecurrentTask): Observable<RecurrentTask> {
    return this.http.post<RecurrentTask>(this.tasksUrl, task, this.httpOptions);
  }

  log(arg0: string): void {
    throw new Error('Method not implemented.');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

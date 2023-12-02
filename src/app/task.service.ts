import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecurringTask } from './recurring-task';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = 'api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<RecurringTask[]> {
    return this.http.get<RecurringTask[]>(this.tasksUrl).pipe(
      tap(() => console.log('fetched reccurring tasks')),
      catchError(this.handleError<RecurringTask[]>('getTasks', []))
    );
  }

  getTaskById(id: number): Observable<RecurringTask> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<RecurringTask>(url).pipe(
      tap(() => console.log(`fetched task with id: ${id}`)),
      catchError(this.handleError<RecurringTask>(`getTaskById id=${id}`))
    );
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

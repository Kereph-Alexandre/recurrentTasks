import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorManagerService {
  private errorMessagesSubject = new Subject<string>();
  public errorUpdated$ = this.errorMessagesSubject.asObservable();

  constructor() {}

  // Log an error key information, sends the appropriate message and return a default expected result
  public handleError<T>(operation: string, result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      const errorMessage = `Erreur ${error.status}(${error.statusText}), ${error.message}`;

      // log error
      // TODO: send the error to remote logging infrastructure
      console.error(errorMessage); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${errorMessage}`);

      // send error message to observable and notify subs
      this.addErrorMessage(errorMessage);

      // return default or expected results
      return of(result as T);
    };
  }

  private addErrorMessage(errorMessage: string): void {
    this.errorMessagesSubject.next(errorMessage);
  }
}

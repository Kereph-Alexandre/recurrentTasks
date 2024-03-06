import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorManagerService {
  constructor() {}

  //record info on particular error or event ; UNUSED
  log(arg0: string): void {
    throw new Error('Method not implemented.');
  }

  // Log an error key information, sends the appropriate message and return a default expected result
  public handleError<T>(operation: string, result?: T) {
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

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorManagerService {
  private errorMessagesSubject = new Subject<string[]>();
  private errorMessages: string[] = [];
  public errorUpdated$ = this.errorMessagesSubject.asObservable();

  constructor() {}

  // Log an error key information, sends the appropriate message and return a default expected result
  public handleError<T>(operation: string, result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      const userFriendlyMessage = this.getUserFriendlyMessage(error);

      // log to console for debugging purposes
      console.error(userFriendlyMessage);

      // send error message to observable and notify subs
      this.addErrorMessage(userFriendlyMessage);

      // return default or expected results
      return of(result as T);
    };
  }

  private getUserFriendlyMessage(error: HttpErrorResponse): string {
    let errorMessage = 'An error occured during the operation. ';

    switch (error.status) {
      case 404:
        errorMessage += `The requested resource was not found.`;
        break;

      case 500:
        errorMessage += `Internal server error occured. please try again later.`;
        break;

      default:
        errorMessage += `An unexpected error occured: ${error.message}`;
    }

    return errorMessage;
  }

  public addErrorMessage(errorMessage: string): void {
    this.errorMessages.push(errorMessage);
    this.errorMessagesSubject.next(this.errorMessages);
  }

  public clearErrors(): void {
    this.errorMessages = [];
    this.errorMessagesSubject.next(this.errorMessages);
  }
}

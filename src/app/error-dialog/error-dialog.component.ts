import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorManagerService } from '../service/error-manager.service';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.sass',
})
export class ErrorDialogComponent implements OnInit, OnDestroy {
  @Input() errorMessage?: string;

  errorMessages: string[] = [];

  constructor(private errorManager: ErrorManagerService) {}

  ngOnInit() {
    document.body.classList.add('dialog-open');
    this.errorManager.errorUpdated$.subscribe({
      next: (errorMessages) => {
        this.errorMessages = errorMessages;
      },
    });
  }

  closeDialog(index: number): void {
    this.errorMessages.splice(index, 1);
    if (this.errorMessages.length === 0) {
      document.body.classList.remove('dialog-open');
    }
  }

  closeAllDialogs(): void {
    this.errorManager.clearErrors();
    document.body.classList.remove('dialog-open');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('dialog-open');
  }
}

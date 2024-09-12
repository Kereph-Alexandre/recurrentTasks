import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorManagerService } from '../service/error-manager.service';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.sass',
})
export class ErrorDialogComponent {
  @Input() errorMessage?: string;
  errorOccurred: boolean = false;

  constructor(private errorManager: ErrorManagerService) {}

  ngOnInit() {
    this.errorManager.errorUpdated$.subscribe({
      next: (errorMessage) => {
        this.errorMessage = errorMessage;
        this.errorOccurred = true;
      },
    });
  }

  closeDialog() {
    this.errorOccurred = false;
  }
}

export interface RecurrentTask {
  id?: number;
  title: string;
  description: string;
  reccurenceType: 'number of days' | 'specific day';
  repeatDelay?: number; // if the recurrence  is a number of Days
  recurrenceDay?: string; //if the recurrence is a specific day
  creationDate: Date;
  execDate: Date | null;
  completed: boolean;
}

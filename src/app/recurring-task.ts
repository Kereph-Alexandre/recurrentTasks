export interface RecurrentTask {
  id?: number;
  title: string;
  description: string;
  repeatDelay: number;
  creationDate: Date;
  execDate: Date;
  completed: boolean;
}

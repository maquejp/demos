import { Injectable } from '@angular/core';
import { Task } from '../interfaces/tasks.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: Task[] = [];

  constructor() {}

  getTasks(): Task[] {
    return this.tasks;
  }
}

import { Injectable } from '@angular/core';
import { TaskInterface } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: TaskInterface[] = [];

  constructor() {
    this.tasks = [
      {
        id: '1',
        title: 'Complete Project Documentation',
        description:
          'Write comprehensive documentation for the new feature implementation',
        dueDate: new Date(2024, 3, 15),
        completed: false,
      },
      {
        id: '2',
        title: 'Code Review',
        description: 'Review pull requests from team members',
        dueDate: new Date(2024, 3, 10),
        completed: true,
      },
      {
        id: '3',
        title: 'Update Dependencies',
        description: 'Update project dependencies to latest stable versions',
        dueDate: new Date(2024, 3, 20),
        completed: false,
      },
      {
        id: '4',
        title: 'Write Unit Tests',
        description: 'Add unit tests for the new authentication module',
        dueDate: new Date(2024, 3, 18),
        completed: false,
      },
      {
        id: '5',
        title: 'Team Meeting',
        description: 'Weekly team sync-up meeting',
        dueDate: new Date(2024, 3, 12),
        completed: true,
      },
      {
        id: '6',
        title: 'Bug Fixes',
        description: 'Fix reported issues in the user dashboard',
        dueDate: new Date(2024, 3, 14),
        completed: false,
      },
      {
        id: '7',
        title: 'Performance Optimization',
        description: 'Optimize database queries for better performance',
        dueDate: new Date(2024, 3, 25),
        completed: false,
      },
      {
        id: '8',
        title: 'Security Audit',
        description: 'Conduct security audit of the application',
        dueDate: new Date(2024, 3, 22),
        completed: false,
      },
      {
        id: '9',
        title: 'User Training',
        description: 'Prepare training materials for new features',
        dueDate: new Date(2024, 3, 16),
        completed: false,
      },
      {
        id: '10',
        title: 'Deployment Planning',
        description: 'Plan the deployment strategy for the next release',
        dueDate: new Date(2024, 3, 28),
        completed: false,
      },
    ];
  }

  getTasks(): TaskInterface[] {
    return this.tasks;
  }

  addTask(task: TaskInterface) {
    this.tasks.push(task);
  }

  updateTask(task: TaskInterface) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getTaskById(id: string): TaskInterface | undefined {
    return this.tasks.find((task) => task.id === id);
  }
}

import { Injectable } from '@angular/core';
import { Task } from '../interfaces/tasks.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Project Setup',
      description: 'Set up the initial project structure and dependencies',
      completed: false,
      dueDate: new Date('2024-03-20'),
    },
    {
      id: 2,
      title: 'Implement Task List',
      description: 'Create the task list component with basic functionality',
      completed: false,
      dueDate: new Date('2024-03-21'),
    },
    {
      id: 3,
      title: 'Add Task Creation',
      description: 'Implement the ability to create new tasks',
      completed: false,
      dueDate: new Date('2024-03-22'),
    },
    {
      id: 4,
      title: 'Style Components',
      description: 'Apply styling to make the app look modern and responsive',
      completed: false,
      dueDate: new Date('2024-03-23'),
    },
    {
      id: 5,
      title: 'Add Task Filtering',
      description: 'Implement filtering and sorting functionality',
      completed: false,
      dueDate: new Date('2024-03-24'),
    },
    {
      id: 6,
      title: 'Write Tests',
      description: 'Create unit tests for components and services',
      completed: false,
      dueDate: new Date('2024-03-25'),
    },
    {
      id: 7,
      title: 'Add Task Details',
      description: 'Implement a modal to view task details',
      completed: false,
      dueDate: new Date('2024-03-26'),
    },
  ];

  constructor() {}

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  setTaskCompleted(id: number): void {
    const task = this.getTaskById(id);
    if (task) {
      task.completed = true;
    }
  }
}

import { Component } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { NgFor } from '@angular/common';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
}

@Component({
  selector: 'app-task-list-card',
  standalone: true,
  imports: [TaskCardComponent, NgFor],
  templateUrl: './task-list-card.component.html',
  styleUrl: './task-list-card.component.css',
})
export class TaskListCardComponent {
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
  ];
}

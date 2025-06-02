import { Component } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { NgFor } from '@angular/common';
import { Task } from '../../interfaces/tasks.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-list-card',
  standalone: true,
  imports: [TaskCardComponent, NgFor],
  templateUrl: './task-list-card.component.html',
  styleUrl: './task-list-card.component.css',
})
export class TaskListCardComponent {
  tasks: Task[] = [];

  constructor(private tasksService: TasksService) {
    this.tasks = this.tasksService.getTasks();
  }
}

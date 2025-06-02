import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../interfaces/tasks.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task!: Task;

  constructor(private tasksService: TasksService) {}

  completeTask(): void {
    this.tasksService.setTaskCompleted(this.task.id);
  }
}

import { Component, Input } from '@angular/core';
import { TaskInterface } from '../../../interfaces/task';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class TaskItemComponent {
  @Input() task!: TaskInterface;

  constructor(private tasksService: TasksService) {}

  onDelete() {
    this.tasksService.deleteTask(this.task.id);
  }

  onComplete() {
    this.task.completed = true;
    this.tasksService.updateTask(this.task);
  }

  onEdit() {
    this.tasksService.updateTask(this.task);
  }
}

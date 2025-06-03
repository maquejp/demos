import { Component } from '@angular/core';
import { TaskItemComponent } from '../item/item.component';
import { TaskInterface } from '../../../interfaces/task';
import { TasksService } from '../../../services/tasks.service';
import { TaskFormComponent } from '../form/form.component';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskItemComponent, TaskFormComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class TaskListComponent {
  tasks: TaskInterface[] = [];
  showForm = false;

  constructor(private tasksService: TasksService) {
    this.tasks = this.tasksService.getTasks();
  }

  onAddTask() {
    this.showForm = true;
  }
}

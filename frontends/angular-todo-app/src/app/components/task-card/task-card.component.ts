import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../interfaces/tasks.interface';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task!: Task;
}

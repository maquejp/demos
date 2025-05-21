import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
}

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

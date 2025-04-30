import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggleComplete = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();

  onToggle() {
    this.toggleComplete.emit(this.todo);
  }

  onDelete() {
    this.delete.emit(this.todo.id);
  }
}

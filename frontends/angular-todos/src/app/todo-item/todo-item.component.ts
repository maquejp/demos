import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../models/todo.model';

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

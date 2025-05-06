import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../types/todo.types';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() toggleStatus = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>();

  getPriorityClass(): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (this.todo.priority) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
      case 'low':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
      default:
        return baseClasses;
    }
  }

  onToggleStatus(): void {
    this.toggleStatus.emit(this.todo.id);
  }

  onEdit(): void {
    this.edit.emit(this.todo);
  }

  onDelete(): void {
    this.delete.emit(this.todo.id);
  }
}

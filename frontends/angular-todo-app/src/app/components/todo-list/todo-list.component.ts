import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { Todo } from '../../types/todo.types';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TodoItemComponent,
    TodoFormComponent,
    FilterBarComponent,
  ],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  editingTodo = signal<Todo | null>(null);
  loading = signal<boolean>(false);

  constructor(public todoService: TodoService) {}

  onAddTodo(): void {
    // Clear any editing state
    this.editingTodo.set(null);
    // Scroll to the form smoothly
    document.querySelector('.mb-8')?.scrollIntoView({ behavior: 'smooth' });
  }

  onSaveTodo(
    todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): void {
    this.todoService.addTodo(todoData);
  }

  onUpdateTodo({ id, updates }: { id: string; updates: Partial<Todo> }): void {
    this.todoService.updateTodo(id, updates);
    this.editingTodo.set(null);
  }

  onToggleStatus(id: string): void {
    this.todoService.toggleStatus(id);
  }

  onEditTodo(todo: Todo): void {
    this.editingTodo.set(todo);
  }

  onDeleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  onCancelEdit(): void {
    this.editingTodo.set(null);
  }
}

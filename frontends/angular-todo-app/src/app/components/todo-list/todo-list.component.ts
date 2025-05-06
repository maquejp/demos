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
  showForm = signal<boolean>(false);

  constructor(public todoService: TodoService) {}

  onAddTodo(): void {
    // Clear any editing state and show the form
    this.editingTodo.set(null);
    this.showForm.set(true);
    // Wait for next tick to ensure the form is rendered
    setTimeout(() => {
      document
        .querySelector('.todo-form')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  onSaveTodo(
    todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): void {
    this.todoService.addTodo(todoData);
    this.showForm.set(false);
  }

  onUpdateTodo({ id, updates }: { id: string; updates: Partial<Todo> }): void {
    this.todoService.updateTodo(id, updates);
    this.editingTodo.set(null);
    this.showForm.set(false);
  }

  onToggleStatus(id: string): void {
    this.todoService.toggleStatus(id);
  }

  onEditTodo(todo: Todo): void {
    this.editingTodo.set(todo);
    this.showForm.set(true);
    // Wait for next tick to ensure the form is rendered
    setTimeout(() => {
      document
        .querySelector('.todo-form')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  onDeleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  onCancelEdit(): void {
    this.editingTodo.set(null);
    this.showForm.set(false);
  }
}

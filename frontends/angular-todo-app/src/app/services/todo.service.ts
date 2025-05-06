import { Injectable, computed, signal } from '@angular/core';
import { Todo, TodoFilters, TodoStatus, Priority } from '../types/todo.types';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly STORAGE_KEY = 'todos';

  // State signals
  private todos = signal<Todo[]>([]);
  private filters = signal<TodoFilters>({
    status: 'all',
    priority: 'all',
    sortBy: 'dueDate',
    sortOrder: 'asc',
  });

  // Computed signals
  readonly filteredTodos = computed(() => {
    let result = [...this.todos()];
    const currentFilters = this.filters();

    // Apply status filter
    if (currentFilters.status && currentFilters.status !== 'all') {
      result = result.filter((todo) => todo.status === currentFilters.status);
    }

    // Apply priority filter
    if (currentFilters.priority && currentFilters.priority !== 'all') {
      result = result.filter(
        (todo) => todo.priority === currentFilters.priority
      );
    }

    // Apply search filter
    if (currentFilters.searchTerm) {
      const searchTerm = currentFilters.searchTerm.toLowerCase();
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchTerm) ||
          todo.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    if (currentFilters.sortBy) {
      result.sort((a, b) => {
        let comparison = 0;
        switch (currentFilters.sortBy) {
          case 'dueDate':
            // Handle cases where dueDate might be undefined
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1; // undefined dates go last
            if (!b.dueDate) return -1;
            comparison = a.dueDate.getTime() - b.dueDate.getTime();
            break;
          case 'priority':
            const priorityOrder: Record<Priority, number> = {
              high: 3,
              medium: 2,
              low: 1,
            };
            comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
            break;
          case 'title':
            comparison = a.title.localeCompare(b.title);
            break;
        }
        return currentFilters.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  });

  constructor() {
    this.loadFromLocalStorage();
  }

  // Local storage methods
  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const parsedTodos = JSON.parse(stored, (key, value) => {
        if (key === 'dueDate' || key === 'createdAt' || key === 'updatedAt') {
          return new Date(value);
        }
        return value;
      });
      this.todos.set(parsedTodos);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos()));
  }

  // CRUD operations
  addTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'status'>): void {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.todos.update((todos) => [...todos, newTodo]);
    this.saveToLocalStorage();
  }

  updateTodo(
    id: string,
    updates: Partial<Omit<Todo, 'id' | 'createdAt'>>
  ): void {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates, updatedAt: new Date() } : todo
      )
    );
    this.saveToLocalStorage();
  }

  deleteTodo(id: string): void {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
    this.saveToLocalStorage();
  }

  toggleStatus(id: string): void {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === 'active' ? 'completed' : 'active',
              updatedAt: new Date(),
            }
          : todo
      )
    );
    this.saveToLocalStorage();
  }

  // Filter operations
  updateFilters(updates: Partial<TodoFilters>): void {
    this.filters.update((filters) => ({ ...filters, ...updates }));
  }

  getFilters(): TodoFilters {
    return this.filters();
  }
}

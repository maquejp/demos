import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle = '';

  ngOnInit() {
    // Load todos from JSON file
    fetch('app/todos.json')
      .then((response) => response.json())
      .then((data) => (this.todos = data.todos));
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        id: this.todos.length + 1,
        title: this.newTodoTitle.trim(),
        completed: false,
      };
      this.todos.push(newTodo);
      this.newTodoTitle = '';
    }
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

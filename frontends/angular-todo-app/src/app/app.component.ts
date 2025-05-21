import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TaskListCardComponent } from './task-list-card/task-list-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, TaskListCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-todo-app';
}

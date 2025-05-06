import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isDark = signal<boolean>(false);

  constructor() {
    // Initialize theme from local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    this.isDark.set(
      savedTheme === 'dark' || (savedTheme === null && prefersDark)
    );

    // Apply initial theme
    this.updateTheme(this.isDark());

    // Listen for system theme changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === null) {
          this.isDark.set(e.matches);
          this.updateTheme(e.matches);
        }
      });
  }

  toggleTheme(): void {
    this.isDark.update((dark) => !dark);
    this.updateTheme(this.isDark());
    localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
  }

  private updateTheme(dark: boolean): void {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

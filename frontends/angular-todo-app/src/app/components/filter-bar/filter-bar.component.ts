import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { TodoFilters, TodoStatus, Priority } from '../../types/todo.types';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-bar.component.html',
})
export class FilterBarComponent implements OnInit {
  searchControl = new FormControl('');
  statusControl = new FormControl<'all' | TodoStatus>('all');
  priorityControl = new FormControl<'all' | Priority>('all');
  sortByControl = new FormControl<'dueDate' | 'priority' | 'title'>('dueDate');
  sortOrderControl = new FormControl<'asc' | 'desc'>('asc');

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // Initialize controls from service
    const filters = this.todoService.getFilters();
    this.searchControl.setValue(filters.searchTerm ?? '');
    this.statusControl.setValue(filters.status ?? 'all');
    this.priorityControl.setValue(filters.priority ?? 'all');
    this.sortByControl.setValue(filters.sortBy ?? 'dueDate');
    this.sortOrderControl.setValue(filters.sortOrder ?? 'asc');

    // Subscribe to form control changes
    this.searchControl.valueChanges.subscribe((value) => {
      this.todoService.updateFilters({ searchTerm: value ?? '' });
    });

    this.statusControl.valueChanges.subscribe((value) => {
      if (value) {
        this.todoService.updateFilters({ status: value });
      }
    });

    this.priorityControl.valueChanges.subscribe((value) => {
      if (value) {
        this.todoService.updateFilters({ priority: value });
      }
    });

    this.sortByControl.valueChanges.subscribe((value) => {
      if (value) {
        this.todoService.updateFilters({ sortBy: value });
      }
    });

    this.sortOrderControl.valueChanges.subscribe((value) => {
      if (value) {
        this.todoService.updateFilters({ sortOrder: value });
      }
    });
  }

  toggleSortOrder(): void {
    const newOrder = this.sortOrderControl.value === 'asc' ? 'desc' : 'asc';
    this.sortOrderControl.setValue(newOrder);
  }
}

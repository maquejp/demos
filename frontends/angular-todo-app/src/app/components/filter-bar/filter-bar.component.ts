import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { TodoFilters } from '../../types/todo.types';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html',
})
export class FilterBarComponent implements OnInit {
  filters: TodoFilters = {
    status: 'all',
    priority: 'all',
    sortBy: 'dueDate',
    sortOrder: 'asc',
    searchTerm: '',
  };

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // Initialize filters from service
    this.filters = this.todoService.getFilters();
  }

  onFilterChange(): void {
    this.todoService.updateFilters(this.filters);
  }
}

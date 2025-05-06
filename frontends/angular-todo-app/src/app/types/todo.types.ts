export type Priority = 'low' | 'medium' | 'high';
export type TodoStatus = 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoFilters {
  status?: TodoStatus | 'all';
  priority?: Priority | 'all';
  searchTerm?: string;
  sortBy?: 'dueDate' | 'priority' | 'title';
  sortOrder?: 'asc' | 'desc';
}

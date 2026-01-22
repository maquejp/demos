export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string[];
  dueDate?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  tags: string[];
  projectId?: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface TasksResponse {
  status: number;
  data: Task[];
}

export interface TaskResponse {
  status: number;
  data: Task | null;
}

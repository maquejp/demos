export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignedTo: number[];
  dueDate?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  tags: string[];
  projectId?: number | null;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  updatedBy: number;
}

export interface TasksResponse {
  status: number;
  data: Task[];
}

export interface TaskResponse {
  status: number;
  data: Task | null;
}

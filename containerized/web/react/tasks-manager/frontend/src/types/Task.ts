import type { User } from './User';

export type TaskUser = Pick<User, 'id' | 'name' | 'email' | 'avatar' | 'role'>;

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignedTo: TaskUser[];
  dueDate?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  tags: string[];
  projectId?: number | null;
  createdBy: TaskUser;
  createdAt: string;
  updatedAt: string;
  updatedBy: TaskUser;
}

export interface TasksResponse {
  status: number;
  data: Task[];
}

export interface TaskResponse {
  status: number;
  data: Task | null;
}

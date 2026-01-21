export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  startDate?: Date;
  endDate?: Date;
  tags: string[];
  projectId?: string;
}

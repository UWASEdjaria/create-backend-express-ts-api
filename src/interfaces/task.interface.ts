export interface TaskInterface {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' |'pending' | 'in-progress' | 'completed';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
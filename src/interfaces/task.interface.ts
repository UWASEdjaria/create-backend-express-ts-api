import { TaskPriority, TaskStatus } from './enums';
export interface TaskInterface {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskCreate {
  title: string;
  description?: string; 
  priority: TaskPriority;
  status?: TaskStatus;
  dueDate?: Date;
  duration?: number;
}
export interface ITask {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: Date;
  userId: string;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

import { TaskInterface , ITaskCreate } from "../interfaces/task.interface";
import { db } from "../lib/db";
import {TaskPriority ,TaskStatus} from "../interfaces/enums"

class TaskService{
  static async createTasks(userId : string, taskData :ITaskCreate): Promise<TaskInterface> {
    try {
      if(!userId){
        throw new Error("UserID is missing in Service");
      }
      const newTask = await db.task.create({
         data :{
           title: taskData.title,
           description: taskData.description,
           priority: taskData.priority,
           status: taskData.status ?? TaskStatus.TODO,
           dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
           userId: userId,
         }
      });
      return newTask as TaskInterface
      
    } catch (error) {
      console.error("[TaskService.createTask] Database Error", error)
      throw error ;
    }
  }


static async getUserTasks(userId: string):Promise<TaskInterface[]>{
  try {
    const tasks = await db.task.findMany({
      where :{userId: userId,},
      orderBy: {createdAt: 'desc',},
    })
    return tasks as TaskInterface[];
    
  } catch (error) {
    console.error("[TaskService.getUserTasks] Database Error:", error);
    throw error;
  }
}
};
export default TaskService;
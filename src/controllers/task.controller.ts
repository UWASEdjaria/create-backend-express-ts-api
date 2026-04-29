import { Request, Response } from "express";
import  TaskService from "../services/task.service";
import { ITaskCreate } from "../interfaces/task.interface";

class TaskController {
  
  static async handleCreateTasks(req:Request , res:Response){
    try {
      const taskData: ITaskCreate = req.body;
      const task = await TaskService.createTasks(req.user.id, taskData);

      return res.status(201).json({ 
        success: true, 
        message: "Task created successfully", 
        data: task 
      });

    } catch (error) {
      console.error("[TaskController.handleCreateTasks] Error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create task" 
      });
    }
  }

  static async handleGetTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskService.getUserTasks(req.user.id);
      return res.status(200).json({ 
        success: true, 
        data: tasks 
      });
    } catch (error) {
      console.error("[TaskController.handleGetTasks] Error:", error);
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve tasks" 
      });
      
    }
  };

static async handleGetTaskById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await TaskService.getTaskById(userId, id);

     return res.status(200).json({ 
      success: true, 
      data: task 
    });
    
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
    
  }
}
};
export default TaskController;

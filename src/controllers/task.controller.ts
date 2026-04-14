import { Request, Response } from "express";
import * as TaskService from "../services/task.service";

export const handleCreateTasks = async (req: any, res: Response) => {
  try {
    const tasks = await TaskService.createTask(req.user.id, req.body);
    res.status(201).json({ 
      success: true, 
      message: "Task created successfully", 
      data: tasks 
    });
  } catch (error) {
     console.error("Create task error:", error); 
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const handleGetTasks = async (req: any, res: Response) => {
  try {
    const tasks = await TaskService.getUserTasks(req.user.id);
    res.status(200).json({ 
      success: true, 
      data: tasks 
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
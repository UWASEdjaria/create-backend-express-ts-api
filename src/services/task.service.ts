import { PrismaClient } from "@prisma/client";
import { TaskInterface } from "../interfaces/task.interface";
import { db } from "../lib/db";

const prisma = new PrismaClient();
export const createTask = async (
  userId: string,
  taskData: { title: string; description?: string; priority: 'low' | 'medium' | 'high' ; status?: string}
): Promise<TaskInterface> => {
  console.log("SERVICE RECEIVED DATA:", { userId, taskData });
  try {
    if (!userId) {
      throw new Error("UserID is missing in Service");
    }

    const newTask = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        userId: userId,
       status: taskData.status || "todo",
      },
    });

    return newTask as unknown as TaskInterface;
  } catch (error) {

    console.error("DATABASE CRASH ERROR:", error);
    throw error; 
  }
};
export const getUserTasks = async (userId: string) => {
  return await db.task.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
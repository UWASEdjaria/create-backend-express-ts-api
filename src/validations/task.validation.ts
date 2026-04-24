import { z } from "zod";
import { TaskPriority, TaskStatus } from "../interfaces/enums";
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Task title must be at least 3 characters long")
    .max(100, "Title is too long"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  priority: z
   .nativeEnum(TaskPriority, {
      errorMap: () => ({ message: "Please select a valid priority level" }),
    }),
    dueDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
    

  status: z
    .nativeEnum(TaskStatus)
    .optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

import { z } from "zod";

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
    .enum(["low", "medium", "high"], {
      errorMap: () => ({ message: "Please select a valid priority level" }),
    })
    .default("medium"),
  status: z
    .enum(["todo", "in-progress", "completed"])
    .default("todo"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

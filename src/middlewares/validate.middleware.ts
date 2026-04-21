import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AnyZodObject } from "zod/v3";


export const validate = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
      
    } catch (error) {
if (error instanceof ZodError) {
const errorMessages = error.issues.map((issue) => issue.message);
        
        console.error("VALIDATION FAILED:", errorMessages);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: errorMessages,
      });
  }
  return res.status(500).json({
        success: false,
        message: "Internal server error during validation",
      });
    }
  };


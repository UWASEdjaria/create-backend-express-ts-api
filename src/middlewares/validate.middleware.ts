import { Request, Response, NextFunction } from "express";

export const validate = (schema: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error: any) {
      console.error("VALIDATION FAILED:", error.errors?.map((err: any) => err.message));
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors?.map((err: any) => err.message),
      });
    }
  };

import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        success: false, 
        message: "No token provided. Please login." 
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key") as any;

    // 3. Attach user to request

    req.user = { id: decoded.id }; 

    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token." 
    });
  }
};
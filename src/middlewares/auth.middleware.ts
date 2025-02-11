import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../configs/logger";

export const verifyToken = (req: any, res: any, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.userId = (decoded as any).id; 
    next();
  } catch (error) {
    console.log("Invalid token", error);
    logger.error('Middleware : Error invalid token', error);
    return res.status(403).json({ message: "Invalid token" });
  }
};
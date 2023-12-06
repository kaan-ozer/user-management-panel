import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../schemas/user";
const secretKey: Secret = "root";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

declare namespace Express {
  export interface Request {
    user?: User; // Assuming User is the type of your user object
  }
}

function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user: User = jwt.verify(token, secretKey) as User;
    req.user = user;
    next();
  } catch (err: any) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default authenticateJWT;

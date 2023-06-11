import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ error: [{ msg: "No Token, Access Denied" }] });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ error: [{ msg: "Invalid Token" }] });
  }
};

export default auth;

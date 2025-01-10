import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.sendStatus(401); // Unauthorized
    return;
  }
  const token = authHeader.split(" ")[1];
  if (process.env.ACCESS_KEY) {
    const result = jwt.verify(token, process.env.ACCESS_KEY) as jwt.JwtPayload;
    if (!result) {
      res.sendStatus(401);
      return;
    }
    req.user = result.username;
    next();
  }
};

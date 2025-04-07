import type { NextFunction, Request, Response } from "express";

import type { IReqUser } from "@/shared/types/auth";

import { getUserData } from "@/lib/jwt";
import { AppError } from "@/utils/app-error";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers?.authorization;

  if (!authorization) {
    throw new AppError("Unauthorized", 403);
  }

  const [prefix, token] = authorization.split(" ");

  if (!(prefix === "Bearer" && token)) {
    throw new AppError("Unauthorized", 403);
  }

  const user = getUserData(token);

  if (!user) {
    throw new AppError("Unauthorized", 403);
  }

  (req as IReqUser).user = user;

  next();
}

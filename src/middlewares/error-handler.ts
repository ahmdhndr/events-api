import type { NextFunction, Request, Response } from "express";

import env from "@/env";
import { AppError } from "@/utils/app-error";

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  let customError = err;

  // Jika error bukan instance dari AppError, buat error baru
  if (!(err instanceof AppError)) {
    customError = new AppError("Internal Server Error", 500);
  }

  const appError = customError as AppError;

  res.status(appError.statusCode).json({
    success: false,
    message: appError.message,
    ...(env.NODE_ENV === "development" && { stack: appError.stack }),
  });
}

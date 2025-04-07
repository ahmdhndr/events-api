import type { NextFunction, Request, Response } from "express";

import env from "@/env";
import { AppError } from "@/utils/app-error";
import { INTERNAL_SERVER_ERROR } from "@/utils/http-status-codes";

export function onError(err: Error, _req: Request, res: Response, _next: NextFunction) {
  let customError = err;

  // Jika error bukan instance dari AppError, buat error baru
  if (!(err instanceof AppError)) {
    customError = new AppError("Internal Server Error", Number(INTERNAL_SERVER_ERROR), true, "error");
  }

  const appError = customError as AppError;

  res.status(appError.statusCode).json({
    status: appError.status,
    message: appError.message,
    data: null,
    ...(env.NODE_ENV === "development" && { stack: appError.stack }),
  });
}

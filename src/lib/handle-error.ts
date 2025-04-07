import type { Response } from "express";

import * as yup from "yup";

import { AppError } from "@/utils/app-error";

export function handleError(error: unknown, res: Response) {
  let statusCode = 500;
  let status = "error";
  let message = "Internal Server Error";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    status = "failed";
    message = error.message;
  }
  else if (error instanceof yup.ValidationError) {
    statusCode = 400;
    status = "failed";
    message = error.message;
  }

  res.status(statusCode).json({
    status,
    message,
    data: null,
  });
}

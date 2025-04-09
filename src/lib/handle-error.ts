import type { Response } from "express";

import mongoose from "mongoose";
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

  if (error instanceof yup.ValidationError) {
    statusCode = 400;
    status = "failed";
    message = error.message;
  }

  if (error instanceof mongoose.Error) {
    statusCode = 400;
    status = "failed";
    message = `${error.name}: ${error.message}`;
  }

  if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    status = "failed";
    message = `${error.name}: Cast to ObjectId failed`;
  }

  return res.status(statusCode).json({
    status,
    message,
    data: null,
  });
}

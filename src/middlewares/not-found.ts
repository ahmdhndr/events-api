import type { Request, Response } from "express";

import { NOT_FOUND } from "@/utils/http-status-codes";
import { NOT_FOUND as NOT_FOUND_MESSAGE } from "@/utils/http-status-phrases";

function notFound(req: Request, res: Response) {
  res.status(NOT_FOUND).json({
    success: false,
    message: `${NOT_FOUND_MESSAGE} - ${req.path}`,
  });
}

export default notFound;

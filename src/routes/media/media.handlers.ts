import type { Response } from "express";

import type { IReqUser } from "@/shared/types/auth";

import { handleError } from "@/lib/handle-error";
import uploader from "@/lib/uploader";

export async function singleUpload(req: IReqUser, res: Response) {
  try {
    if (!req.file) {
      res.status(400).json({
        status: "failed",
        message: "No file uploaded",
        data: null,
      });
    }

    const result = await uploader.uploadSingleFile(req.file!);
    res.json({
      status: "success",
      message: "File uploaded",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}

export async function multipleUpload(req: IReqUser, res: Response) {
  try {
    if (!req.files || req.files.length === 0) {
      res.status(400).json({
        status: "failed",
        message: "No files uploaded",
        data: null,
      });
    }

    const result = await uploader.uploadMultipleFile(req.files as unknown as Express.Multer.File[]);
    res.json({
      status: "success",
      message: "Files uploaded",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}

export async function removeFile(req: IReqUser, res: Response) {
  try {
    const { fileUrl } = req.body as { fileUrl: string };
    await uploader.removeFile(fileUrl);

    res.json({
      status: "success",
      message: "File removed",
      data: null,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}

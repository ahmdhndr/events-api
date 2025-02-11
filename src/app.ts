import type { Request, Response } from "express";

import express from "express";

import { errorHandler } from "@/middlewares/error-handler";
import { AppError } from "@/utils/app-error";

import { logger } from "./middlewares/pino-logger";
import serveEmojiFavicon from "./middlewares/serve-emoji-favicon";

const app = express();

app.use(express.json());
app.use(serveEmojiFavicon("🚀"));
app.use(logger());

app.get("/", (req: Request, res: Response) => {
  req.log.info("Pino Logger");
  res.json({
    message: "Hello world!",
  });
});

app.get("/error", (_req, _res) => {
  throw new AppError("Oh no!", 400);
});

app.use(errorHandler);

export default app;

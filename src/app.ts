import type { Request, Response } from "express";

import createApp from "@/lib/create-app";
import notFound from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";

import { AppError } from "./utils/app-error";

const app = createApp();

app.get("/", (req: Request, res: Response) => {
  req.log.info("Pino Logger");
  res.json({
    message: "Hello world!",
  });
});

app.get("/error", (_req, _res) => {
  throw new AppError("Oh no!", 422);
});

app.use(notFound);
app.use(onError);

export default app;

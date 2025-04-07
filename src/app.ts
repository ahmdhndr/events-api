import type { Request, Response } from "express";

import createApp from "@/lib/create-app";
import notFound from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";
import auth from "@/routes/auth/auth.route";
import index from "@/routes/index.route";
import media from "@/routes/media/media.route";

const app = createApp();

const routes = [
  index,
  auth,
  media,
] as const;

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
  });
});

routes.forEach((route) => {
  app.use("/api", route);
});

app.use(notFound);
app.use(onError);

export default app;

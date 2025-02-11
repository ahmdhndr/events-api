import express from "express";

import { logger } from "@/middlewares/pino-logger";
import serveEmojiFavicon from "@/middlewares/serve-emoji-favicon";

export default function createApp() {
  const app = express();

  app.use(serveEmojiFavicon("🚀"));
  app.use(express.json());
  app.use(logger());

  return app;
}

import type { CorsOptions } from "cors";

import cors from "cors";
import express from "express";

import { logger } from "@/middlewares/pino-logger";
import serveEmojiFavicon from "@/middlewares/serve-emoji-favicon";

const corsOptions: CorsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

export default function createApp() {
  const app = express();

  app.use(cors(corsOptions));
  app.use(serveEmojiFavicon("🚀"));
  app.use(express.json());
  app.use(logger());

  return app;
}

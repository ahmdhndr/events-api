import { randomUUID } from "node:crypto";
import pino from "pino";
import pinoHttp from "pino-http";

import env from "@/env";

export function logger() {
  const isDev = env.NODE_ENV === "development";

  const loggerPrint = pino(
    isDev
      ? {
          transport: {
            target: "pino-pretty",
            options: { sync: true }, // Menjaga agar log tetap muncul dalam container/Docker
          },
        }
      : {},
  );

  return pinoHttp({
    quietReqLogger: true,
    logger: loggerPrint,
    genReqId: (req, res) => {
      const existingID = req.id ?? req.headers["x-request-id"];
      if (existingID) {
        return existingID;
      }
      const id = randomUUID();
      res.setHeader("X-Request-Id", id);
      return id;
    },
    // Define custom serializers
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
    },
    // Define a custom logger level
    customLogLevel(req, res, err) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return "warn";
      }
      else if (res.statusCode >= 500 || err) {
        return "error";
      }
      else if (res.statusCode >= 300 && res.statusCode < 400) {
        return "silent";
      }
      return "info";
    },
  });
}

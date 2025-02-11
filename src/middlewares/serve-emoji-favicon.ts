import type { NextFunction, Request, Response } from "express";

// eslint-disable-next-line antfu/top-level-function
const serveEmojiFavicon = (emoji: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.path === "/favicon.ico") {
      res.header("Content-Type", "image/svg+xml");
      res.send(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" x=".1em" font-size="90">${emoji}</text></svg>`,
      );
      return;
    }
    next();
  };
};

export default serveEmojiFavicon;

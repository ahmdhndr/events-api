import type { NextFunction, Response } from "express";

import type { IReqUser } from "@/shared/types/auth";

export default (roles: string[]) => {
  return (req: IReqUser, res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!role || !roles.includes(role)) {
      res.status(403).json({
        status: "failed",
        message: "Access denied",
        data: null,
      });
    }

    next();
  };
};

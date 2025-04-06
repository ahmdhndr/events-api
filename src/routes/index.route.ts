import type { Request, Response } from "express";

import createApp from "@/lib/create-app";
import aclMiddleware from "@/middlewares/acl-middleware";
import { authMiddleware } from "@/middlewares/auth-middleware";
import { ROLES } from "@/utils/constants";

const router = createApp();

router.get("/", (req, res) => {
  res.json({
    message: "Event API",
  });
});

router.get("/test-acl", [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])], (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Test ACL",
    data: null,
  });
});

export default router;

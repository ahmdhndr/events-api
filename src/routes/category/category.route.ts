import createApp from "@/lib/create-app";
import aclMiddleware from "@/middlewares/acl-middleware";
import { authMiddleware } from "@/middlewares/auth-middleware";
import { ROLES } from "@/utils/constants";

import * as handlers from "./category.handlers";

const router = createApp();

router.post(
  "/category",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN]),
  ],
  handlers.create,
);

router.get("/category", handlers.findAll);

router.get("/category/:id", handlers.findOne);

router.put(
  "/category/:id",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN]),
  ],
  handlers.update,
);

router.delete(
  "/category/:id",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN]),
  ],
  handlers.remove,
);

export default router;

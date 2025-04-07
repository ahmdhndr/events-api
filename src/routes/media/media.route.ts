import createApp from "@/lib/create-app";
import aclMiddleware from "@/middlewares/acl-middleware";
import { authMiddleware } from "@/middlewares/auth-middleware";
import mediaMiddleware from "@/middlewares/media-middleware";
import { ROLES } from "@/utils/constants";

import * as handlers from "./media.handlers";

const router = createApp();

router.post(
  "/media/upload-single",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
    mediaMiddleware.upload("file"),
  ],
  handlers.singleUpload,
);

router.post(
  "/media/upload-multiple",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
    mediaMiddleware.upload("files", "multiple"),
  ],
  handlers.multipleUpload,
);

router.delete(
  "/media/remove",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
  ],
  handlers.removeFile,
);

export default router;

import createApp from "@/lib/create-app";
import aclMiddleware from "@/middlewares/acl-middleware";
import { authMiddleware } from "@/middlewares/auth-middleware";
import { ROLES } from "@/utils/constants";

import * as handlers from "./event.handlers";

const router = createApp();

router.post("/events", [authMiddleware, aclMiddleware([ROLES.ADMIN])], handlers.createEvent);
router.get("/events", handlers.getEvents);
router.get("/events/:id", handlers.getEvent);
router.get("/events/:slug/slug", handlers.getEventBySlug);
router.put("/events/:id", [authMiddleware, aclMiddleware([ROLES.ADMIN])], handlers.updateEvent);
router.delete("/events/:id", [authMiddleware, aclMiddleware([ROLES.ADMIN])], handlers.removeEvent);

export default router;

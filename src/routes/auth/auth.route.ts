import createApp from "@/lib/create-app";
import { authMiddleware } from "@/middlewares/auth-middleware";

import * as handlers from "./auth.handlers";

const router = createApp();

router.post("/auth/register", handlers.register);
router.post("/auth/activation", handlers.activation);
router.post("/auth/login", handlers.login);
router.get("/auth/me", authMiddleware, handlers.me);

export default router;

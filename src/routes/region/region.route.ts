import createApp from "@/lib/create-app";

import * as handlers from "./region.handlers";

const router = createApp();

router.get("/regions", handlers.getAllProvinces);
router.get("/regions/:id/province", handlers.getProvince);
router.get("/regions/:id/regency", handlers.getRegency);
router.get("/regions/:id/district", handlers.getDistrict);
router.get("/regions/:id/village", handlers.getVillage);
router.get("/regions-search", handlers.findByCityName);

export default router;

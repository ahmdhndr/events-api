import createApp from "@/lib/create-app";

const router = createApp();

router.get("/", (req, res) => {
  res.json({
    message: "Event API",
  });
});

export default router;

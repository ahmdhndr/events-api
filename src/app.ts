import createApp from "@/lib/create-app";
import notFound from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";
import index from "@/routes/index.route";

const app = createApp();

const routes = [
  index,
] as const;

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

routes.forEach((route) => {
  app.use("/api", route);
});

app.use(notFound);
app.use(onError);

export default app;

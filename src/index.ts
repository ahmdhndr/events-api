import app from "./app";
import env from "./env";

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${env.PORT}`);
});

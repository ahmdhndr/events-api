import connect from "@/db";

import app from "./app";
import env from "./env";

async function init() {
  try {
    await connect().then((status) => {
      // eslint-disable-next-line no-console
      console.log(status);
    });

    app.listen(env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on http://localhost:${env.PORT}`);
    });
  }
  catch (error) {
    console.error(error);
  }
}

init();

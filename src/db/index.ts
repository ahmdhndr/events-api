import mongoose from "mongoose";

import env from "@/env";

export default async function connect() {
  try {
    await mongoose.connect(env.MONGO_URI, { dbName: "events-app" });
    return Promise.resolve("Database connected!");
  }
  catch (error) {
    Promise.reject(error);
    process.exit(1);
  }
}

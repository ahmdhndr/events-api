import crypto from "node:crypto";

import env from "@/env";

export default function encrypt(encryptable: string) {
  const encryptedPassword = crypto.pbkdf2Sync(encryptable, env.SECRET, 1000, 64, "sha512").toString("hex");
  return encryptedPassword;
}

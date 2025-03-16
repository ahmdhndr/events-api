import { randomBytes } from "node:crypto";

export function generateActivationCode() {
  return randomBytes(16).toString("hex");
}

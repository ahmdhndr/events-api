import type { Types } from "mongoose";

import jwt from "jsonwebtoken";

import type { IUser } from "@/shared/types/user";

import env from "@/env";

export interface IUserToken extends Omit<IUser, "fullName" | "username" | "email" | "avatar" | "password" | "activationCode" | "isActive"> {
  id?: Types.ObjectId;
};

export function generateToken(user: IUserToken): string {
  const token = jwt.sign(user, env.SECRET, {
    expiresIn: "1h",
  });

  return token;
}

export function getUserData(token: string) {
  const user = jwt.verify(token, env.SECRET) as IUserToken;
  return user;
}

import type { Request } from "express";

import type { IUserToken } from "@/lib/jwt";

export interface IReqUser extends Request {
  user?: IUserToken;
}

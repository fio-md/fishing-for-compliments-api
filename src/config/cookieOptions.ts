import { CookieOptions } from "express";

export const cookieOpt: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

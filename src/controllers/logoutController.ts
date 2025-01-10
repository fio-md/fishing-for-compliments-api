import db from "../db/database.js";
import { Request, Response } from "express";
import { cookieOpt } from "../config/cookieOptions.js";

export const logoutUser = async (req: Request, res: Response) => {
  // on client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.sendStatus(204); // no content to send back
    return;
  }

  const refreshToken = cookies.jwt;

  // check if db has refreshToken
  const foundUser = db("users").where({ refresh_token: refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", cookieOpt); // clear cookie
    res.sendStatus(204);
    return;
  }

  try {
    // update user's refreshToken to null and clear cookie
    const deleteToken = await foundUser.update({ refresh_token: "(NULL)" });
    res.clearCookie("jwt", cookieOpt); // secure: true - only serves  on https
    res.sendStatus(204);
  } catch (e) {
    res.send("Unable to delete refreshToken");
  }
};

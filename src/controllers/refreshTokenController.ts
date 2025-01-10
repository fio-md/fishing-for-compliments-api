import db from "../db/database.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { Request, Response } from "express";

const { ACCESS_KEY, REFRESH_KEY } = process.env;

export const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.sendStatus(401);
    return;
  }

  const refreshToken = cookies.jwt;
  const foundUser = db("users").where({ refresh_token: refreshToken });

  if (!foundUser) {
    res.sendStatus(403); //forbidden
    return;
  }
  if (!ACCESS_KEY || !REFRESH_KEY) {
    res.status(400).send("Missing environment variables");
    return;
  }

  const result = jwt.verify(refreshToken, REFRESH_KEY) as JwtPayload;

  if (!result) {
    res.sendStatus(403);
    return;
  }
  const accessToken = jwt.sign({ username: result.username }, ACCESS_KEY, {
    expiresIn: "5m",
  });

  res.json({ accessToken });
};

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
    res.clearCookie("jwt", { httpOnly: true }); // clear cookie
    res.sendStatus(204);
    return;
  }

  try {
    // update user's refreshToken to null and clear cookie
    const deleteToken = await foundUser.update({ refreshToken: null });
    res.clearCookie("jwt", { httpOnly: true }); // secure: true (in production
    res.sendStatus(204);
  } catch (e) {
    res.send("Unable to delete refreshToken");
  }
};

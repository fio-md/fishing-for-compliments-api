import db from "../db/database.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { Request, Response } from "express";

const { ACCESS_KEY, REFRESH_KEY } = process.env;

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Username and password required.");
    return;
  }

  // find username in database
  const foundUser = await db("users").where({ username }).first();
  if (!foundUser) {
    res.status(400).send("User not found");
    return;
  }

  const checkPassword = await bcrypt.compare(password, foundUser.password);
  if (checkPassword) {
    if (!ACCESS_KEY || !REFRESH_KEY) {
      res.status(400).send("Missing environment variables");
      return;
    }

    const accessToken = jwt.sign({ username: foundUser.username }, ACCESS_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      REFRESH_KEY,
      {
        expiresIn: "30d",
      }
    );
    // store refreshToken for current user
    await db("users")
      .where({ username: foundUser.username })
      .update({ refresh_token: refreshToken });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    });
    res.status(200).json({ accessToken });
  } else {
    res.status(500).send("Invalid username/password combitnation.");
  }
};

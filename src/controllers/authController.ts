import db from "../db/database.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { Request, Response } from "express";
import { UserFormDto } from "../dtos/UserForm.dto.js";

const { ACCESS_KEY, REFRESH_KEY } = process.env;

export const registerUser = async (
  req: Request<{}, {}, UserFormDto>,
  res: Response
) => {
  const { username, password } = req.body;
  // check if username is available
  const user = await db("users").where({ username: username });
  if (user.length) {
    res.status(400).send("Username already exists.");
    return;
  }

  const salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash(password, salt);
  const addUser = await db("users").insert({
    username: username,
    password: hashedPassword,
  });
  // find new user in database
  const newUser = await db("users").where({ id: addUser[0] }).first();
  res.status(201).send(`User ${newUser.username} has been added.`);
};

// temp database
let refreshTokens: string[] = [];

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Username and password required.");
    return;
  }

  const foundUser = await db("users").where({ username }).first();
  if (!foundUser) {
    res.status(400).send("User not found");
    return;
  }

  const checkPassword = await bcrypt.compare(password, foundUser.password);
  if (checkPassword) {
    if (ACCESS_KEY && REFRESH_KEY) {
      const accessToken = jwt.sign(
        { username: foundUser.username },
        ACCESS_KEY,
        {
          expiresIn: "15m",
        }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        REFRESH_KEY,
        {
          expiresIn: "1d",
        }
      );
      // store refreshToken for current user
      await db("users")
        .where({ username: foundUser.username })
        .update({ refresh_token: refreshToken });
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // maxAge = 1 day in ms
      });
      res.status(200).json({ accessToken });
    } else {
      res.status(400).send("Missing environment variables");
      return;
    }
  } else {
    res.status(500).send("Invalid username/password combitnation.");
  }
};

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
  if (ACCESS_KEY && REFRESH_KEY) {
    const result = jwt.verify(refreshToken, REFRESH_KEY) as JwtPayload;
    if (!result) {
      res.sendStatus(403);
      return;
    }
    const accessToken = jwt.sign({ username: result.username }, ACCESS_KEY, {
      expiresIn: "5m",
    });
    res.json({ accessToken });
  }
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

  // delete refreshToken in database
  try {
    const deleteToken = await foundUser.update({ refreshToken: null });
    // clear cookie
    res.clearCookie("jwt", { httpOnly: true }); // secure: true (in production
    res.sendStatus(204);
  } catch (e) {
    res.send("Unable to delete refreshToken");
  }
};

import db from "../db/database.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import { Request, Response } from "express";
import { UserFormDto } from "../dtos/UserForm.dto.js";

export const validateUsername = async (req: Request, res: Response) => {
  const { username } = req.query;
  try {
    const findUsername = await db("users").where({ username: username });
    if (findUsername.length) {
      res.json({ isAvailable: false });
    } else {
      res.json({ isAvailable: true });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Unable to validate username");
  }
};

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

  // encrypt password and add to database
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

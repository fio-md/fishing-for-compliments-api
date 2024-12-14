import { Request, Response } from "express";
import db from "../db/database";

export const getRanking = async (_req: Request, res: Response) => {
  try {
    const users = await db("user_fish")
      .join("users", "users.id", "user_fish.user_id")
      .count("user_fish.id as fish_caught")
      .select("username", "users.id")
      .groupBy("username", "users.id")
      .orderBy("fish_caught", "desc")
      .limit(10);
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Unable to get ranking." });
  }
};

export const getRandomFish = async (_req: Request, res: Response) => {
  try {
    const allFish = await db("fish");
    const allCompliments = await db("compliments");

    const randomFish: string =
      allFish[Math.floor(Math.random() * allFish.length)];
    const randomCompliment: string =
      allCompliments[Math.floor(Math.random() * allCompliments.length)];
    res.status(200).json({ randomFish, randomCompliment });
  } catch (e) {
    res.status(400).send(`Unable to get data: ${e}`);
  }
};

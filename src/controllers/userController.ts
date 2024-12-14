import db from "../db/database.js";
import "dotenv/config";
import { Request, Response } from "express";

export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const username = req.user;
    const hasInventory = await db("user_fish")
      .where({ username: username })
      .join("users", "user_fish.user_id", "users.id");

    if (!hasInventory.length) {
      res.status(200).json({ username, inventory: [] });
      return;
    }

    const inventory = await db("user_fish")
      .select("id", "image", "compliment")
      .where({ username: username })
      .join("users", "user_fish.user_id", "users.id")
      .join("fish", "user_fish.fish_id", "fish.id")
      .join("compliments", "user_fish.compliment_id", "compliments.id");

    res.status(200).json({ username, inventory });
  } catch (e) {
    res.status(500).send("Unable to get user data.");
  }
};

export const addToInventory = async (req: Request, res: Response) => {
  const username = req.user;
  const userId = await db("users")
    .select("id")
    .where({ username: username })
    .first();

  const result = await db("user_fish").insert({
    user_id: userId.id,
    ...req.body,
  });
  const addedFish = await db("user_fish").where({ id: result[0] }).first();

  if (addedFish) {
    res.status(201).json(addedFish);
  } else {
    res.status(500).send("Unable to add fish to user's inventory.");
  }
};

export const getFishInfo = async (req: Request, res: Response) => {
  const fishId = Number(req.params.id);
  try {
    const fish = await db("user_fish")
      .select("user_fish.id", "image", "type", "compliment")
      .where({ "user_fish.id": fishId })
      .join("users", "user_fish.user_id", "users.id")
      .join("fish", "user_fish.fish_id", "fish.id")
      .join("compliments", "user_fish.compliment_id", "compliments.id")
      .first();
    res.status(200).json({ fish });
  } catch (e) {
    res.status(500).send(`Unable to get info for id ${fishId}. ${e}`);
  }
};

export const deleteFish = async (req: Request, res: Response) => {
  const fishId = Number(req.params.id);
  try {
    const deleteFish = await db("user_fish").where({ id: fishId }).del();
    res.status(200).send("Successfully removed fish from database.");
  } catch (e) {
    res.status(500).send(`Unable to remove fish with id: ${fishId}}. ${e}`);
  }
};

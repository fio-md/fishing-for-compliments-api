import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const getLeaderboard = async (_req, res) => {
  try {
    const users = await knex("fish")
      .join("users", "users.id", "fish.user_id")
      .count("fish.id as fish_caught")
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

export { getLeaderboard };

import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";

const knex = initKnex(configuration);
const SECRET_KEY = "f91e4494-04b3-4d49-8c27-57faed9e5785";

function getToken(req) {
  if (!req.headers.token) {
    return;
  } else {
    return req.headers.token;
  }
}

const getUserData = async (req, res) => {
  const token = getToken(req);
  if (token) {
    if (jwt.verify(token, SECRET_KEY)) {
      try {
        const username = await knex("users").select("username").where({ id: req.params.id }).first();
        const userInventory = await knex("fish").where({ user_id: req.params.id });
        res.status(200).json({ username, inventory: userInventory });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Unable to get user data." });
      }
    } else {
      res.status(403).json({ error: "Invalid token. Unauthorized." });
    }
  } else {
    res.status(403).json({ error: "No token. Unauthorized." });
  }
};

const addFish = async (req, res) => {
  const userID = req.params.id;
  try {
    const result = await knex("fish").insert({ user_id: userID, ...req.body });
    const addedFish = await knex("fish").where({ id: result[0] }).first();
    res.status(201).json(addedFish);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Unable to add fish to user's inventory." });
  }
};

const deleteFish = async (req, res) => {
  const { fishID } = req.body;
  try {
    const fishToDelete = await knex("fish").where({ id: fishID }).first();
    if (!fishToDelete) {
      res.status(400).json({ message: `Unable to find fish with ID ${fishID}` });
    } else {
      const result = await knex("fish").where({ id: fishID }).delete();
      res.status(200).json({ message: "Fish deleted" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Unable to delete fish");
  }
};

export { getUserData, addFish, deleteFish };

import initKnex from "knex";
import configuration from "../../knexfile.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const knex = initKnex(configuration);

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // check if username is available
  const user = await knex("users").where({ username: username });
  if (user.length) {
    return res.status(400).send("Username already exists.");
  } else {
    const salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(password, salt);
    const addUser = await knex("users").insert({
      username: username,
      password: hashedPassword,
    });
    // find new user in database
    const newUser = await knex("users").where({ id: addUser[0] }).first();
    res.status(201).send(`User ${newUser.username} has been added.`);
  }
};

export function authenticateToken(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await knex("users").where({ username }).first();
  if (!user) {
    return res.status(400).send("User not found");
  }

  try {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const token = jwt.sign({ username }, process.env.SECRET_KEY);
      res.status(200).json({ token });
    } else {
      res.status(500).send("Invalid username/password combitnation.");
    }
  } catch (e) {
    res.status(500).send(`Login error: ${e}`);
  }
};

export const getUserData = async (req, res) => {
  try {
    const username = req.user.username;
    const inventory = await knex("user_fish")
      .select("id", "image", "compliment")
      .where({ username })
      .join("users", "user_fish.user_id", "users.id")
      .join("fish", "user_fish.fish_id", "fish.id")
      .join("compliments", "user_fish.compliment_id", "compliments.id");

    res.status(200).json({ username, inventory });
  } catch (e) {
    res.status(500).send("Unable to get user data.");
  }
};

export const addToInventory = async (req, res) => {
  const username = req.user.username;
  const userId = await knex("users")
    .select("id")
    .where({ username: username })
    .first();

  const result = await knex("user_fish").insert({
    user_id: userId.id,
    ...req.body,
  });
  const addedFish = await knex("user_fish").where({ id: result[0] }).first();

  if (addedFish) {
    res.status(201).json(addedFish);
  } else {
    res.status(500).send("Unable to add fish to user's inventory.");
  }
};

export const getFishInfo = async (req, res) => {
  const fishId = Number(req.params.id);
  try {
    const fish = await knex("user_fish")
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

export const deleteFish = async (req, res) => {
  const fishId = Number(req.params.id);
  try {
    const deleteFish = await knex("user_fish").where({ id: fishId }).del();
    res.status(200).send("Successfully removed fish from database.");
  } catch (e) {
    res.status(500).send(`Unable to remove fish with id: ${fishId}}. ${e}`);
  }
};

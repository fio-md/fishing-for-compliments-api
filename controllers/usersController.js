import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const knex = initKnex(configuration);
const SECRET_KEY = "f91e4494-04b3-4d49-8c27-57faed9e5785";

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const findUser = await knex("users").where({ username: username });
    if (findUser.length === 0) {
      let hashedPassword = await bcrypt.hash(password, 8);
      const addUser = await knex("users").insert({ username: username, password: hashedPassword });
      const newUser = await knex("users").where({ id: addUser[0] }).first();
      res.status(201).json(newUser);
    } else {
      res.status(400).send("Username already exists.");
    }
  } catch (e) {
    console.error(e);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const findUser = await knex("users").where({ username: username }).first();
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (findUser && checkPassword) {
      const token = jwt.sign({ username }, SECRET_KEY);
      res.status(200).json({ token, user_id: findUser.id });
    } else {
      res.status(400).send("Invalid username/password combination.");
    }
  } catch (e) {
    console.error(e);
  }
};

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
      res.status(403).json({ error: "Not Authorized." });
    }
  } else {
    res.status(403).json({ error: "No token. Unauthorized." });
  }
};

const updateFavorite = async (req, res) => {
  try {
    const updateCurrentFavorite = await knex("fish")
      .where({ user_id: req.params.id, is_favorite: true })
      .update({ is_favorite: false });
    const updateNewFavorite = await knex("fish")
      .where({ user_id: req.body.id, is_favorite: false })
      .update({ is_favorite: true });
    res.status(400).json({ message: "Updated favorite fish." });
  } catch (e) {
    res.status(500).json({ message: "Unable to update favorite fish." });
  }
};
const addToInventory = async (req, res) => {
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

const getRanking = async (_req, res) => {
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

export { registerUser, loginUser, getRanking, getUserData, addToInventory, updateFavorite };

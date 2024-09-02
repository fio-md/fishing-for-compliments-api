import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const knex = initKnex(configuration);
const SECRET_KEY = "f91e4494-04b3-4d49-8c27-57faed9e5785";

const validateUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const findUsername = await knex("users").where({ username: username });
    if (findUsername.length === 0) {
      res.status(200).json({ message: "Username available" });
    } else {
      res.status(200).json({ message: "Username unavailable" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Unable to verify username");
  }
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const findUser = await knex("users").where({ username: username }).first();
    if (findUser) {
      res.status(400).send("Username already exists");
    } else {
      let hashedPassword = await bcrypt.hash(password, 8);
      const addUser = await knex("users").insert({ username: username, password: hashedPassword });
      const newUser = await knex("users").where({ id: addUser[0] }).first();
      res.status(201).json(newUser);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Unable to register user");
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const findUser = await knex("users").where({ username: username }).first();

    if (!findUser) {
      res.status(400).send("Username doesn't exist");
    } else {
      const checkPassword = await bcrypt.compare(password, findUser.password);
      if (checkPassword) {
        const token = jwt.sign({ username }, SECRET_KEY);
        res.status(200).json({ token, user_id: findUser.id });
      } else {
        res.status(400).send("Invalid username/password combination.");
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Unable to login user");
  }
};

export { registerUser, validateUsername, loginUser };

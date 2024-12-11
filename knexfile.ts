import { Knex } from "knex";
import "dotenv/config";

const configs: Knex.Config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8",
  },
  migrations: {
    directory: "./migrations",
  },
};

export default configs;

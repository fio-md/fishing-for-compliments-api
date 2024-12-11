import knex from "knex";
import configs from "../../knexfile.js";

const db = knex(configs);

export default db;

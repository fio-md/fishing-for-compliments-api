import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "user",
      password: "1234",
    },
    {
      id: 2,
      username: "FlyFisher",
      password: "1234",
    },
    {
      id: 3,
      username: "TunaCatcher",
      password: "1234",
    },
  ]);
}

import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "angler101",
      password: "fishpass",
    },
    {
      id: 2,
      username: "catcher88",
      password: "hooked2023",
    },
    {
      id: 3,
      username: "sharkbait",
      password: "bigfish123",
    },
    {
      id: 4,
      username: "reelfanatic",
      password: "tacklebox",
    },
    {
      id: 5,
      username: "seaweedmaster",
      password: "bluewater",
    },
    {
      id: 6,
      username: "hookedonit",
      password: "fishlover",
    },
    {
      id: 7,
      username: "deepseadiver",
      password: "coralreef",
    },
    {
      id: 8,
      username: "castingking",
      password: "fishhook",
    },
    {
      id: 9,
      username: "catchandrelease",
      password: "gobyfish",
    },
    {
      id: 10,
      username: "baitnfish",
      password: "streamline",
    },
  ]);
}

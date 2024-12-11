/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
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

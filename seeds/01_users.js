/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      username: "user",
      password: "1234",
    },
    {
      username: "FlyFisher",
      password: "1234",
    },
    {
      username: "TunaCatcher",
      password: "1234",
    },
  ]);
}

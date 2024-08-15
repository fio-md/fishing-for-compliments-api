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
      username: "user1",
      password: "1234",
    },
    {
      id: 2,
      username: "user2",
      password: "1234",
    },
  ]);
}

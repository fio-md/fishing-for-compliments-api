/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("compliments").del();
  await knex("compliments").insert([
    {
      id: 1,
      compliment: "I enjoy your sense of humour.",
    },
    {
      id: 2,
      compliment: "You make me proud.",
    },
    {
      id: 3,
      compliment: "I like hanging out with you.",
    },
    {
      id: 4,
      compliment: "You are a joy to be around!",
    },
    {
      id: 5,
      compliment: "You are the smartest person I know.",
    },
    {
      id: 6,
      compliment: "You can do anything you set your mind to.",
    },
  ]);
}

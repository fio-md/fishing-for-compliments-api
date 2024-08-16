/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("fish").del();
  await knex("fish").insert([
    {
      type: "fish_01",
      compliment: "You're a joy to be around!",
      is_favorite: false,
      user_id: 1,
    },
    {
      type: "fish_01",
      compliment: "You always have a great attitude.",
      is_favorite: true,
      user_id: 1,
    },
    {
      type: "fish_03",
      compliment: "You're a bright young thing, you know?",
      is_favorite: true,
      user_id: 2,
    },
    {
      type: "fish_02",
      compliment: "I can tell you have a great work ethic.",
      is_favorite: false,
      user_id: 2,
    },
    {
      type: "fish_03",
      compliment: "You have a heart of gold.",
      is_favorite: false,
      user_id: 2,
    },
    {
      type: "fish_01",
      compliment: "You're a joy to be around!",
      is_favorite: false,
      user_id: 2,
    },
    {
      type: "fish_02",
      compliment: "You're a natural-born leader.",
      is_favorite: false,
      user_id: 3,
    },
    {
      type: "fish_01",
      compliment: "You have a wonderful sense of humor",
      is_favorite: true,
      user_id: 3,
    },
  ]);
}

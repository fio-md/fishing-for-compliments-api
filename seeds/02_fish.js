/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("fish").del();
  await knex("fish").insert([
    {
      id: 10,
      type: "fish_01",
      compliment: "You're like a ray of sunshine on a cloudy day.",
      is_favorite: false,
      user_id: 1,
    },
    {
      id: 11,
      type: "fish_01",
      compliment: "You're as inspiring as a motivational speaker.",
      is_favorite: true,
      user_id: 1,
    },
    {
      id: 12,
      type: "fish_03",
      compliment: "You're as stylish as a vintage car.",
      is_favorite: true,
      user_id: 2,
    },
    {
      id: 13,
      type: "fish_02",
      compliment: "Your aura is as vibrant as a freshly painted fire hydrant.",
      is_favorite: false,
      user_id: 2,
    },
  ]);
}

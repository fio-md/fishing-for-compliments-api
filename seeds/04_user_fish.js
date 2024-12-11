/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("user_fish").del();
  await knex("user_fish").insert([
    {
      user_id: 1,
      fish_id: 1,
      compliment_id: 2,
    },
    {
      user_id: 1,
      fish_id: 3,
      compliment_id: 4,
    },
    {
      user_id: 2,
      fish_id: 2,
      compliment_id: 4,
    },
    {
      user_id: 3,
      fish_id: 3,
      compliment_id: 3,
    },
    {
      user_id: 3,
      fish_id: 1,
      compliment_id: 1,
    },
  ]);
}

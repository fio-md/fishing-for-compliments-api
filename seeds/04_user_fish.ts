import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
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

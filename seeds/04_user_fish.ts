import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("user_fish").del();
  await knex("user_fish").insert([
    {
      user_id: 1,
      fish_id: 2,
      compliment_id: 17,
    },
    {
      user_id: 1,
      fish_id: 3,
      compliment_id: 19,
    },
    {
      user_id: 2,
      fish_id: 3,
      compliment_id: 41,
    },
    {
      user_id: 2,
      fish_id: 1,
      compliment_id: 8,
    },
    {
      user_id: 2,
      fish_id: 2,
      compliment_id: 25,
    },
    {
      user_id: 2,
      fish_id: 1,
      compliment_id: 21,
    },
    {
      user_id: 2,
      fish_id: 3,
      compliment_id: 27,
    },
    {
      user_id: 3,
      fish_id: 2,
      compliment_id: 12,
    },
    {
      user_id: 4,
      fish_id: 3,
      compliment_id: 15,
    },
    {
      user_id: 4,
      fish_id: 2,
      compliment_id: 22,
    },
    {
      user_id: 4,
      fish_id: 1,
      compliment_id: 30,
    },
    {
      user_id: 4,
      fish_id: 2,
      compliment_id: 11,
    },
    {
      user_id: 5,
      fish_id: 1,
      compliment_id: 13,
    },
    {
      user_id: 5,
      fish_id: 3,
      compliment_id: 10,
    },
    {
      user_id: 5,
      fish_id: 2,
      compliment_id: 4,
    },
    {
      user_id: 6,
      fish_id: 1,
      compliment_id: 29,
    },
    {
      user_id: 6,
      fish_id: 2,
      compliment_id: 43,
    },
    {
      user_id: 7,
      fish_id: 3,
      compliment_id: 3,
    },
    {
      user_id: 7,
      fish_id: 2,
      compliment_id: 23,
    },
    {
      user_id: 7,
      fish_id: 1,
      compliment_id: 18,
    },
    {
      user_id: 7,
      fish_id: 3,
      compliment_id: 37,
    },
    {
      user_id: 8,
      fish_id: 1,
      compliment_id: 35,
    },
    {
      user_id: 8,
      fish_id: 2,
      compliment_id: 6,
    },
    {
      user_id: 8,
      fish_id: 3,
      compliment_id: 33,
    },
    {
      user_id: 9,
      fish_id: 2,
      compliment_id: 49,
    },
    {
      user_id: 9,
      fish_id: 3,
      compliment_id: 50,
    },
    {
      user_id: 10,
      fish_id: 2,
      compliment_id: 48,
    },
    {
      user_id: 10,
      fish_id: 1,
      compliment_id: 5,
    },
    {
      user_id: 10,
      fish_id: 2,
      compliment_id: 14,
    },
    {
      user_id: 10,
      fish_id: 3,
      compliment_id: 1,
    },
  ]);
}

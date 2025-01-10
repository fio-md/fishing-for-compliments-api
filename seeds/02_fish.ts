import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("fish").del();
  await knex("fish").insert([
    {
      id: 1,
      type: "tuna",
      image: "/images/tuna.jpg",
    },
    {
      id: 2,
      type: "halibut",
      image: "/images/halibut.jpg",
    },
    {
      id: 3,
      type: "haddock",
      image: "/images/haddock.jpg",
    },
  ]);
}

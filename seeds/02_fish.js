/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
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
    {
      id: 4,
      type: "lobster",
      image: "/images/lobster.jpg",
    },
    {
      id: 5,
      type: "eel",
      image: "/images/eel.jpg",
    },
    {
      id: 6,
      type: "mackerel",
      image: "/images/mackerel.jpg",
    },
    {
      id: 7,
      type: "shrimp",
      image: "/images/shrimp.jpg",
    },
    {
      id: 8,
      type: "cod",
      image: "/images/cod.jpg",
    },
    {
      id: 9,
      type: "redfish",
      image: "/images/redfish.jpg",
    },
  ]);
}

import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("compliments").del();
  await knex("compliments").insert([
    {
      id: 1,
      compliment: "You bring light to the world just by being in it.",
    },
    {
      id: 2,
      compliment: "Your smile can turn any day around.",
    },
    {
      id: 3,
      compliment: "You have a way of making people feel heard.",
    },
    {
      id: 4,
      compliment: "Even on your hardest days, you radiate strength.",
    },
    {
      id: 5,
      compliment: "The world is better with you in it.",
    },
    {
      id: 6,
      compliment: "You’re more resilient than you know.",
    },
    {
      id: 7,
      compliment: "Your kindness leaves a lasting impact.",
    },
    {
      id: 8,
      compliment: "You’ve got a heart of gold.",
    },
    {
      id: 9,
      compliment: "You always know how to make others feel important.",
    },
    {
      id: 10,
      compliment: "You’re stronger than any challenge you face.",
    },
    {
      id: 11,
      compliment: "The way you care for others is inspiring.",
    },
    {
      id: 12,
      compliment: "You’ve got such a calm and calming presence.",
    },
    {
      id: 13,
      compliment: "There’s so much light inside you.",
    },
    {
      id: 14,
      compliment: "You make a difference in ways you might not realize.",
    },
    {
      id: 15,
      compliment: "You are truly one of a kind.",
    },
    {
      id: 16,
      compliment: "Your strength is quietly powerful.",
    },
    {
      id: 17,
      compliment: "You have a way of making everything better.",
    },
    {
      id: 18,
      compliment: "The world needs more of your kindness.",
    },
    {
      id: 19,
      compliment: "You’re the kind of person people feel lucky to know.",
    },
    {
      id: 20,
      compliment: "You’re capable of more than you give yourself credit for.",
    },
    {
      id: 21,
      compliment:
        "Your strength shines through in ways you don’t even realize.",
    },
    {
      id: 22,
      compliment: "You make the world a little brighter just by being you.",
    },
    {
      id: 23,
      compliment:
        "You have an amazing way of finding beauty in the small things.",
    },
    {
      id: 24,
      compliment:
        "You are so much more capable than you give yourself credit for.",
    },
    {
      id: 25,
      compliment: "You’re doing better than you think.",
    },
    {
      id: 26,
      compliment: "You bring out the best in everyone around you.",
    },
    {
      id: 27,
      compliment: "Your courage is an inspiration.",
    },
    {
      id: 28,
      compliment: "You have a beautiful soul.",
    },
    {
      id: 29,
      compliment: "You’re a wonderful person inside and out.",
    },
    {
      id: 30,
      compliment: "You make things brighter just by being around.",
    },
    {
      id: 31,
      compliment: "You have a way of making people feel seen and valued.",
    },
    {
      id: 32,
      compliment: "You’re doing great, even when it doesn’t feel like it.",
    },
    {
      id: 33,
      compliment: "Your efforts don’t go unnoticed.",
    },
    {
      id: 34,
      compliment: "You are capable of amazing things.",
    },
    {
      id: 35,
      compliment: "You have such a beautiful energy.",
    },
    {
      id: 36,
      compliment: "You make the world a better place just by being yourself.",
    },
    {
      id: 37,
      compliment:
        "Your ability to stay calm in tough situations is truly admirable.",
    },
    {
      id: 38,
      compliment: "You are deserving of all the good things coming your way.",
    },
    {
      id: 39,
      compliment: "Your heart is as big as the universe itself.",
    },
    {
      id: 40,
      compliment: "You’ve got the kind of heart that makes the world kinder.",
    },
    {
      id: 41,
      compliment: "You have such a powerful presence, even in silence.",
    },
    {
      id: 42,
      compliment: "You always find a way to bring a little joy into any room.",
    },
    {
      id: 43,
      compliment: "Your thoughts are always so thoughtful and deep.",
    },
    {
      id: 44,
      compliment: "You’re a beautiful person inside and out.",
    },
    {
      id: 45,
      compliment: "You make things easier for everyone around you.",
    },
    {
      id: 46,
      compliment:
        "Your sense of humor is contagious and always brightens the room.",
    },
    {
      id: 47,
      compliment: "You handle challenges with such grace and composure.",
    },
    {
      id: 48,
      compliment: "You inspire those around you without even trying.",
    },
    {
      id: 49,
      compliment: "You are so much stronger than you think you are.",
    },
    {
      id: 50,
      compliment: "Your presence is enough to make any day better.",
    },
  ]);
}

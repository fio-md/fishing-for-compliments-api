import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("fish", (table) => {
      table.increments("id").primary();
      table.string("type").notNullable();
      table.string("image");
    })
    .createTable("compliments", (table) => {
      table.increments("id").primary();
      table.string("compliment").notNullable();
    })
    .createTable("user_fish", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.integer("fish_id").unsigned().references("id").inTable("fish");
      table
        .integer("compliment_id")
        .unsigned()
        .references("id")
        .inTable("compliments");
      table.boolean("is_favorite").notNullable().defaultTo(false);
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("fish")
    .dropTable("compliments")
    .dropTable("user_fish");
}

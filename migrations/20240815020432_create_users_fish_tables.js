/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("password").notNullable();
    })
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

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("fish")
    .dropTable("compliments")
    .dropTable("user_fish");
}

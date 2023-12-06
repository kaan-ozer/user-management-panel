import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Users", function (table) {
    table.string("id").primary();
    table.string("first_name");
    table.string("last_name");
    table.string("pass");
    table.string("roles");
  });
}

export async function down(knex: Knex): Promise<void> {}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("Users", function (table) {
        table.uuid("id").primary();
        table.string("first_name");
        table.string("last_name");
        table.dropColumn("pass");
        table.dropColumn("roles");
    });
}
exports.up = up;
async function down(knex) { }
exports.down = down;

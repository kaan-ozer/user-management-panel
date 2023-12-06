"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configs = {
    development: {
        client: "postgresql",
        connection: {
            database: "postgres",
            user: "postgres",
            password: "root",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
exports.default = configs;

"use strict";
// -) to initialize the connects in it so that it creates  knexfile.js
// -) knex init
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
const db = (0, knex_1.default)(knexfile_1.default.development);
exports.default = db;
// return knex.schema.createTable("Users", function (table) {
//     table.uuid("id").primary();
//     table.string("first_name");
//     table.string("last_name");
//     table.dropColumn("pass");
//     table.dropColumn("roles");
//   });

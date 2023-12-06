// -) to initialize the connects in it so that it creates  knexfile.js
// -) knex init

import knex from "knex";
import knexfile from "./knexfile";

const db = knex(knexfile.development);

export default db;

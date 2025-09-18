// A single, centralized place for all your database related code. It acts as
// a data access layer, separating the logic for connecting to and querying
// the database from the rest of your application's business logic.

import knex from "knex";
import { database } from "./config.mjs";

const dbConfig = {
  client: "mysql2",
  connection: database,
};

const db = knex(dbConfig);
export const raw = (sql) => db.raw(sql);

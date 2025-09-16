import knex from "knex";
import { database } from "./config.mjs";

const dbConfig = {
  client: "mysql2",
  connection: database,
};

// A configured Knex client instance
const db = knex(dbConfig);
export const raw = (sql) => db.raw(sql);

import mysql from "mysql2";
import { config } from "../config.js";

export const pool = mysql.createPool({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
});

export const db = pool.promise();

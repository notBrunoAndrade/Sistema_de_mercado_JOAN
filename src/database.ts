import mysql from "mysql2/promise";

export const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "lojajoan",
});
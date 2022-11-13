import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env;

let db;

if (ENV === "dev") {
  db = new Pool({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT as string) || 5416,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else if (ENV === "test") {
  db = new Pool({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT as string) || 5416,
    database: "testDB",
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default db as Pool;

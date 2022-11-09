import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    ENV,
} = process.env

let db;

if (ENV === 'dev'){
    db = new Pool({
        host: "localhost",
        port: 5416,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

else if (ENV === 'test'){
    db = new Pool({
      host: "localhost",
      port: 5416,
      database: POSTGRES_DB_TEST,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    });
}


export default db as Pool;

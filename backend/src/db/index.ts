import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";


if(!ENV.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
    
}   

const pool = new Pool({
    connectionString : ENV.DATABASE_URL
})


pool.on("connect", () => {
    console.log("Database Connected Successfully ✅");
    
})

pool.on("error", () =>{
    console.log("Connection was Unsuccessful 💥");
    
})



export const db = drizzle({
    client: pool,
    schema
})
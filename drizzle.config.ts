import { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

export default {
  schema: "./src/lib/schema.ts", // or: /schema/*
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL as string,
  },
  verbose: true,
  strict: true,
} satisfies Config;

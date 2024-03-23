import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { users } from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// for query purposes
const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });

export const getUsers = async () => {
  return await db.select().from(users);
};

export type NewUser = typeof users.$inferInsert;

export const createUser = async (newUser: NewUser) => {
  return await db.insert(users).values(newUser).returning();
};

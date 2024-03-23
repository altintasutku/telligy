import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   userId: varchar("user_id", { length: 256 }).notNull(),
//   displayName: text("display_name").notNull(),
//   phone: varchar("phone", { length: 256 }),
//   email: varchar("email", { length: 256 }).notNull(),
// });

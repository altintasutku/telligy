import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { db } from './db';

// for migrations
async function main() {
  try {
    migrate(db, {
      migrationsFolder: "drizzle/",
    })

    console.log("Migration successful")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

}

main()

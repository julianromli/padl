import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import { getDb } from "../src/db/index.ts";
import { sql } from "drizzle-orm";

async function main() {
	const db = getDb();
	const tables = await db.all(
		sql`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`,
	);
	console.log("Tables:", tables);

	try {
		const columns = await db.all(sql`PRAGMA table_info(tournaments)`);
		console.log("tournaments columns:", columns);
		const count = await db.all(sql`SELECT COUNT(*) as count FROM tournaments`);
		console.log("tournament count:", count);
		const rows = await db.all(
			sql`SELECT id, title, slug, status, category FROM tournaments ORDER BY id`,
		);
		console.log("tournaments:", rows);
	} catch (error) {
		console.log("tournaments table error:", error);
	}

	try {
		const migrations = await db.all(sql`SELECT * FROM __drizzle_migrations`);
		console.log("drizzle migrations:", migrations);
	} catch {
		console.log("no __drizzle_migrations table");
	}
}

main().catch(console.error);

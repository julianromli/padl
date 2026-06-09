import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();
import { count } from "drizzle-orm";
import { getDb } from "../src/db/index.ts";
import { getSeedTournaments } from "../src/db/seed-data.ts";
import { tournaments } from "../src/db/schema.ts";

async function main() {
	const db = getDb();
	const [{ value: existingCount }] = await db
		.select({ value: count() })
		.from(tournaments);

	if (existingCount > 0) {
		console.log(`Skipping seed: ${existingCount} tournament(s) already exist.`);
		return;
	}

	const rows = getSeedTournaments();
	await db.insert(tournaments).values(rows);
	console.log(`Seeded ${rows.length} tournaments.`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});

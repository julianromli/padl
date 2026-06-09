import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import { eq } from "drizzle-orm";
import { getDb } from "../src/db/index.ts";
import { tournaments } from "../src/db/schema.ts";
import { slugifyTitle } from "../src/lib/slug.ts";
import { resolveUniqueSlug } from "../src/server/tournaments.ts";

const defaultDescription =
	"Whether you're a seasoned professional or a weekend amateur, our tournaments are designed to provide a fair, competitive, and enjoyable environment for everyone.";

async function main() {
	const db = getDb();
	const rows = await db.select().from(tournaments);

	if (rows.length === 0) {
		console.log("No tournaments to backfill.");
		return;
	}

	let updated = 0;

	for (const row of rows) {
		const needsSlug = !row.slug.trim();
		const needsDescription = !row.description.trim();
		const needsCategory = !row.category.trim();

		if (!needsSlug && !needsDescription && !needsCategory) {
			continue;
		}

		const slug = needsSlug
			? await resolveUniqueSlug(slugifyTitle(row.title) || `tournament-${row.id}`)
			: row.slug;

		await db
			.update(tournaments)
			.set({
				slug,
				description: needsDescription ? defaultDescription : row.description,
				category: needsCategory ? "All Skill Levels" : row.category,
				updatedAt: new Date(),
			})
			.where(eq(tournaments.id, row.id));

		updated += 1;
		console.log(`Backfilled tournament #${row.id} → ${slug}`);
	}

	console.log(updated === 0 ? "All tournaments already complete." : `Backfilled ${updated} tournament(s).`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});

import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import { readMigrationFiles } from "drizzle-orm/migrator";
import { sql } from "drizzle-orm";
import { getDb } from "../src/db/index.ts";
import { slugifyTitle } from "../src/lib/slug.ts";
import { resolveUniqueSlug } from "../src/server/tournaments.ts";
import { tournaments } from "../src/db/schema.ts";
import { eq } from "drizzle-orm";
import { getSeedTournaments } from "../src/db/seed-data.ts";
import { count } from "drizzle-orm";

const defaultDescription =
	"Whether you're a seasoned professional or a weekend amateur, our tournaments are designed to provide a fair, competitive, and enjoyable environment for everyone.";

async function columnExists(columnName: string): Promise<boolean> {
	const db = getDb();
	const columns = await db.all<{ name: string }>(
		sql`PRAGMA table_info(tournaments)`,
	);
	return columns.some((column) => column.name === columnName);
}

async function indexExists(indexName: string): Promise<boolean> {
	const db = getDb();
	const indexes = await db.all<{ name: string }>(
		sql`SELECT name FROM sqlite_master WHERE type = 'index' AND name = ${indexName}`,
	);
	return indexes.length > 0;
}

async function ensureColumns() {
	const db = getDb();

	if (!(await columnExists("slug"))) {
		await db.run(sql`ALTER TABLE tournaments ADD COLUMN slug text`);
		console.log("Added column: slug");
	}

	if (!(await columnExists("description"))) {
		await db.run(
			sql`ALTER TABLE tournaments ADD COLUMN description text NOT NULL DEFAULT ''`,
		);
		console.log("Added column: description");
	}

	if (!(await columnExists("category"))) {
		await db.run(
			sql`ALTER TABLE tournaments ADD COLUMN category text NOT NULL DEFAULT ''`,
		);
		console.log("Added column: category");
	}
}

async function backfillRows() {
	const db = getDb();
	const rows = await db.select().from(tournaments);
	let updated = 0;

	for (const row of rows) {
		const needsSlug = !row.slug?.trim();
		const needsDescription = !row.description?.trim();
		const needsCategory = !row.category?.trim();

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

	console.log(
		updated === 0
			? "Backfill: all tournaments already complete."
			: `Backfill: updated ${updated} tournament(s).`,
	);
}

async function ensureSlugIndex() {
	const db = getDb();

	if (await indexExists("tournaments_slug_unique")) {
		console.log("Slug unique index already exists.");
		return;
	}

	await db.run(
		sql`CREATE UNIQUE INDEX tournaments_slug_unique ON tournaments (slug)`,
	);
	console.log("Created unique index: tournaments_slug_unique");
}

async function baselineMigrations() {
	const db = getDb();

	await db.run(sql`
		CREATE TABLE IF NOT EXISTS __drizzle_migrations (
			id SERIAL PRIMARY KEY,
			hash text NOT NULL,
			created_at numeric
		)
	`);

	const existing = await db.all<{ hash: string }>(
		sql`SELECT hash FROM __drizzle_migrations`,
	);
	const applied = new Set(existing.map((row) => row.hash));
	const migrations = readMigrationFiles({ migrationsFolder: "./drizzle" });
	let inserted = 0;

	for (const migration of migrations) {
		if (applied.has(migration.hash)) {
			continue;
		}

		await db.run(
			sql`INSERT INTO __drizzle_migrations (hash, created_at) VALUES (${migration.hash}, ${migration.folderMillis})`,
		);
		inserted += 1;
	}

	console.log(
		inserted === 0
			? "Migrations: already baselined."
			: `Migrations: baselined ${inserted} migration(s).`,
	);
}

async function seedIfEmpty() {
	const db = getDb();
	const [{ value: existingCount }] = await db
		.select({ value: count() })
		.from(tournaments);

	if (existingCount > 0) {
		console.log(`Seed: skipped (${existingCount} tournament(s) already exist).`);
		return;
	}

	const rows = getSeedTournaments();
	await db.insert(tournaments).values(rows);
	console.log(`Seed: inserted ${rows.length} tournament(s).`);
}

async function main() {
	console.log("Setting up database...");
	await ensureColumns();
	await backfillRows();
	await ensureSlugIndex();
	await seedIfEmpty();
	await baselineMigrations();
	console.log("Database setup complete.");
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});

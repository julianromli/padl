import { createServerFn } from "@tanstack/react-start";
import { and, asc, eq, gt, ne } from "drizzle-orm";
import { getDb } from "#/db";
import { tournaments as tournamentsTable } from "#/db/schema";
import {
	isValidSlug,
	slugifyTitle,
	withSlugSuffix,
} from "#/lib/slug";
import { toTournamentCard, toTournamentDetail } from "#/lib/tournaments";
import {
	type TournamentInput,
	parseTournamentInput,
} from "#/lib/validation";
import { adminAuthMiddleware } from "#/server/auth";

async function isSlugTaken(slug: string, excludeId?: number): Promise<boolean> {
	const conditions = [eq(tournamentsTable.slug, slug)];
	if (excludeId !== undefined) {
		conditions.push(ne(tournamentsTable.id, excludeId));
	}

	const [existing] = await getDb()
		.select({ id: tournamentsTable.id })
		.from(tournamentsTable)
		.where(and(...conditions))
		.limit(1);

	return Boolean(existing);
}

export async function resolveUniqueSlug(
	preferredSlug: string,
	excludeId?: number,
): Promise<string> {
	const baseSlug = preferredSlug || "tournament";
	let suffix = 1;

	while (await isSlugTaken(withSlugSuffix(baseSlug, suffix), excludeId)) {
		suffix += 1;
	}

	return withSlugSuffix(baseSlug, suffix);
}

async function ensureUniqueSlug(
	slug: string,
	excludeId?: number,
): Promise<string | { error: string }> {
	if (!isValidSlug(slug)) {
		return { error: "Slug must use lowercase letters, numbers, and hyphens only" };
	}

	if (await isSlugTaken(slug, excludeId)) {
		return { error: "Slug is already in use" };
	}

	return slug;
}

export const getUpcomingTournaments = createServerFn({ method: "GET" }).handler(
	async () => {
		const now = new Date();
		const rows = await getDb()
			.select()
			.from(tournamentsTable)
			.where(
				and(
					eq(tournamentsTable.status, "published"),
					gt(tournamentsTable.startDate, now),
				),
			)
			.orderBy(asc(tournamentsTable.startDate));

		return rows.map((row) => toTournamentCard(row, now));
	},
);

export const getTournamentBySlug = createServerFn({ method: "GET" })
	.validator((data: { slug: string }) => data)
	.handler(async ({ data }) => {
		const slug = data.slug.trim();
		if (!slug) {
			return null;
		}

		const [row] = await getDb()
			.select()
			.from(tournamentsTable)
			.where(eq(tournamentsTable.slug, slug))
			.limit(1);

		if (!row || row.status !== "published") {
			return null;
		}

		return toTournamentDetail(row, new Date());
	});

export const listTournamentsAdmin = createServerFn({ method: "GET" })
	.middleware([adminAuthMiddleware])
	.handler(async () => {
		const rows = await getDb()
			.select()
			.from(tournamentsTable)
			.orderBy(asc(tournamentsTable.startDate));

		return rows;
	});

export const createTournament = createServerFn({ method: "POST" })
	.middleware([adminAuthMiddleware])
	.validator((data: TournamentInput) => data)
	.handler(async ({ data }) => {
		const parsed = parseTournamentInput(data);
		if (!parsed.ok) {
			throw new Error(parsed.error);
		}

		const preferredSlug =
			parsed.value.slug || slugifyTitle(parsed.value.title) || "tournament";
		const slugResult = await ensureUniqueSlug(preferredSlug);
		if (typeof slugResult !== "string") {
			throw new Error(slugResult.error);
		}

		const now = new Date();
		const [created] = await getDb()
			.insert(tournamentsTable)
			.values({
				slug: slugResult,
				title: parsed.value.title,
				organizerName: parsed.value.organizerName,
				imageUrl: parsed.value.imageUrl,
				startDate: parsed.value.startDate,
				maxPlayers: parsed.value.maxPlayers,
				registeredPlayers: parsed.value.registeredPlayers,
				registrationUrl: parsed.value.registrationUrl,
				description: parsed.value.description,
				category: parsed.value.category,
				status: parsed.value.status,
				createdAt: now,
				updatedAt: now,
			})
			.returning();

		return created;
	});

export const updateTournament = createServerFn({ method: "POST" })
	.middleware([adminAuthMiddleware])
	.validator((data: TournamentInput & { id: number }) => data)
	.handler(async ({ data }) => {
		const parsed = parseTournamentInput(data);
		if (!parsed.ok) {
			throw new Error(parsed.error);
		}

		const slugResult = await ensureUniqueSlug(parsed.value.slug, data.id);
		if (typeof slugResult !== "string") {
			throw new Error(slugResult.error);
		}

		const now = new Date();
		const [updated] = await getDb()
			.update(tournamentsTable)
			.set({
				slug: slugResult,
				title: parsed.value.title,
				organizerName: parsed.value.organizerName,
				imageUrl: parsed.value.imageUrl,
				startDate: parsed.value.startDate,
				maxPlayers: parsed.value.maxPlayers,
				registeredPlayers: parsed.value.registeredPlayers,
				registrationUrl: parsed.value.registrationUrl,
				description: parsed.value.description,
				category: parsed.value.category,
				status: parsed.value.status,
				updatedAt: now,
			})
			.where(eq(tournamentsTable.id, data.id))
			.returning();

		if (!updated) {
			throw new Error("Tournament not found");
		}

		return updated;
	});

export const deleteTournament = createServerFn({ method: "POST" })
	.middleware([adminAuthMiddleware])
	.validator((data: { id: number }) => data)
	.handler(async ({ data }) => {
		const [existing] = await getDb()
			.select()
			.from(tournamentsTable)
			.where(eq(tournamentsTable.id, data.id))
			.limit(1);

		if (!existing) {
			throw new Error("Tournament not found");
		}

		await getDb()
			.delete(tournamentsTable)
			.where(eq(tournamentsTable.id, data.id));

		return { success: true as const };
	});

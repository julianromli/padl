import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const tournamentStatuses = [
	"draft",
	"published",
	"cancelled",
] as const;

export type TournamentStatus = (typeof tournamentStatuses)[number];

export const tournaments = sqliteTable(
	"tournaments",
	{
		id: integer("id").primaryKey({ autoIncrement: true }),
		slug: text("slug").notNull(),
		title: text("title").notNull(),
		organizerName: text("organizer_name").notNull(),
		imageUrl: text("image_url").notNull(),
		startDate: integer("start_date", { mode: "timestamp_ms" }).notNull(),
		maxPlayers: integer("max_players").notNull(),
		registeredPlayers: integer("registered_players").notNull().default(0),
		registrationUrl: text("registration_url").notNull(),
		description: text("description").notNull().default(""),
		category: text("category").notNull().default(""),
		status: text("status", { enum: tournamentStatuses })
			.notNull()
			.default("draft"),
		createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
		updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
	},
	(table) => [uniqueIndex("tournaments_slug_unique").on(table.slug)],
);

export type Tournament = typeof tournaments.$inferSelect;
export type NewTournament = typeof tournaments.$inferInsert;

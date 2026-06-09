import { describe, expect, it } from "vitest";
import type { Tournament } from "#/db/schema";
import {
	formatCountdown,
	isTournamentPast,
	toTournamentCard,
	toTournamentDetail,
} from "#/lib/tournaments";

const baseTournament: Tournament = {
	id: 1,
	slug: "summer-open",
	title: "Summer Open",
	organizerName: "PADL Pro",
	imageUrl: "https://example.com/image.jpg",
	startDate: new Date("2026-06-14T12:00:00.000Z"),
	maxPlayers: 100,
	registeredPlayers: 85,
	registrationUrl: "https://example.com/register",
	description: "A competitive summer open.",
	category: "All Skill Levels",
	status: "published",
	createdAt: new Date("2026-06-01T12:00:00.000Z"),
	updatedAt: new Date("2026-06-01T12:00:00.000Z"),
};

describe("toTournamentCard", () => {
	it("derives fill label and progress from player counts", () => {
		const card = toTournamentCard(
			baseTournament,
			new Date("2026-06-07T12:00:00.000Z"),
		);

		expect(card.slug).toBe("summer-open");
		expect(card.raised).toBe("85/100 Players");
		expect(card.progress).toBe(85);
		expect(card.daysLeft).toBe("Starts in 7 days");
	});
});

describe("toTournamentDetail", () => {
	it("hides registration for past tournaments", () => {
		const detail = toTournamentDetail(
			baseTournament,
			new Date("2026-06-15T12:00:00.000Z"),
		);

		expect(detail.isPast).toBe(true);
		expect(detail.showRegister).toBe(false);
		expect(detail.daysLeft).toBe("Event ended");
		expect(detail.description).toBe("A competitive summer open.");
		expect(detail.category).toBe("All Skill Levels");
	});
});

describe("formatCountdown", () => {
	it("returns event ended for past dates", () => {
		expect(
			formatCountdown(
				new Date("2026-06-01T12:00:00.000Z"),
				new Date("2026-06-07T12:00:00.000Z"),
			),
		).toBe("Event ended");
	});
});

describe("isTournamentPast", () => {
	it("detects tournaments that already started", () => {
		expect(
			isTournamentPast(
				{ startDate: new Date("2026-06-01T12:00:00.000Z") },
				new Date("2026-06-07T12:00:00.000Z"),
			),
		).toBe(true);
	});
});

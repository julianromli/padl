import {
	type TournamentStatus,
	tournamentStatuses,
} from "#/db/schema";
import { isValidSlug } from "#/lib/slug";

export type TournamentInput = {
	title: string;
	slug: string;
	organizerName: string;
	imageUrl: string;
	startDate: string;
	maxPlayers: number;
	registeredPlayers: number;
	registrationUrl: string;
	description: string;
	category: string;
	status: TournamentStatus;
};

export function isValidHttpUrl(value: string): boolean {
	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}

export function parseTournamentInput(
	input: TournamentInput,
): { ok: true; value: Omit<TournamentInput, "startDate"> & { startDate: Date } } | { ok: false; error: string } {
	const title = input.title.trim();
	const slug = input.slug.trim();
	const organizerName = input.organizerName.trim();
	const imageUrl = input.imageUrl.trim();
	const registrationUrl = input.registrationUrl.trim();
	const description = input.description.trim();
	const category = input.category.trim();
	const startDate = new Date(input.startDate);

	if (!title) return { ok: false, error: "Title is required" };
	if (!slug) return { ok: false, error: "Slug is required" };
	if (!isValidSlug(slug)) {
		return {
			ok: false,
			error: "Slug must use lowercase letters, numbers, and hyphens only",
		};
	}
	if (!organizerName) return { ok: false, error: "Organizer is required" };
	if (!imageUrl || !isValidHttpUrl(imageUrl)) {
		return { ok: false, error: "Image URL must be a valid http(s) link" };
	}
	if (!registrationUrl || !isValidHttpUrl(registrationUrl)) {
		return {
			ok: false,
			error: "Registration URL must be a valid http(s) link",
		};
	}
	if (Number.isNaN(startDate.getTime())) {
		return { ok: false, error: "Start date is invalid" };
	}
	if (!Number.isInteger(input.maxPlayers) || input.maxPlayers < 1) {
		return { ok: false, error: "Max players must be at least 1" };
	}
	if (
		!Number.isInteger(input.registeredPlayers) ||
		input.registeredPlayers < 0
	) {
		return { ok: false, error: "Registered players cannot be negative" };
	}
	if (input.registeredPlayers > input.maxPlayers) {
		return {
			ok: false,
			error: "Registered players cannot exceed max players",
		};
	}
	if (!tournamentStatuses.includes(input.status)) {
		return { ok: false, error: "Invalid status" };
	}
	if (input.status === "published") {
		if (!description) {
			return {
				ok: false,
				error: "Description is required before publishing",
			};
		}
		if (!category) {
			return {
				ok: false,
				error: "Category is required before publishing",
			};
		}
	}

	const { startDate: _startDateInput, ...rest } = input;

	return {
		ok: true,
		value: {
			...rest,
			title,
			slug,
			organizerName,
			imageUrl,
			registrationUrl,
			description,
			category,
			startDate,
		},
	};
}

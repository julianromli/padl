import type { Tournament } from "#/db/schema";

export type TournamentCardData = {
	slug: string;
	img: string;
	org: string;
	title: string;
	raised: string;
	daysLeft: string;
	progress: number;
};

export type TournamentDetailData = TournamentCardData & {
	description: string;
	category: string;
	registrationUrl: string;
	isPast: boolean;
	showRegister: boolean;
};

export function isTournamentPast(
	tournament: Pick<Tournament, "startDate">,
	now = new Date(),
): boolean {
	return tournament.startDate.getTime() <= now.getTime();
}

export function formatCountdown(startDate: Date, now = new Date()): string {
	const diffMs = startDate.getTime() - now.getTime();
	if (diffMs <= 0) {
		return "Event ended";
	}

	const totalHours = Math.ceil(diffMs / (1000 * 60 * 60));
	if (totalHours < 24) {
		return totalHours === 1 ? "Starts in 1 hour" : `Starts in ${totalHours} hours`;
	}

	const days = Math.ceil(totalHours / 24);
	return days === 1 ? "Starts in 1 day" : `Starts in ${days} days`;
}

function toCardFields(
	tournament: Tournament,
	now = new Date(),
): Omit<TournamentCardData, "slug"> & { daysLeft: string } {
	const progress =
		tournament.maxPlayers > 0
			? Math.min(
					100,
					Math.round(
						(tournament.registeredPlayers / tournament.maxPlayers) * 100,
					),
				)
			: 0;

	return {
		img: tournament.imageUrl,
		org: tournament.organizerName,
		title: tournament.title,
		raised: `${tournament.registeredPlayers}/${tournament.maxPlayers} Players`,
		daysLeft: formatCountdown(tournament.startDate, now),
		progress,
	};
}

export function toTournamentCard(
	tournament: Tournament,
	now = new Date(),
): TournamentCardData {
	return {
		slug: tournament.slug,
		...toCardFields(tournament, now),
	};
}

export function toTournamentDetail(
	tournament: Tournament,
	now = new Date(),
): TournamentDetailData {
	const isPast = isTournamentPast(tournament, now);

	return {
		slug: tournament.slug,
		...toCardFields(tournament, now),
		description: tournament.description,
		category: tournament.category,
		registrationUrl: tournament.registrationUrl,
		isPast,
		showRegister: !isPast,
	};
}

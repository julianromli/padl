import type { NewTournament } from "#/db/schema";

const dayMs = 24 * 60 * 60 * 1000;

const defaultDescription =
	"Whether you're a seasoned professional or a weekend amateur, our tournaments are designed to provide a fair, competitive, and enjoyable environment for everyone. We ensure all participants get plenty of court time and the opportunity to connect with the padel community.";

export function getSeedTournaments(now = new Date()): NewTournament[] {
	const createdAt = now;

	return [
		{
			slug: "summer-padel-open-championship",
			title: "Summer Padel Open Championship",
			organizerName: "PADL Pro",
			imageUrl:
				"https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2070&auto=format&fit=crop",
			startDate: new Date(now.getTime() + 7 * dayMs),
			maxPlayers: 100,
			registeredPlayers: 85,
			registrationUrl: "https://example.com/register/summer-open",
			description: `Welcome to the Summer Padel Open Championship, organized by PADL Pro. This is your chance to compete, have fun, and win amazing prizes in our state-of-the-art padel courts.\n\n${defaultDescription}`,
			category: "All Skill Levels",
			status: "published",
			createdAt,
			updatedAt: createdAt,
		},
		{
			slug: "weekend-amateur-league",
			title: "Weekend Amateur League",
			organizerName: "PADL Casual",
			imageUrl:
				"https://images.unsplash.com/photo-1530915534664-4ac6423816b7?q=80&w=2070&auto=format&fit=crop",
			startDate: new Date(now.getTime() + 19 * dayMs),
			maxPlayers: 100,
			registeredPlayers: 45,
			registrationUrl: "https://example.com/register/weekend-league",
			description: `Welcome to the Weekend Amateur League, organized by PADL Casual. A relaxed competitive format built for players who want more court time without the pressure of a pro bracket.\n\n${defaultDescription}`,
			category: "All Skill Levels",
			status: "published",
			createdAt,
			updatedAt: createdAt,
		},
		{
			slug: "mixed-doubles-championship",
			title: "Mixed Doubles Championship",
			organizerName: "PADL Community",
			imageUrl:
				"https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=2070&auto=format&fit=crop",
			startDate: new Date(now.getTime() + 23 * dayMs),
			maxPlayers: 100,
			registeredPlayers: 30,
			registrationUrl: "https://example.com/register/mixed-doubles",
			description: `Welcome to the Mixed Doubles Championship, organized by PADL Community. Pair up and compete in a social format that celebrates teamwork on every court.\n\n${defaultDescription}`,
			category: "All Skill Levels",
			status: "published",
			createdAt,
			updatedAt: createdAt,
		},
	];
}

import { createFileRoute } from "@tanstack/react-router";
import { LandingFAQ } from "#/components/landing/landing-faq";
import { LandingFooter } from "#/components/landing/landing-footer";
import { LandingNavbar } from "#/components/landing/landing-navbar";
import { Features } from "#/components/sections/features";
import { Hero } from "#/components/sections/hero";
import { StatsCTA } from "#/components/sections/stats-cta";
import { Tournaments } from "#/components/sections/tournaments";
import { features } from "#/data/features";
import { getUpcomingTournaments } from "#/server/tournaments";

export const Route = createFileRoute("/")({
	loader: () => getUpcomingTournaments(),
	component: Home,
});

function Home() {
	const tournaments = Route.useLoaderData();

	return (
		<main className="min-h-dvh flex flex-col font-sans selection:bg-primary selection:text-stone-900">
			<LandingNavbar />
			<Hero />
			<Features items={features} />
			<Tournaments items={tournaments} />
			<StatsCTA />
			<LandingFAQ />
			<LandingFooter />
		</main>
	);
}

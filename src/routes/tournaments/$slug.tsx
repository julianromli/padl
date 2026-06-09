import { createFileRoute, notFound } from "@tanstack/react-router";
import {
	Calendar,
	CheckCircle2,
	Droplet,
	Gift,
	ShieldCheck,
	Trophy,
	Users,
} from "lucide-react";
import { LandingFooter } from "#/components/landing/landing-footer";
import { LandingNavbar } from "#/components/landing/landing-navbar";
import { TournamentNotFound } from "#/components/tournaments/tournament-not-found";
import { getTournamentBySlug } from "#/server/tournaments";

export const Route = createFileRoute("/tournaments/$slug")({
	loader: async ({ params }) => {
		const tournament = await getTournamentBySlug({ data: { slug: params.slug } });
		if (!tournament) {
			throw notFound();
		}
		return tournament;
	},
	notFoundComponent: TournamentNotFound,
	component: TournamentDetail,
});

const detailFeatures = [
	{
		icon: Trophy,
		title: "3 Matches Guaranteed",
		description:
			"Everyone plays at least 3 matches in the group stages, regardless of results.",
	},
	{
		icon: Gift,
		title: "Welcome Pack",
		description:
			"Exclusive tournament t-shirt, overgrips, and sponsor goodies for all players.",
	},
	{
		icon: Droplet,
		title: "Hydration & Snacks",
		description:
			"Water, isotonic drinks, and fresh fruit provided court-side throughout the event.",
	},
	{
		icon: ShieldCheck,
		title: "Pro Referees",
		description:
			"Official referees for all semi-final and final matches to ensure fair play.",
	},
] as const;

function TournamentDetail() {
	const tournament = Route.useLoaderData();
	const timeLabel = tournament.isPast ? "Event status" : "Time remaining";
	const descriptionParagraphs = tournament.description
		.split(/\n{2,}/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean);

	return (
		<main className="min-h-dvh flex flex-col font-sans selection:bg-primary selection:text-stone-900">
			<LandingNavbar />

			<div className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-24">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					<div className="relative h-80 md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
						<img
							src={tournament.img}
							alt={tournament.title}
							className="w-full h-full object-cover"
						/>
					</div>

					<div className="flex flex-col justify-center">
						<div className="flex items-center gap-1 mb-4">
							<span className="text-sm font-bold text-stone-500 tracking-wider uppercase">
								{tournament.org}
							</span>
							<CheckCircle2 className="size-4 text-blue-500 fill-blue-500 text-white" />
						</div>

						<h1 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 leading-tight">
							{tournament.title}
						</h1>

						<div className="space-y-6 mb-8">
							<div className="flex items-center gap-4 text-lg">
								<div className="bg-stone-100 p-3 rounded-xl text-stone-700">
									<Users className="size-6" />
								</div>
								<div>
									<p className="font-semibold text-stone-900">{tournament.raised}</p>
									<p className="text-sm text-stone-500">Registered</p>
								</div>
							</div>

							<div className="flex items-center gap-4 text-lg">
								<div className="bg-stone-100 p-3 rounded-xl text-stone-700">
									<Calendar className="size-6" />
								</div>
								<div>
									<p className="font-semibold text-stone-900">{tournament.daysLeft}</p>
									<p className="text-sm text-stone-500">{timeLabel}</p>
								</div>
							</div>

							<div className="flex items-center gap-4 text-lg">
								<div className="bg-stone-100 p-3 rounded-xl text-stone-700">
									<Trophy className="size-6" />
								</div>
								<div>
									<p className="font-semibold text-stone-900">{tournament.category}</p>
									<p className="text-sm text-stone-500">Category</p>
								</div>
							</div>
						</div>

						<div className="w-full bg-stone-200 h-3 rounded-full mb-3 overflow-hidden">
							<div
								className="bg-stone-900 h-full rounded-full transition-all duration-1000 ease-out"
								style={{ width: `${tournament.progress}%` }}
							/>
						</div>
						<div className="flex justify-between text-sm font-medium text-stone-500 mb-8">
							<span>0%</span>
							<span>{tournament.progress}% Filled</span>
						</div>

						{tournament.showRegister ? (
							<a
								href={tournament.registrationUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full bg-primary hover:bg-primary/90 text-stone-900 font-bold text-lg py-4 rounded-xl transition-colors shadow-lg shadow-primary/20 text-center"
							>
								Register Now
							</a>
						) : null}
					</div>
				</div>

				<div className="mt-32 pt-24 border-t border-stone-200">
					<div className="max-w-3xl mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-900 tracking-tight">
							About the Tournament
						</h2>
						<div className="prose prose-lg prose-stone max-w-none">
							{descriptionParagraphs.map((paragraph) => (
								<p
									key={paragraph}
									className="text-stone-600 leading-relaxed mb-6 last:mb-0"
								>
									{paragraph}
								</p>
							))}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{detailFeatures.map(({ icon: Icon, title, description }) => (
							<div
								key={title}
								className="bg-stone-50 rounded-3xl p-8 border border-stone-100 hover:shadow-md transition-shadow group"
							>
								<div className="bg-white w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm border border-stone-100 mb-6 group-hover:scale-110 transition-transform">
									<Icon className="size-6 text-primary" />
								</div>
								<h4 className="text-lg font-bold text-stone-900 mb-2">{title}</h4>
								<p className="text-stone-600 text-sm leading-relaxed">
									{description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<LandingFooter />
		</main>
	);
}

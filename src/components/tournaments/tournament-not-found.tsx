import { Link } from "@tanstack/react-router";
import { LandingFooter } from "#/components/landing/landing-footer";
import { LandingNavbar } from "#/components/landing/landing-navbar";

export function TournamentNotFound() {
	return (
		<main className="min-h-dvh flex flex-col font-sans selection:bg-primary selection:text-stone-900">
			<LandingNavbar />
			<div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
				<h1 className="text-3xl font-bold text-stone-900 md:text-4xl">
					Tournament not found
				</h1>
				<p className="mt-4 max-w-md text-stone-600">
					This tournament may not exist or is no longer available.
				</p>
				<Link
					to="/"
					className="mt-8 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white"
				>
					Back to home
				</Link>
			</div>
			<LandingFooter />
		</main>
	);
}

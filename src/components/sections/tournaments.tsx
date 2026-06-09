import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Section } from "#/components/ui/section";
import type { TournamentCardData } from "#/lib/tournaments";
import { fadeUpItem } from "#/lib/motion";

function TournamentCard({
	slug,
	img,
	org,
	title,
	raised,
	daysLeft,
	progress,
}: TournamentCardData) {
	return (
		<Link to="/tournaments/$slug" params={{ slug }} className="block">
			<motion.div
				variants={fadeUpItem}
				whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
				className="group cursor-pointer"
			>
				<div className="relative h-64 rounded-3xl overflow-hidden mb-6">
					<img
						src={img}
						alt={title}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					/>
				</div>

				<div className="flex items-center gap-1 mb-2">
					<span className="text-sm font-medium text-stone-500">{org}</span>
					<CheckCircle2 className="size-4 text-blue-500 fill-blue-500 text-white" />
				</div>

				<h3 className="text-xl font-bold mb-6 line-clamp-2">{title}</h3>

				<div className="w-full bg-stone-200 h-2 rounded-full mb-4 overflow-hidden">
					<div
						className="bg-stone-900 h-full rounded-full"
						style={{ width: `${progress}%` }}
					/>
				</div>

				<div className="flex items-center justify-between text-sm font-medium tabular-nums">
					<span className="text-stone-900 text-lg">{raised}</span>
					<span className="text-stone-500">{daysLeft}</span>
				</div>
			</motion.div>
		</Link>
	);
}

export function Tournaments({ items }: { items: TournamentCardData[] }) {
	return (
		<Section.Root className="max-w-7xl mb-24">
			<Section.Header
				title="Upcoming Tournaments!"
				description="Join our competitive and friendly tournaments. Perfect for all skill levels!"
			/>
			<Section.Content className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{items.map((tournament) => (
					<TournamentCard key={tournament.slug} {...tournament} />
				))}
			</Section.Content>
		</Section.Root>
	);
}

export { TournamentCard };

import { motion } from "motion/react";
import { Section } from "#/components/ui/section";
import type { Feature } from "#/data/features";
import { fadeUpItem } from "#/lib/motion";

function FeatureCard({ icon: Icon, title, desc }: Feature) {
	return (
		<motion.div
			variants={fadeUpItem}
			whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
			className="bg-stone-50 rounded-3xl p-8 border border-stone-100"
		>
			<div className="size-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
				<Icon className="size-5 text-primary" />
			</div>
			<h3 className="text-xl font-bold mb-3">{title}</h3>
			<p className="text-stone-500 leading-relaxed text-pretty">{desc}</p>
		</motion.div>
	);
}

export function Features({ items }: { items: Feature[] }) {
	return (
		<Section.Root className="max-w-7xl mb-24">
			<Section.Header
				title={
					<>
						Play, Fast As <span className="italic font-serif">Flash</span>
					</>
				}
				description="Experience the best padel courts in the city with premium facilities and easy booking."
			/>
			<Section.Content className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{items.map((feature) => (
					<FeatureCard key={feature.title} {...feature} />
				))}
			</Section.Content>
		</Section.Root>
	);
}

export { FeatureCard };

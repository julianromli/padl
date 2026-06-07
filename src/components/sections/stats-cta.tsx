import {
	motion,
	type TargetAndTransition,
	type Transition,
} from "motion/react";
import { Button } from "#/components/ui/button";
import { Section } from "#/components/ui/section";
import { fadeUpItem } from "#/lib/motion";

type FloatingImageProps = {
	src: string;
	alt: string;
	className?: string;
	animate: TargetAndTransition;
	transition: Transition;
};

function FloatingImage({
	src,
	alt,
	className,
	animate,
	transition,
}: FloatingImageProps) {
	return (
		<motion.div animate={animate} transition={transition} className={className}>
			<img src={src} alt={alt} className="w-full h-full object-cover" />
		</motion.div>
	);
}

const floatingImages: FloatingImageProps[] = [
	{
		src: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=400&auto=format&fit=crop",
		alt: "Padel player",
		className:
			"hidden md:block absolute top-0 left-0 size-24 rounded-2xl overflow-hidden -rotate-6 shadow-lg",
		animate: { y: [-10, 10, -10] },
		transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
	},
	{
		src: "https://images.unsplash.com/photo-1574271143515-5cddf8da19be?q=80&w=400&auto=format&fit=crop",
		alt: "Padel court",
		className:
			"hidden md:block absolute top-12 right-0 size-28 rounded-2xl overflow-hidden rotate-6 shadow-lg",
		animate: { y: [10, -10, 10] },
		transition: {
			duration: 5,
			repeat: Infinity,
			ease: "easeInOut",
			delay: 0.5,
		},
	},
	{
		src: "https://images.unsplash.com/photo-1600679472829-3044539ce8ed?q=80&w=400&auto=format&fit=crop",
		alt: "Tennis balls",
		className:
			"hidden md:block absolute bottom-0 left-12 size-20 rounded-2xl overflow-hidden rotate-12 shadow-lg",
		animate: { y: [-8, 12, -8] },
		transition: {
			duration: 4.5,
			repeat: Infinity,
			ease: "easeInOut",
			delay: 1,
		},
	},
	{
		src: "https://images.unsplash.com/photo-1560012057-4372e14c5085?q=80&w=400&auto=format&fit=crop",
		alt: "Padel match",
		className:
			"hidden md:block absolute bottom-12 right-12 size-24 rounded-2xl overflow-hidden -rotate-12 shadow-lg",
		animate: { y: [12, -8, 12] },
		transition: {
			duration: 5.5,
			repeat: Infinity,
			ease: "easeInOut",
			delay: 1.5,
		},
	},
];

export function StatsCTA() {
	return (
		<Section.Root className="max-w-7xl mb-32 py-12">
			<div className="relative flex flex-col items-center text-center max-w-4xl mx-auto">
				{floatingImages.map((image) => (
					<FloatingImage key={image.alt} {...image} />
				))}

				<motion.h2
					variants={fadeUpItem}
					className="text-2xl md:text-3xl font-semibold mb-2 text-balance"
				>
					Join The Fastest Growing Padel Community With Over
				</motion.h2>

				<motion.div
					variants={fadeUpItem}
					className="text-7xl md:text-9xl font-bold font-mono tracking-tighter mb-4 tabular-nums"
				>
					15,234<span className="text-6xl md:text-8xl align-top">+</span>
				</motion.div>

				<motion.p
					variants={fadeUpItem}
					className="text-xl md:text-2xl font-medium text-stone-600 mb-10 text-balance"
				>
					Active Players In Our Network
				</motion.p>

				<Button.CTA>Join PADL Now!</Button.CTA>
			</div>
		</Section.Root>
	);
}

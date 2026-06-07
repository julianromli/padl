export const premiumTransition = {
	duration: 0.5,
	ease: [0.4, 0, 0.2, 1] as const,
};

export const staggerContainer = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export const fadeUpItem = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: premiumTransition,
	},
};

export const sectionViewport = { once: true, margin: "-100px" } as const;

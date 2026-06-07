import { type HTMLMotionProps, motion } from "motion/react";
import { fadeUpItem, staggerContainer } from "#/lib/motion";

type MotionStaggerProps = HTMLMotionProps<"div"> & {
	children: React.ReactNode;
};

export function MotionStagger({
	children,
	className,
	...props
}: MotionStaggerProps) {
	return (
		<motion.div
			initial="hidden"
			animate="show"
			variants={staggerContainer}
			className={className}
			{...props}
		>
			{children}
		</motion.div>
	);
}

type MotionFadeUpProps = HTMLMotionProps<"div"> & {
	children: React.ReactNode;
};

export function MotionFadeUp({
	children,
	className,
	...props
}: MotionFadeUpProps) {
	return (
		<motion.div variants={fadeUpItem} className={className} {...props}>
			{children}
		</motion.div>
	);
}

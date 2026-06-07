import { motion } from "motion/react";
import { MotionFadeUp } from "#/components/ui/motion";
import { fadeUpItem, sectionViewport, staggerContainer } from "#/lib/motion";

function SectionRoot({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<motion.section
			initial="hidden"
			whileInView="show"
			viewport={sectionViewport}
			variants={staggerContainer}
			className={`px-6 md:px-12 mx-auto w-full ${className ?? "max-w-7xl"}`}
		>
			{children}
		</motion.section>
	);
}

function SectionHeader({
	title,
	description,
	className,
}: {
	title: React.ReactNode;
	description?: React.ReactNode;
	className?: string;
}) {
	return (
		<MotionFadeUp className={`mb-12 max-w-2xl ${className ?? ""}`}>
			<h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
				{title}
			</h2>
			{description ? (
				<p className="text-stone-500 text-lg text-pretty">{description}</p>
			) : null}
		</MotionFadeUp>
	);
}

function SectionContent({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <div className={className}>{children}</div>;
}

function SectionTitle({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<motion.h2
			variants={fadeUpItem}
			className={`text-3xl md:text-4xl font-bold mb-10 text-balance ${className ?? ""}`}
		>
			{children}
		</motion.h2>
	);
}

export const Section = {
	Root: SectionRoot,
	Header: SectionHeader,
	Content: SectionContent,
	Title: SectionTitle,
};

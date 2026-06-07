import { type HTMLMotionProps, motion } from "motion/react";
import { fadeUpItem } from "#/lib/motion";

type ButtonBaseProps = HTMLMotionProps<"button"> & {
	children: React.ReactNode;
};

function ButtonBase({ className, children, ...props }: ButtonBaseProps) {
	return (
		<motion.button
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className={`bg-primary hover:bg-primary-hover text-stone-900 font-semibold rounded-full transition-colors ${className ?? ""}`}
			{...props}
		>
			{children}
		</motion.button>
	);
}

function ButtonNav(props: Omit<ButtonBaseProps, "className">) {
	return <ButtonBase className="py-2.5 px-6" {...props} />;
}

function ButtonHero(props: Omit<ButtonBaseProps, "className" | "variants">) {
	return (
		<ButtonBase
			variants={fadeUpItem}
			className="py-4 px-8 text-lg whitespace-nowrap shadow-lg mb-2 md:mb-6"
			{...props}
		/>
	);
}

function ButtonCTA(props: Omit<ButtonBaseProps, "className" | "variants">) {
	return (
		<ButtonBase
			variants={fadeUpItem}
			className="font-bold py-4 px-10 text-lg shadow-lg shadow-primary/20"
			{...props}
		/>
	);
}

function ButtonMobile({
	children,
	...props
}: Omit<ButtonBaseProps, "className">) {
	return (
		<button
			type="button"
			className="bg-primary text-stone-900 font-semibold py-3 rounded-full mt-4 w-full"
			{...props}
		>
			{children}
		</button>
	);
}

export const Button = {
	Nav: ButtonNav,
	Hero: ButtonHero,
	CTA: ButtonCTA,
	Mobile: ButtonMobile,
};

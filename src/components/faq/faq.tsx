import { Minus, Plus } from "lucide-react";
import { motion } from "motion/react";
import { MotionFadeUp } from "#/components/ui/motion";
import { FAQItemContext, FAQProvider, useFAQItem } from "./faq-context";

function FAQList({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-col gap-4">{children}</div>;
}

function FAQItem({ id, children }: { id: string; children: React.ReactNode }) {
	return (
		<MotionFadeUp className="border-b border-stone-200 pb-4">
			<FAQItemContext value={id}>{children}</FAQItemContext>
		</MotionFadeUp>
	);
}

function FAQTrigger({ children }: { children: React.ReactNode }) {
	const { isOpen, toggle } = useFAQItem();

	return (
		<button
			type="button"
			onClick={toggle}
			aria-expanded={isOpen}
			className="flex w-full items-center justify-between cursor-pointer font-semibold text-lg md:text-xl py-2 text-left"
		>
			{children}
			<span
				className={`relative flex size-6 items-center justify-center transition-colors ${isOpen ? "text-stone-900" : "text-stone-400"}`}
			>
				<Plus
					className={`absolute size-5 transition-opacity ${isOpen ? "opacity-0" : "opacity-100"}`}
				/>
				<Minus
					className={`absolute size-5 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
				/>
			</span>
		</button>
	);
}

function FAQContent({ children }: { children: React.ReactNode }) {
	const { isOpen } = useFAQItem();

	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: "auto" }}
			className="pt-4 pb-2 text-stone-500 text-pretty overflow-hidden"
		>
			{children}
		</motion.div>
	);
}

export const FAQ = {
	Provider: FAQProvider,
	List: FAQList,
	Item: FAQItem,
	Trigger: FAQTrigger,
	Content: FAQContent,
};

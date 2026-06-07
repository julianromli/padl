import { motion } from "motion/react";
import { Button } from "#/components/ui/button";
import { MotionStagger } from "#/components/ui/motion";
import { fadeUpItem, premiumTransition } from "#/lib/motion";

export function Hero() {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ ...premiumTransition, duration: 0.7 }}
			className="px-6 md:px-12 max-w-7xl mx-auto w-full mt-4 mb-20"
		>
			<div className="relative w-full h-[60dvh] md:h-[70dvh] rounded-3xl overflow-hidden bg-stone-100">
				<motion.img
					initial={{ scale: 1.05 }}
					animate={{ scale: 1 }}
					transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
					src="https://i.pinimg.com/736x/37/19/83/371983d718f69bc530e1ef0f3cce33ee.jpg"
					alt="Padel rackets and balls"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/20" />

				<MotionStagger className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
					<motion.h1
						variants={fadeUpItem}
						className="text-white font-bold flex flex-col md:flex-row md:items-center tracking-tighter text-balance"
					>
						<span className="text-7xl md:text-9xl lg:text-[11rem] leading-none">
							PADL
						</span>
						<span className="text-4xl md:text-5xl lg:text-7xl leading-[1.1] md:ml-6 font-medium opacity-90 tracking-normal flex flex-col justify-center">
							<span>Play</span>
							<span>Padel</span>
						</span>
					</motion.h1>
					<Button.Hero>Book Your Court</Button.Hero>
				</MotionStagger>
			</div>
		</motion.section>
	);
}

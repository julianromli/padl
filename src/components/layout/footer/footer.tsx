import { motion } from "motion/react";
import { Logo } from "#/components/ui/logo";
import { premiumTransition } from "#/lib/motion";

type FooterLink = {
	label: string;
	href: string;
};

type SocialLink = {
	label: string;
	href: string;
	icon: React.ReactNode;
};

function FooterRoot({ children }: { children: React.ReactNode }) {
	return (
		<motion.footer
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={premiumTransition}
			className="bg-stone-950 text-white rounded-t-[3rem] pt-20 pb-10 px-6 md:px-12 mt-20"
		>
			<div className="max-w-7xl mx-auto w-full">{children}</div>
		</motion.footer>
	);
}

function FooterBrand({ tagline }: { tagline: string }) {
	return (
		<div className="md:col-span-5">
			<div className="mb-6">
				<Logo />
			</div>
			<p className="text-stone-400 text-pretty max-w-sm">{tagline}</p>
		</div>
	);
}

function FooterColumns({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mb-20">
			{children}
		</div>
	);
}

function FooterColumn({
	title,
	links,
}: {
	title: string;
	links: FooterLink[];
}) {
	return (
		<div className="md:col-span-2">
			<h4 className="font-semibold mb-6">{title}</h4>
			<ul className="flex flex-col gap-4 text-stone-400 text-sm">
				{links.map((link) => (
					<li key={link.label}>
						<a href={link.href} className="hover:text-white transition-colors">
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

function FooterBottom({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-stone-800 gap-6">
			{children}
		</div>
	);
}

function FooterCopyright() {
	return (
		<p className="text-stone-500 text-sm text-center md:text-left">
			© PADL 2026
			<br />
			All Rights Reserved.
		</p>
	);
}

function FooterSocial({ links }: { links: SocialLink[] }) {
	return (
		<div className="flex items-center gap-4 flex-wrap justify-center">
			{links.map((link) => (
				<a
					key={link.label}
					href={link.href}
					className="flex items-center gap-2 border border-stone-800 rounded-full px-4 py-2 hover:bg-stone-800 transition-colors text-sm text-stone-300"
				>
					{link.icon}
					{link.label}
				</a>
			))}
		</div>
	);
}

export const Footer = {
	Root: FooterRoot,
	Brand: FooterBrand,
	Columns: FooterColumns,
	Column: FooterColumn,
	Bottom: FooterBottom,
	Copyright: FooterCopyright,
	Social: FooterSocial,
};

export type { FooterLink, SocialLink };

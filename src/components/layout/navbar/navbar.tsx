import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "#/components/ui/button";
import { Logo } from "#/components/ui/logo";
import { premiumTransition } from "#/lib/motion";
import { NavbarProvider, useNavbar } from "./navbar-context";

function NavbarRoot({ children }: { children: React.ReactNode }) {
	return (
		<motion.nav
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={premiumTransition}
			className="flex items-center justify-between py-6 px-6 md:px-12 max-w-7xl mx-auto w-full"
		>
			{children}
		</motion.nav>
	);
}

function NavbarBrand() {
	return <Logo />;
}

function NavbarLinks({
	links,
}: {
	links: { label: string; href: string; active?: boolean }[];
}) {
	return (
		<div className="hidden md:flex items-center gap-8 font-medium text-sm">
			{links.map((link) => (
				<a
					key={link.label}
					href={link.href}
					className={
						link.active
							? "text-stone-900"
							: "text-stone-500 hover:text-stone-900 transition-colors"
					}
				>
					{link.label}
				</a>
			))}
		</div>
	);
}

function NavbarActions({ children }: { children: React.ReactNode }) {
	return <div className="hidden md:block">{children}</div>;
}

function NavbarToggle() {
	const {
		state: { isOpen },
		actions: { toggle },
	} = useNavbar();

	return (
		<button
			type="button"
			className="md:hidden p-2"
			onClick={toggle}
			aria-label="Toggle menu"
		>
			{isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
		</button>
	);
}

function NavbarMobileMenu({
	links,
	ctaLabel,
}: {
	links: { label: string; href: string; active?: boolean }[];
	ctaLabel: string;
}) {
	const {
		state: { isOpen },
	} = useNavbar();

	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			className="absolute top-20 left-0 w-full bg-white p-6 flex flex-col gap-4 shadow-lg md:hidden z-50"
		>
			{links.map((link) => (
				<a
					key={link.label}
					href={link.href}
					className={
						link.active
							? "font-medium text-stone-900"
							: "font-medium text-stone-500"
					}
				>
					{link.label}
				</a>
			))}
			<Button.Mobile>{ctaLabel}</Button.Mobile>
		</motion.div>
	);
}

export const Navbar = {
	Provider: NavbarProvider,
	Root: NavbarRoot,
	Brand: NavbarBrand,
	Links: NavbarLinks,
	Actions: NavbarActions,
	Toggle: NavbarToggle,
	MobileMenu: NavbarMobileMenu,
};

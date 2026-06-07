export type NavLink = {
	label: string;
	href: string;
	active?: boolean;
};

export const navLinks: NavLink[] = [
	{ label: "Home", href: "/", active: true },
	{ label: "Book a Court", href: "/" },
	{ label: "Tournaments", href: "/" },
	{ label: "About Us", href: "/" },
];

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Footer } from "#/components/layout/footer/footer";

const playLinks = [
	{ label: "Courts", href: "/" },
	{ label: "Tournaments", href: "/" },
	{ label: "Coaching", href: "/" },
	{ label: "Events", href: "/" },
];

const supportLinks = [
	{ label: "FAQ", href: "/" },
	{ label: "Rules", href: "/" },
	{ label: "Accessibility", href: "/" },
	{ label: "Contact Us", href: "/" },
];

const aboutLinks = [
	{ label: "About Us", href: "/" },
	{ label: "Careers", href: "/" },
	{ label: "Partners", href: "/" },
	{ label: "Pricing", href: "/" },
];

const socialLinks = [
	{ label: "Instagram", href: "/", icon: <Instagram className="size-4" /> },
	{ label: "Facebook", href: "/", icon: <Facebook className="size-4" /> },
	{ label: "Twitter", href: "/", icon: <Twitter className="size-4" /> },
	{ label: "LinkedIn", href: "/", icon: <Linkedin className="size-4" /> },
];

export function LandingFooter() {
	return (
		<Footer.Root>
			<Footer.Columns>
				<Footer.Brand tagline="Elevating your padel experience with premium courts and community." />
				<Footer.Column title="Play" links={playLinks} />
				<Footer.Column title="Support" links={supportLinks} />
				<Footer.Column title="About" links={aboutLinks} />
			</Footer.Columns>
			<Footer.Bottom>
				<Footer.Copyright />
				<Footer.Social links={socialLinks} />
			</Footer.Bottom>
		</Footer.Root>
	);
}

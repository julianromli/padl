import type { LucideIcon } from "lucide-react";
import { LayoutGrid, Users, Zap } from "lucide-react";

export type Feature = {
	icon: LucideIcon;
	title: string;
	desc: string;
};

export const features: Feature[] = [
	{
		icon: LayoutGrid,
		title: "Premium Courts",
		desc: "State-of-the-art panoramic courts with professional lighting and WPT-approved turf for the ultimate playing experience.",
	},
	{
		icon: Zap,
		title: "Easy Booking",
		desc: "Book your court in seconds through our app. Instant confirmation and seamless access to all our facilities.",
	},
	{
		icon: Users,
		title: "Join the Community",
		desc: "Find partners, join tournaments, and connect with other padel enthusiasts in your area.",
	},
];

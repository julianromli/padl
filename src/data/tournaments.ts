export type Tournament = {
	img: string;
	org: string;
	title: string;
	raised: string;
	daysLeft: string;
	progress: number;
};

export const tournaments: Tournament[] = [
	{
		img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2070&auto=format&fit=crop",
		org: "PADL Pro",
		title: "Summer Padel Open Championship",
		raised: "85/100 Players",
		daysLeft: "Starts in 7 days",
		progress: 85,
	},
	{
		img: "https://images.unsplash.com/photo-1530915534664-4ac6423816b7?q=80&w=2070&auto=format&fit=crop",
		org: "PADL Casual",
		title: "Weekend Amateur League",
		raised: "45/100 Players",
		daysLeft: "Starts in 19 days",
		progress: 45,
	},
	{
		img: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=2070&auto=format&fit=crop",
		org: "PADL Community",
		title: "Mixed Doubles Championship",
		raised: "30/100 Players",
		daysLeft: "Starts in 23 days",
		progress: 30,
	},
];

export type FAQ = {
	question: string;
	answer: string;
};

const placeholderAnswer =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export const faqs: FAQ[] = [
	{ question: "How do I book a court?", answer: placeholderAnswer },
	{ question: "Do you provide racket rentals?", answer: placeholderAnswer },
	{
		question: "Can I book a court for a private event?",
		answer: placeholderAnswer,
	},
	{ question: "What are your opening hours?", answer: placeholderAnswer },
	{ question: "Do you offer coaching sessions?", answer: placeholderAnswer },
];

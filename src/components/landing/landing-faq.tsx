import { FAQ } from "#/components/faq/faq";
import { Section } from "#/components/ui/section";
import { faqs } from "#/data/faqs";

export function LandingFAQ() {
	return (
		<FAQ.Provider>
			<Section.Root className="max-w-3xl mb-32">
				<Section.Title>
					Frequently Asked
					<br />
					Questions.
				</Section.Title>
				<FAQ.List>
					{faqs.map((faq) => (
						<FAQ.Item key={faq.question} id={faq.question}>
							<FAQ.Trigger>{faq.question}</FAQ.Trigger>
							<FAQ.Content>{faq.answer}</FAQ.Content>
						</FAQ.Item>
					))}
				</FAQ.List>
			</Section.Root>
		</FAQ.Provider>
	);
}

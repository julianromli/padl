import { createContext, use, useCallback, useMemo, useState } from "react";

type FAQState = {
	openId: string | null;
};

type FAQActions = {
	toggle: (id: string) => void;
};

export type FAQContextValue = {
	state: FAQState;
	actions: FAQActions;
};

export const FAQContext = createContext<FAQContextValue | null>(null);

export const FAQItemContext = createContext<string | null>(null);

export function useFAQ() {
	const context = use(FAQContext);
	if (!context) {
		throw new Error("FAQ compound components must be used within FAQ.Provider");
	}
	return context;
}

export function useFAQItemId() {
	const id = use(FAQItemContext);
	if (!id) {
		throw new Error("FAQ.Item subcomponents must be used within FAQ.Item");
	}
	return id;
}

export function useFAQItem() {
	const id = useFAQItemId();
	const {
		state: { openId },
		actions: { toggle },
	} = useFAQ();

	return {
		isOpen: openId === id,
		toggle: () => toggle(id),
	};
}

export function FAQProvider({ children }: { children: React.ReactNode }) {
	const [openId, setOpenId] = useState<string | null>(null);

	const toggle = useCallback((id: string) => {
		setOpenId((prev) => (prev === id ? null : id));
	}, []);

	const value = useMemo(
		() => ({
			state: { openId },
			actions: { toggle },
		}),
		[openId, toggle],
	);

	return <FAQContext value={value}>{children}</FAQContext>;
}

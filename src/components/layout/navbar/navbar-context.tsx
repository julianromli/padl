import { createContext, use, useCallback, useMemo, useState } from "react";

type NavbarState = {
	isOpen: boolean;
};

type NavbarActions = {
	toggle: () => void;
	close: () => void;
};

export type NavbarContextValue = {
	state: NavbarState;
	actions: NavbarActions;
};

export const NavbarContext = createContext<NavbarContextValue | null>(null);

export function useNavbar() {
	const context = use(NavbarContext);
	if (!context) {
		throw new Error(
			"Navbar compound components must be used within Navbar.Provider",
		);
	}
	return context;
}

export function NavbarProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const close = useCallback(() => {
		setIsOpen(false);
	}, []);

	const value = useMemo(
		() => ({
			state: { isOpen },
			actions: { toggle, close },
		}),
		[isOpen, toggle, close],
	);

	return <NavbarContext value={value}>{children}</NavbarContext>;
}

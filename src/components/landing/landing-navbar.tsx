import { Navbar } from "#/components/layout/navbar/navbar";
import { Button } from "#/components/ui/button";
import { navLinks } from "#/data/nav-links";

export function LandingNavbar() {
	return (
		<Navbar.Provider>
			<Navbar.Root>
				<Navbar.Brand />
				<Navbar.Links links={navLinks} />
				<Navbar.Actions>
					<Button.Nav>Book Now</Button.Nav>
				</Navbar.Actions>
				<Navbar.Toggle />
				<Navbar.MobileMenu links={navLinks} ctaLabel="Book Now" />
			</Navbar.Root>
		</Navbar.Provider>
	);
}

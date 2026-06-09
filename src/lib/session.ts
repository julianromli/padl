import type { SessionConfig } from "@tanstack/react-start/server";

export type AdminSessionData = {
	authenticated?: boolean;
};

export function getAdminSessionConfig(): SessionConfig {
	const password = process.env.SESSION_SECRET;
	if (!password || password.length < 32) {
		throw new Error("SESSION_SECRET must be at least 32 characters");
	}

	return {
		name: "padl-admin-session",
		password,
		maxAge: 60 * 60 * 24,
		cookie: {
			secure: import.meta.env.PROD,
			httpOnly: true,
			sameSite: "lax",
			path: "/",
		},
	};
}

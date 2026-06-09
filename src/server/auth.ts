import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import {
	type AdminSessionData,
	getAdminSessionConfig,
} from "#/lib/session";

export const adminAuthMiddleware = createMiddleware({
	type: "function",
}).server(async ({ next }) => {
	const session = await useSession<AdminSessionData>(getAdminSessionConfig());
	if (!session.data.authenticated) {
		throw new Error("Unauthorized");
	}
	return next();
});

export const checkAdminSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const session = await useSession<AdminSessionData>(getAdminSessionConfig());
		return { authenticated: Boolean(session.data.authenticated) };
	},
);

export const loginAdmin = createServerFn({ method: "POST" })
	.validator((data: { password: string }) => data)
	.handler(async ({ data }) => {
		const adminPassword = process.env.ADMIN_PASSWORD;
		if (!adminPassword) {
			throw new Error("ADMIN_PASSWORD is not configured");
		}
		if (data.password !== adminPassword) {
			throw new Error("Invalid password");
		}

		const session = await useSession<AdminSessionData>(getAdminSessionConfig());
		await session.update({ authenticated: true });
		return { success: true as const };
	});

export const logoutAdmin = createServerFn({ method: "POST" }).handler(
	async () => {
		const session = await useSession<AdminSessionData>(getAdminSessionConfig());
		await session.clear();
		return { success: true as const };
	},
);

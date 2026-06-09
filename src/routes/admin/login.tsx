import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { checkAdminSession, loginAdmin } from "#/server/auth";

export const Route = createFileRoute("/admin/login")({
	beforeLoad: async () => {
		const session = await checkAdminSession();
		if (session.authenticated) {
			throw redirect({ to: "/admin" });
		}
	},
	component: AdminLoginPage,
});

function AdminLoginPage() {
	const router = useRouter();
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			await loginAdmin({ data: { password } });
			await router.invalidate();
			await router.navigate({ to: "/admin" });
		} catch (loginError) {
			setError(
				loginError instanceof Error ? loginError.message : "Login failed",
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<main className="flex min-h-dvh items-center justify-center bg-stone-50 px-4">
			<div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
				<h1 className="text-2xl font-bold text-stone-900">Admin login</h1>
				<p className="mt-2 text-sm text-stone-500">
					Sign in to manage tournaments.
				</p>

				<form onSubmit={handleSubmit} className="mt-8 space-y-4">
					<label className="block space-y-1.5">
						<span className="text-sm font-medium text-stone-700">Password</span>
						<input
							type="password"
							required
							autoComplete="current-password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className="w-full rounded-xl border border-stone-200 px-3 py-2"
						/>
					</label>

					{error ? (
						<p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
							{error}
						</p>
					) : null}

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full rounded-full bg-stone-900 py-3 text-sm font-semibold text-white disabled:opacity-60"
					>
						{isSubmitting ? "Signing in..." : "Sign in"}
					</button>
				</form>
			</div>
		</main>
	);
}

import { createFileRoute, Link, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
	TournamentForm,
	tournamentToFormValues,
	type TournamentFormValues,
} from "#/components/admin/tournament-form";
import type { Tournament } from "#/db/schema";
import { checkAdminSession, logoutAdmin } from "#/server/auth";
import {
	createTournament,
	deleteTournament,
	listTournamentsAdmin,
	updateTournament,
} from "#/server/tournaments";

export const Route = createFileRoute("/admin/")({
	beforeLoad: async () => {
		const session = await checkAdminSession();
		if (!session.authenticated) {
			throw redirect({ to: "/admin/login" });
		}
	},
	loader: () => listTournamentsAdmin(),
	component: AdminPage,
});

type EditorState =
	| { mode: "create" }
	| { mode: "edit"; tournament: Tournament };

function statusClassName(status: Tournament["status"]) {
	switch (status) {
		case "published":
			return "bg-green-50 text-green-700";
		case "cancelled":
			return "bg-red-50 text-red-700";
		default:
			return "bg-stone-100 text-stone-600";
	}
}

function AdminPage() {
	const router = useRouter();
	const tournaments = Route.useLoaderData();
	const [editor, setEditor] = useState<EditorState | null>(null);
	const [actionError, setActionError] = useState<string | null>(null);

	async function refreshTournaments() {
		await router.invalidate();
	}

	async function handleLogout() {
		await logoutAdmin();
		await router.invalidate();
		await router.navigate({ to: "/admin/login" });
	}

	async function handleCreate(values: TournamentFormValues) {
		await createTournament({ data: values });
		setEditor(null);
		await refreshTournaments();
	}

	async function handleUpdate(values: TournamentFormValues) {
		if (!editor || editor.mode !== "edit") return;
		await updateTournament({ data: { ...values, id: editor.tournament.id } });
		setEditor(null);
		await refreshTournaments();
	}

	async function handleDelete(tournament: Tournament) {
		const confirmed = window.confirm(
			`Permanently delete "${tournament.title}"? This cannot be undone.`,
		);
		if (!confirmed) return;

		setActionError(null);
		try {
			await deleteTournament({ data: { id: tournament.id } });
			if (editor?.mode === "edit" && editor.tournament.id === tournament.id) {
				setEditor(null);
			}
			await refreshTournaments();
		} catch (error) {
			setActionError(
				error instanceof Error ? error.message : "Delete failed",
			);
		}
	}

	return (
		<main className="min-h-dvh bg-stone-50 px-4 py-10">
			<div className="mx-auto max-w-6xl space-y-8">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold text-stone-900">
							Tournaments admin
						</h1>
						<p className="mt-2 text-sm text-stone-500">
							Create, publish, and update upcoming tournaments.
						</p>
					</div>
					<div className="flex flex-wrap gap-3">
						<Link
							to="/"
							className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700"
						>
							View site
						</Link>
						<button
							type="button"
							onClick={() => setEditor({ mode: "create" })}
							className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white"
						>
							New tournament
						</button>
						<button
							type="button"
							onClick={handleLogout}
							className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700"
						>
							Log out
						</button>
					</div>
				</div>

				{actionError ? (
					<p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
						{actionError}
					</p>
				) : null}

				{editor ? (
					<TournamentForm
						key={
							editor.mode === "edit"
								? `edit-${editor.tournament.id}`
								: "create"
						}
						initialValues={
							editor.mode === "edit"
								? tournamentToFormValues(editor.tournament)
								: undefined
						}
						submitLabel={
							editor.mode === "edit" ? "Save changes" : "Create tournament"
						}
						onSubmit={
							editor.mode === "edit" ? handleUpdate : handleCreate
						}
						onCancel={() => setEditor(null)}
					/>
				) : null}

				<div className="overflow-hidden rounded-3xl border border-stone-200 bg-white">
					<table className="min-w-full text-left text-sm">
						<thead className="border-b border-stone-200 bg-stone-50 text-stone-500">
							<tr>
								<th className="px-4 py-3 font-medium">Title</th>
								<th className="px-4 py-3 font-medium">Slug</th>
								<th className="px-4 py-3 font-medium">Organizer</th>
								<th className="px-4 py-3 font-medium">Start</th>
								<th className="px-4 py-3 font-medium">Fill</th>
								<th className="px-4 py-3 font-medium">Status</th>
								<th className="px-4 py-3 font-medium">Actions</th>
							</tr>
						</thead>
						<tbody>
							{tournaments.length === 0 ? (
								<tr>
									<td
										colSpan={7}
										className="px-4 py-8 text-center text-stone-500"
									>
										No tournaments yet. Create one to get started.
									</td>
								</tr>
							) : (
								tournaments.map((tournament) => (
									<tr
										key={tournament.id}
										className="border-b border-stone-100 last:border-b-0"
									>
										<td className="px-4 py-4 font-medium text-stone-900">
											{tournament.title}
										</td>
										<td className="px-4 py-4 font-mono text-xs text-stone-600">
											{tournament.slug}
										</td>
										<td className="px-4 py-4 text-stone-600">
											{tournament.organizerName}
										</td>
										<td className="px-4 py-4 text-stone-600 tabular-nums">
											{new Date(tournament.startDate).toLocaleString()}
										</td>
										<td className="px-4 py-4 text-stone-600 tabular-nums">
											{tournament.registeredPlayers}/{tournament.maxPlayers}
										</td>
										<td className="px-4 py-4">
											<span
												className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusClassName(tournament.status)}`}
											>
												{tournament.status}
											</span>
										</td>
										<td className="px-4 py-4">
											<div className="flex flex-wrap gap-2">
												{tournament.status === "published" ? (
													<Link
														to="/tournaments/$slug"
														params={{ slug: tournament.slug }}
														target="_blank"
														className="rounded-full border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700"
													>
														View
													</Link>
												) : null}
												<button
													type="button"
													onClick={() =>
														setEditor({ mode: "edit", tournament })
													}
													className="rounded-full border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700"
												>
													Edit
												</button>
												<button
													type="button"
													onClick={() => handleDelete(tournament)}
													className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700"
												>
													Delete
												</button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}

import { useState } from "react";
import type { Tournament, TournamentStatus } from "#/db/schema";
import { tournamentStatuses } from "#/db/schema";
import { slugifyTitle } from "#/lib/slug";

export type TournamentFormValues = {
	title: string;
	slug: string;
	organizerName: string;
	imageUrl: string;
	startDate: string;
	maxPlayers: number;
	registeredPlayers: number;
	registrationUrl: string;
	description: string;
	category: string;
	status: TournamentStatus;
};

const emptyValues: TournamentFormValues = {
	title: "",
	slug: "",
	organizerName: "",
	imageUrl: "",
	startDate: "",
	maxPlayers: 32,
	registeredPlayers: 0,
	registrationUrl: "",
	description: "",
	category: "",
	status: "draft",
};

function toLocalDateTimeValue(date: Date): string {
	const offset = date.getTimezoneOffset();
	const local = new Date(date.getTime() - offset * 60_000);
	return local.toISOString().slice(0, 16);
}

export function tournamentToFormValues(
	tournament: Tournament,
): TournamentFormValues {
	return {
		title: tournament.title,
		slug: tournament.slug,
		organizerName: tournament.organizerName,
		imageUrl: tournament.imageUrl,
		startDate: toLocalDateTimeValue(new Date(tournament.startDate)),
		maxPlayers: tournament.maxPlayers,
		registeredPlayers: tournament.registeredPlayers,
		registrationUrl: tournament.registrationUrl,
		description: tournament.description,
		category: tournament.category,
		status: tournament.status,
	};
}

type TournamentFormProps = {
	initialValues?: TournamentFormValues;
	submitLabel: string;
	onSubmit: (values: TournamentFormValues) => Promise<void>;
	onCancel: () => void;
};

export function TournamentForm({
	initialValues = emptyValues,
	submitLabel,
	onSubmit,
	onCancel,
}: TournamentFormProps) {
	const [values, setValues] = useState<TournamentFormValues>(initialValues);
	const [slugTouched, setSlugTouched] = useState(
		Boolean(initialValues.slug.trim()),
	);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	function updateTitle(title: string) {
		setValues((current) => {
			const next = { ...current, title };
			if (!slugTouched) {
				next.slug = slugifyTitle(title);
			}
			return next;
		});
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setIsSubmitting(true);
		try {
			await onSubmit(values);
		} catch (submitError) {
			setError(
				submitError instanceof Error
					? submitError.message
					: "Something went wrong",
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 rounded-3xl border border-stone-200 bg-white p-6"
		>
			<div className="grid gap-4 md:grid-cols-2">
				<label className="block space-y-1.5 md:col-span-2">
					<span className="text-sm font-medium text-stone-700">Title</span>
					<input
						required
						value={values.title}
						onChange={(event) => updateTitle(event.target.value)}
						className="w-full rounded-xl border border-stone-200 px-3 py-2"
					/>
				</label>

				<label className="block space-y-1.5 md:col-span-2">
					<span className="text-sm font-medium text-stone-700">Slug</span>
					<input
						required
						value={values.slug}
						onChange={(event) => {
							setSlugTouched(true);
							setValues((current) => ({
								...current,
								slug: event.target.value,
							}));
						}}
						placeholder="summer-padel-open-championship"
						className="w-full rounded-xl border border-stone-200 px-3 py-2 font-mono text-sm"
					/>
					<span className="text-xs text-stone-500">
						Used in the public URL: /tournaments/{values.slug || "your-slug"}
					</span>
				</label>

				<label className="block space-y-1.5">
					<span className="text-sm font-medium text-stone-700">Organizer</span>
					<input
						required
						value={values.organizerName}
						onChange={(event) =>
							setValues((current) => ({
								...current,
								organizerName: event.target.value,
							}))
						}
						className="w-full rounded-xl border border-stone-200 px-3 py-2"
					/>
				</label>

				<label className="block space-y-1.5">
					<span className="text-sm font-medium text-stone-700">Status</span>
					<select
						value={values.status}
						onChange={(event) =>
							setValues((current) => ({
								...current,
								status: event.target.value as TournamentStatus,
							}))
						}
						className="w-full rounded-xl border border-stone-200 px-3 py-2"
					>
						{tournamentStatuses.map((status) => (
							<option key={status} value={status}>
								{status}
							</option>
						))}
					</select>
				</label>

				<label className="block space-y-1.5 md:col-span-2">
					<span className="text-sm font-medium text-stone-700">Image URL</span>
					<input
						required
						type="url"
						value={values.imageUrl}
						onChange={(event) =>
							setValues((current) => ({
								...current,
								imageUrl: event.target.value,
							}))
						}
						className="w-full rounded-xl border border-stone-200 px-3 py-2"
					/>
				</label>

				<label className="block space-y-1.5 md:col-span-2">
					<span className="text-sm font-medium text-stone-700">
						Registration URL
					</span>
					<input
						required
						type="url"
						value={values.registrationUrl}
						onChange={(event) =>
							setValues((current) => ({
								...current,
								registrationUrl: event.target.value,
							}))
						}
						className="w-full rounded-xl border border-stone-200 px-3 py-2"
					/>
				</label>

				<label className="block space-y-1.5 md:col-span-2">
					<span className="text-sm font-medium text-stone-700">Category</span>
					<input
						value={values.category}
						onChange={(event) =>
							setValues((current) => ({
								...current,
								category: event.target.value,
							}))
						}
						placeholder="All Skill Levels"
						className="w-full rounded-xl border border-stone-200 px-3 py-2"
					/>
					<span className="text-xs text-stone-500">
						Required before publishing.
					</span>
				</label>

				<label className="block space-y-1.5 md:col-span-2">
					<span className="text-sm font-medium text-stone-700">Description</span>
					<textarea
						rows={5}
						value={values.description}
						onChange={(event) =>
							setValues((current) => ({
								...current,
								description: event.target.value,
							}))
						}
						placeholder="About the tournament..."
						className="w-full rounded-xl border border-stone-200 px-3 py-2"
					/>
					<span className="text-xs text-stone-500">
						Required before publishing.
					</span>
				</label>

				<label className="block space-y-1.5">
					<span className="text-sm font-medium text-stone-700">Start date</span>
					<input
						required
						type="datetime-local"
						value={values.startDate}
						onChange={(event) =>
							setValues((current) => ({
								...current,
								startDate: event.target.value,
							}))
						}
						className="w-full rounded-xl border border-stone-200 px-3 py-2"
					/>
				</label>

				<div className="grid grid-cols-2 gap-4">
					<label className="block space-y-1.5">
						<span className="text-sm font-medium text-stone-700">
							Max players
						</span>
						<input
							required
							type="number"
							min={1}
							value={values.maxPlayers}
							onChange={(event) =>
								setValues((current) => ({
									...current,
									maxPlayers: Number(event.target.value),
								}))
							}
							className="w-full rounded-xl border border-stone-200 px-3 py-2 tabular-nums"
						/>
					</label>

					<label className="block space-y-1.5">
						<span className="text-sm font-medium text-stone-700">
							Registered players
						</span>
						<input
							required
							type="number"
							min={0}
							value={values.registeredPlayers}
							onChange={(event) =>
								setValues((current) => ({
									...current,
									registeredPlayers: Number(event.target.value),
								}))
							}
							className="w-full rounded-xl border border-stone-200 px-3 py-2 tabular-nums"
						/>
					</label>
				</div>
			</div>

			{error ? (
				<p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
					{error}
				</p>
			) : null}

			<div className="flex flex-wrap gap-3">
				<button
					type="submit"
					disabled={isSubmitting}
					className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
				>
					{isSubmitting ? "Saving..." : submitLabel}
				</button>
				<button
					type="button"
					onClick={onCancel}
					className="rounded-full border border-stone-200 px-5 py-2.5 text-sm font-semibold text-stone-700"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}

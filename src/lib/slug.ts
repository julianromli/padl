const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugifyTitle(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

export function isValidSlug(value: string): boolean {
	return value.length > 0 && slugPattern.test(value);
}

export function withSlugSuffix(baseSlug: string, suffix: number): string {
	return suffix <= 1 ? baseSlug : `${baseSlug}-${suffix}`;
}

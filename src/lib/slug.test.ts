import { describe, expect, it } from "vitest";
import { isValidSlug, slugifyTitle, withSlugSuffix } from "#/lib/slug";

describe("slugifyTitle", () => {
	it("creates lowercase hyphenated slugs", () => {
		expect(slugifyTitle("Summer Padel Open Championship")).toBe(
			"summer-padel-open-championship",
		);
	});
});

describe("isValidSlug", () => {
	it("accepts valid slugs", () => {
		expect(isValidSlug("summer-open")).toBe(true);
		expect(isValidSlug("summer-open-2")).toBe(true);
	});

	it("rejects invalid slugs", () => {
		expect(isValidSlug("Summer Open")).toBe(false);
		expect(isValidSlug("")).toBe(false);
	});
});

describe("withSlugSuffix", () => {
	it("appends numeric suffixes after the first collision", () => {
		expect(withSlugSuffix("summer-open", 1)).toBe("summer-open");
		expect(withSlugSuffix("summer-open", 2)).toBe("summer-open-2");
	});
});

# Padel Coaching Site

Marketing site for a padel coaching business, with database-backed tournament listings editable by staff.

## Language

**Tournament**:
A scheduled competitive or friendly padel event with a fixed start date, player capacity, and current registration count. Display labels (countdown, fill rate, progress bar) are derived from stored data, not edited as free text.
*Avoid*: Event (reserved for future content), Competition, Match

**Tournament slug**:
The stable URL segment for a tournament's public detail page (e.g. `summer-padel-open-championship` in `/tournaments/summer-padel-open-championship`). Stored in the database, unique across tournaments. Auto-generated from title on create (lowercase, hyphenated); if taken, a numeric suffix is appended (`-2`, `-3`). Staff can override in admin. Changing the slug breaks old links — treat as permanent once published.
*Avoid*: id (in public URLs), permalink, handle

**Organizer**:
The person or brand running a tournament (e.g. "PADL Pro"). Stored as `organizerName`.
*Avoid*: org, host, provider

**Registration fill**:
How many players have signed up relative to capacity (`registeredPlayers` / `maxPlayers`). Shown in the UI as a progress bar and label like "85/100 Players". Staff update `registeredPlayers` manually in admin — no external booking integration in v1.
*Avoid*: raised, funded, collected

**Countdown label**:
Human-readable time until a tournament starts, computed from `startDate` (e.g. "Starts in 7 days"). For past published tournaments on the detail page, replaced by "Event ended".
*Avoid*: daysLeft (as a stored field)

**Past tournament** (detail page):
A `published` tournament whose `startDate` is in the past. Still viewable at its slug URL, but not listed on the landing page. Shows "Event ended" instead of a countdown; the Register button is hidden.
*Avoid*: archived, completed, historical event

**Tournament status**:
Lifecycle state of a tournament record: `draft`, `published`, or `cancelled`. Public queries filter on status.
*Avoid*: active, live, enabled

**Draft**:
A tournament being prepared in admin. Not visible on the public site.
*Avoid*: unpublished, hidden, inactive

**Published**:
A tournament approved for public display on the landing page.
*Avoid*: live, active, visible

**Cancelled**:
A tournament that will not run. Retained in the database for admin history. Never shown on the public site. Used when a real tournament is called off — not the same as delete.
*Avoid*: deleted, removed, archived

**Delete** (admin):
Permanent removal of a tournament row from the database. Intended for drafts and mistakes, not for calling off a tournament that was publicly announced (use cancel instead). Requires confirmation.
*Avoid*: remove, archive, trash

**Upcoming tournament** (public):
A `published` tournament whose `startDate` is still in the future. This is the only kind shown on the landing page. Past tournaments drop off automatically — no manual archive step.
*Avoid*: active tournament, live tournament, current tournament

**Tournament detail page**:
The public page at `/tournaments/[slug]` for a single tournament. Accessible for any `published` tournament — including past events — so shared links keep working. `draft` and `cancelled` tournaments return not found. Not listed on the landing page once past.
*Avoid*: event page, tournament profile

**Tournament not found**:
What the public sees when a detail page URL does not resolve to a viewable tournament (unknown slug, `draft`, or `cancelled`). A single generic message within the normal site layout — no distinction between causes, so internal status is not exposed.
*Avoid*: 404 page (as a user-facing label), gone, unavailable

**Admin**:
The protected area where staff manage tournaments. `/admin/login` handles authentication; `/admin` is the tournament manager (list + create/edit). Access requires a shared password verified server-side.
*Avoid*: dashboard, CMS, back-office

**Staff session**:
An authenticated browser session created after a successful admin login. Stored as an httpOnly cookie and checked on every admin mutation.
*Avoid*: token, JWT (unless we adopt that implementation later)

**Tournament image**:
A cover photo for a tournament card, stored as an external `imageUrl`. Staff paste a link — no file upload in v1.
*Avoid*: thumbnail, hero, banner (use "tournament image" consistently)

**Registration link**:
External URL where players sign up for a tournament (e.g. Playtomic, Google Form). The "Register Now" button on the tournament detail page opens this link in a new tab. Landing cards link to the detail page, not directly here.
*Avoid*: signup URL, booking link, CTA URL

**Tournament description**:
Free-text copy for the "About the Tournament" section on the public detail page. Edited by staff in admin; not shown on landing cards. Optional while `draft`; required before a tournament can be `published`.
*Avoid*: about text, body, content

**Tournament category**:
A short label describing who the tournament is for (e.g. "All Skill Levels", "Intermediate+"). Shown on the detail page; edited by staff in admin. Optional while `draft`; required before a tournament can be `published`.
*Avoid*: skill level (unless we split those later), division, tier

**Detail page template**:
Shared layout and feature cards on `/tournaments/[slug]` that are identical for every tournament in v1. Only tournament-specific fields (title, image, stats, description, category, etc.) come from the database.
*Avoid*: page builder, CMS blocks, sections

**Tournaments admin**:
The sole v1 scope of `/admin` — create, edit, publish, cancel, and delete tournament records. Other site content (FAQs, features, nav) remains static until a future pass.
*Avoid*: CMS, content manager, site settings

**Seed tournaments**:
Placeholder tournament records bootstrapped from the original static data into Turso on first setup, marked `published` so the landing page is populated. Each seed includes `slug`, `description`, and `category` so publish validation passes on fresh installs. Replaced by real entries over time via admin.
*Avoid*: demo data, fixtures, sample content

**Tournament migration**:
A one-off schema/data pass that backfills `slug`, `description`, and `category` on tournament rows already in Turso before the detail-page feature ships. Ensures existing published tournaments remain valid without manual admin fixes.
*Avoid*: data fix, backfill script

**Tournament listings** (public):
All public tournament UI — landing cards and detail pages — reads from the database. Static `src/data/tournaments.ts` is removed once wired. No dual source of truth.
*Avoid*: hardcoded tournaments, static cards
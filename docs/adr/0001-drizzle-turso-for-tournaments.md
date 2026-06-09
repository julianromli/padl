# Drizzle + Turso for tournament persistence

Tournament listings are stored in Turso (libSQL) via Drizzle ORM instead of static TypeScript data files. Staff edit tournaments through a protected `/admin` area backed by TanStack Start server functions.

We chose Turso because the site needs a small, relational dataset with low operational overhead and edge-friendly deployment on Vercel. Drizzle gives typed queries and migrations without pulling in a heavier CMS. Static `src/data/*.ts` files remain for FAQs and features until a second editable section justifies expanding the admin surface.

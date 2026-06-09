import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "#/db/schema";

function createDb() {
	const url = process.env.DATABASE_URL;
	if (!url) {
		throw new Error("DATABASE_URL is not set");
	}

	const client = createClient({
		url,
		authToken: process.env.DATABASE_AUTH_TOKEN,
	});

	return drizzle(client, { schema });
}

let db: ReturnType<typeof createDb> | undefined;

export function getDb() {
	if (!db) {
		db = createDb();
	}
	return db;
}

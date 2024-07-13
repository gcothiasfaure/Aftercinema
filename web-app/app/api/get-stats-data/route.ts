import "server-only";

import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	const res = await fetch(
		"https://api.aftercinema.fr/get-stats-data"
	);
	const data = await res.json();
	return Response.json({ data });
}

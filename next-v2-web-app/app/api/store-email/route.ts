import "server-only";

import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	const res = await fetch(
		"https://api.aftercinema.fr/store-email?email=" +
			request.nextUrl.searchParams.get("email")
	);
	const data = await res.json();
	return Response.json({ data });
}

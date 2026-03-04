import { NextRequest } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL!;

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params; // 🔥 ВАЖЛИВО

  const response = await fetch(`${BACKEND_URL}/auth/${path.join("/")}`, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.get("cookie") || "",
    },
    body: req.method !== "GET" ? await req.text() : undefined,
  });

  const data = await response.text();

  return new Response(data, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") || "application/json",
      "Set-Cookie": response.headers.get("Set-Cookie") || "",
    },
  });
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };

import { NextRequest } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL!;

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const url = `${BACKEND_URL}/auth/${path.join("/")}`;

  // 1️⃣ Основний запит
  let backendResponse = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.get("cookie") || "",
    },
    body: req.method !== "GET" ? await req.text() : undefined,
  });

  // 2️⃣ Якщо 401 — пробуємо refresh
  if (backendResponse.status === 401) {
    const refreshResponse = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    });

    if (refreshResponse.ok) {
      // 3️⃣ Повторюємо оригінальний запит
      backendResponse = await fetch(url, {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
          cookie:
            refreshResponse.headers.get("set-cookie") ||
            req.headers.get("cookie") ||
            "",
        },
        body: req.method !== "GET" ? await req.text() : undefined,
      });
    } else {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  const data = await backendResponse.text();

  return new Response(data, {
    status: backendResponse.status,
    headers: {
      "Content-Type":
        backendResponse.headers.get("Content-Type") || "application/json",
      ...(backendResponse.headers.get("set-cookie") && {
        "Set-Cookie": backendResponse.headers.get("set-cookie")!,
      }),
    },
  });
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };

// app/api/session/route.ts

import { cookies } from "next/headers";

// Create Session
export async function POST(req: Request) {
  try {
    const { accessToken } = await req.json();
    if (!accessToken) {
      return new Response("Access token is required", { status: 400 });
    }

    const cookieStore = cookies();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookieStore.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
      sameSite: "lax",
    });

    return new Response("Session created", { status: 200 });
  } catch (error) {
    console.error("Error creating session:", error);
    return new Response("Error creating session", { status: 500 });
  }
}

// Delete Session
export async function DELETE() {
  try {
    cookies().delete("access_token");
    return new Response("Session deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting session:", error);
    return new Response("Error deleting session", { status: 500 });
  }
}

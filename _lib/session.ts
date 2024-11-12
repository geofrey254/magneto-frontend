// app/api/session/route.ts
import { cookies } from "next/headers";

// Create Session
export async function POST(req: Request) {
  try {
    const { accessToken } = await req.json(); // Extract the accessToken from the request body

    // Ensure the accessToken exists
    if (!accessToken) {
      return new Response("Access token is required", { status: 400 });
    }

    const cookieStore = cookies();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days expiry

    // Set the access token in an HttpOnly cookie
    cookieStore.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
      expires: expiresAt,
      path: "/",
      sameSite: "lax", // SameSite security
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
    const cookieStore = cookies();
    cookieStore.delete("access_token"); // Delete the access token cookie

    return new Response("Session deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting session:", error);
    return new Response("Error deleting session", { status: 500 });
  }
}

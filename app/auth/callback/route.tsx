// auth/callback/route.tsx
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Example: Exchange the code for a token using your Django backend
async function exchangeCodeForToken(code: string) {
  try {
    // Send the authorization code to your Django backend to exchange for a token
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH}/google/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }), // Sending the code to Django
    });

    if (!response.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const data = await response.json();
    return data.token; // Assuming the token is in the response
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    return null;
  }
}

export async function GET(request: Request) {
  // Get the URL parameters from the callback
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    // Attempt to exchange the code for a token
    const token = await exchangeCodeForToken(code);

    if (token) {
      // Store the token in cookies or local storage
      const cookieStore = cookies();
      cookieStore.set("token", token, {
        httpOnly: true,
        maxAge: 1800, // Token expiration in seconds (30 minutes)
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });

      // After storing the token, force a re-check of authentication state
      // You can add a state update here to refresh the navbar immediately
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      // If token exchange failed, redirect to login with an error
      return redirect("/signin?error=token_exchange_failed");
    }
  }

  // If no code is found, handle the error
  return redirect("/signin?error=callback_error");
}

// pages/api/check-session.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies["session"]; // Get the JWT from the cookie

  if (!token) {
    return res.status(200).json({ loggedIn: false }); // No token found, user is not logged in
  }

  // Step 2: Send the token to Django's `/api/token/verify/` endpoint
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}token/verify/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Send the JWT token for validation
      }
    );

    if (response.ok) {
      return res.status(200).json({ loggedIn: true }); // Token is valid
    } else {
      return res.status(200).json({ loggedIn: false }); // Invalid or expired token
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    return res.status(500).json({ loggedIn: false }); // Internal error
  }
}

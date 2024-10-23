// Import the function to retrieve the authentication token
import { getAuthToken } from "./get-token";

// Function to load the authenticated user's information
export async function getUserMeLoader() {
  // Base URL for the API (Strapi backend)
  const baseUrl = "http://localhost:1337";

  // Construct the URL for the "get current user" API endpoint
  const url = new URL("/api/users/me", baseUrl);

  // Retrieve the authentication token using the getAuthToken function
  const authToken = await getAuthToken();

  // If no auth token is available, return an error response
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    // Make a GET request to the API to retrieve user information
    const response = await fetch(url.href, {
      method: "GET", // HTTP GET method to fetch user details
      headers: {
        "Content-Type": "application/json", // Expecting a JSON response
        Authorization: `Bearer ${authToken}`, // Attach the Bearer token for authentication
      },
      cache: "no-cache", // Disable caching to ensure fresh data
    });

    // Parse the response data as JSON
    const data = await response.json();

    // If the response contains an error, return the error object
    if (data.error) return { ok: false, data: null, error: data.error };

    // Return the successful response along with the user data
    return { ok: true, data: data, error: null };
  } catch (error) {
    // Log any errors encountered during the request
    console.log(error);

    // Return an error object if the request fails
    return { ok: false, data: null, error: error };
  }
}

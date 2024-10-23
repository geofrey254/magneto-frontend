// Define an interface for the properties required for user registration
interface RegisterUserProps {
  username?: string; // Optional username field for registration
  password?: string; // Optional password field for registration
  email?: string; // Optional email field for registration
}

// Define an interface for the properties required for user login
interface LoginUserProps {
  identifier?: string; // Optional identifier field (can be username or email) for login
  password?: string; // Optional password field for login
}

// Base URL for the Strapi backend API
const baseUrl = "http://localhost:1337";

// Function to handle user registration via API
export async function registerUserService(userData: RegisterUserProps) {
  // Construct the full URL for the registration endpoint
  const url = new URL("/api/auth/local/register", baseUrl);

  try {
    // Make a POST request to the registration API with the provided user data
    const response = await fetch(url, {
      method: "POST", // HTTP method to create a new user
      headers: {
        "Content-Type": "application/json", // Specify that the request body is JSON
      },
      body: JSON.stringify({ ...userData }), // Send the user data in the request body
      cache: "no-cache", // Disable caching for the request
    });

    // Return the response as JSON
    return response.json();
  } catch (error) {
    // Log any errors that occur during the request
    console.error("Registration Service Error:", error);
  }
}

// Function to handle user login via API
export async function loginUserService(userData: LoginUserProps) {
  // Construct the full URL for the login endpoint
  const url = new URL("/api/auth/local", baseUrl);

  try {
    // Make a POST request to the login API with the provided user data
    const response = await fetch(url, {
      method: "POST", // HTTP method to log the user in
      headers: {
        "Content-Type": "application/json", // Specify that the request body is JSON
      },
      body: JSON.stringify({ ...userData }), // Send the login data in the request body
      cache: "no-cache", // Disable caching for the request
    });

    // Return the response as JSON
    return response.json();
  } catch (error) {
    // Log any errors that occur during the request and throw the error
    console.error("Login Service Error:", error);
    throw error;
  }
}

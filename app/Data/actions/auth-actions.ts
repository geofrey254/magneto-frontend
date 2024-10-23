"use server"; // Specifies that the file contains server-side actions
/**
 * This code provides server-side actions for user authentication in a Next.js application.
 * It includes functions for registering, logging in, and logging out users using the Strapi backend API.
 *
 * Key Features:
 * - **Zod validation**: Ensures the input data (such as username, password, and email) meets the required format.
 * - **User registration**: The `registerUserAction` function validates form data, attempts to register the user through a service,
 *   and manages errors if registration fails. On success, it sets a JWT cookie and redirects the user to the dashboard.
 * - **User login**: The `loginUserAction` function validates login form data, attempts to log in the user, and handles errors
 *   appropriately. If login is successful, it sets a JWT cookie and redirects to the dashboard.
 * - **Logout action**: The `logoutAction` function clears the JWT cookie and redirects the user to the homepage.
 * - **Cookie management**: A secure JWT cookie is set upon successful registration or login, with configuration settings that ensure
 *   cookies are HTTP-only and secured in production environments.
 * - **Redirection**: After successful login or registration, users are redirected to the dashboard, and after logout, they are redirected
 *   to the homepage.
 */

import { z } from "zod"; // Importing Zod library for schema validation
import { cookies } from "next/headers"; // Importing Next.js' cookies API for handling cookies
import { redirect } from "next/navigation"; // Importing redirect function to handle client redirection

import {
  registerUserService,
  loginUserService,
} from "../services/auth-service"; // Importing authentication services for user registration and login

// Configuration for setting JWT cookies
const config = {
  maxAge: 60 * 60 * 24 * 7, // Cookie expiration set to 1 week
  path: "/", // Cookie will be accessible from all paths
  domain: process.env.HOST ?? "localhost", // Domain for the cookie, defaults to "localhost" if no environment variable is set
  httpOnly: true, // The cookie is only accessible via HTTP, not JavaScript
  secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
};

// Zod schema for validating user registration form data
const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters", // Validation error message for username
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters", // Validation error message for password
  }),
  email: z.string().email({
    message: "Please enter a valid email address", // Validation error message for email
  }),
});

// Server-side action to handle user registration
export async function registerUserAction(prevState, formData: FormData) {
  // Validate form data using the Zod schema
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"), // Extract username from formData
    password: formData.get("password"), // Extract password from formData
    email: formData.get("email"), // Extract email from formData
  });

  // If validation fails, return error messages and update the state
  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors, // Set Zod validation errors
      strapiErrors: null, // No Strapi-specific errors
      message: "Missing Fields. Failed to Register.", // Error message to show
    };
  }

  // Call the registration service with validated data
  const responseData = await registerUserService(validatedFields.data);

  // If the service returns no response, show a generic error message
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  // If the service returns an error, handle it
  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error, // Set Strapi-specific errors
      zodErrors: null, // No Zod validation errors
      message: "Failed to Register.", // Error message to show
    };
  }

  // If registration succeeds, set JWT cookie and redirect the user to the dashboard
  cookies().set("jwt", responseData.jwt, config); // Set JWT token in cookies
  redirect("/dashboard"); // Redirect user to the dashboard
}

// Zod schema for validating login form data
const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 or more characters", // Validation error message for identifier
    })
    .max(20, {
      message: "Please enter a valid username or email address", // Validation error message for identifier
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must have at least 6 or more characters", // Validation error message for password
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters", // Validation error message for password
    }),
});

// Server-side action to handle user login
export async function loginUserAction(prevState, formData: FormData) {
  // Validate form data using the Zod schema
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"), // Extract identifier (username or email) from formData
    password: formData.get("password"), // Extract password from formData
  });

  // If validation fails, return error messages and update the state
  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors, // Set Zod validation errors
      message: "Missing Fields. Failed to Login.", // Error message to show
    };
  }

  // Call the login service with validated data
  const responseData = await loginUserService(validatedFields.data);

  // If the service returns no response, show a generic error message
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error, // Set Strapi-specific errors
      zodErrors: null, // No Zod validation errors
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  // If the service returns an error, handle it
  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error, // Set Strapi-specific errors
      zodErrors: null, // No Zod validation errors
      message: "Failed to Login.", // Error message to show
    };
  }

  // If login succeeds, set JWT cookie and redirect the user to the dashboard
  cookies().set("jwt", responseData.jwt, config); // Set JWT token in cookies
  redirect("/dashboard"); // Redirect user to the dashboard
}

// Server-side action to handle user logout
export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 }); // Clear the JWT cookie by setting its maxAge to 0
  redirect("/"); // Redirect user to the homepage after logout
}

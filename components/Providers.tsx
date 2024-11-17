"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (authStatus: boolean) => void;
  checkAuthentication: () => Promise<void>;
  setToken: (token: string) => void;
  refreshAccessToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {},
  checkAuthentication: async () => {},
  setToken: () => {},
  refreshAccessToken: async () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true); // Track if authentication is still being checked

  const setAuthenticated = (authStatus: boolean) => {
    setIsAuthenticated(authStatus);
  };

  const setToken = (token: string) => {
    document.cookie = `access=${token}; path=/; max-age=1800; secure=${
      process.env.NODE_ENV === "production"
    }; samesite=strict`; // Set token as a cookie
    checkAuthentication(); // Re-check after setting the token
  };

  useEffect(() => {
    // Extract tokens from URL when the component is mounted
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access");
    const refreshToken = urlParams.get("refresh");

    if (accessToken && refreshToken) {
      setToken(accessToken); // Save the access token in cookies
      document.cookie = `refresh=${refreshToken}; path=/; max-age=31536000; secure=${
        process.env.NODE_ENV === "production"
      }; samesite=strict`; // Save refresh token
      window.history.replaceState({}, document.title, window.location.pathname); // Remove tokens from URL
    }
  }, []);

  useEffect(() => {
    checkAuthentication(); // Perform authentication check on component mount
  }, []);

  // Function to check authentication based on the token
  const checkAuthentication = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access="))
      ?.split("=")[1];

    console.log("Token from cookies:", token); // Log token for debugging

    if (token) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/token/verify/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }
        );

        setAuthenticated(response.ok); // If token is valid, set authenticated
      } catch (error) {
        console.error("Token verification failed:", error);
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false); // No token means user is not authenticated
    }

    setIsAuthChecking(false); // Stop checking once done
  };

  // Function to refresh access token using the refresh token
  const refreshAccessToken = async (): Promise<boolean> => {
    const refreshToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refresh="))
      ?.split("=")[1];

    if (refreshToken) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setToken(data.access); // Save the new access token
          return true;
        } else {
          console.error("Failed to refresh token");
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }

    setAuthenticated(false); // If refreshing fails, user is not authenticated
    return false;
  };

  useEffect(() => {
    checkAuthentication(); // Perform authentication check on component mount
  }, []); // Empty array ensures this runs only once on mount

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        checkAuthentication,
        setToken,
        refreshAccessToken,
      }}
    >
      {isAuthChecking ? (
        <div>Loading...</div> // Optionally show loading while checking auth
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

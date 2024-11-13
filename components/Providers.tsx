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
  checkAuthentication: () => void;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {},
  checkAuthentication: () => {},
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setTokenState] = useState<string | null>(null);

  const setAuthenticated = (authStatus: boolean) => {
    setIsAuthenticated(authStatus);
  };

  const setToken = (token: string) => {
    setTokenState(token);
    document.cookie = `token=${token}; path=/; max-age=1800; secure; samesite=strict`; // Set token as a cookie
  };

  const checkAuthentication = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setAuthenticated(!!token);
  };

  // Initialize auth state when the app loads and check on token change
  useEffect(() => {
    checkAuthentication();
    console.log("Authentication check completed:", isAuthenticated);

    // This will check authentication on initial load
  }, []); // This runs once when the component mounts

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        checkAuthentication,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

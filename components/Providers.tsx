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
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {},
  checkAuthentication: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuthenticated = (authStatus: boolean) => {
    setIsAuthenticated(authStatus);
  };

  const checkAuthentication = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setAuthenticated(!!token);
  };

  // Initialize auth state when the app loads and check on token change
  useEffect(() => {
    checkAuthentication(); // This will check authentication on initial load
  }, []); // This runs once when the component mounts

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, checkAuthentication }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

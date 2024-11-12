"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "../Providers";

export function LogoutButton() {
  const { setAuthenticated, checkAuthentication } = useAuth();

  const handleLogout = () => {
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
    setAuthenticated(false);
    checkAuthentication();
  };

  return (
    <button type="button" onClick={handleLogout}>
      <LogOut className="w-6 h-6 hover:text-primary" />
    </button>
  );
}

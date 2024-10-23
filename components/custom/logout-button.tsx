"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react"; // Import NextAuth signOut

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut(); // For NextAuth logouts, it automatically handles session and redirection
  };

  return (
    <button type="button" onClick={handleLogout}>
      <LogOut className="w-6 h-6 hover:text-primary" />
    </button>
  );
}

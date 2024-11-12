import { useState, useEffect } from "react";

export function useCheckSession() {
  const [session, setSession] = useState<null | { loggedIn: boolean }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/check-session");
        const data = await res.json();
        setSession(data);
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return { session, loading };
}

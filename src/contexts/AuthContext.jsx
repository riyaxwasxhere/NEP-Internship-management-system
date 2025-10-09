import { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";
import { login as loginUser, logout as logoutUser } from "../supabase/api";
import { AuthContext } from "../hooks/useAuth";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Handle Supabase session changes
  const handleSession = async (session) => {
    if (session) {
      setSession(session);
    } else {
      setSession(null);
    }
    setIsLoading(false);
  };

  // Initialize session + subscribe to changes
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("🔹 Initial session:", session);
      handleSession(session);
    };
    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("🔔 Auth state changed:", _event);
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Login function
  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      // Supabase updates session automatically
      setSession(result.data.session);
    }
    return result;
  };

  // Logout function
  const logout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setSession(null);
    }
    return result;
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

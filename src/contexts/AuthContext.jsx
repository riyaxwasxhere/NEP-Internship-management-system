import { useEffect, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import supabase from "../supabase/supabaseClient";
import {
  login as loginUser,
  logout as logoutUser,
  getUserRole,
  getUserDetailsByRole,
} from "../supabase/api";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Handle Supabase session changes
  const handleSession = async (session) => {
    try {
      if (session) {
        setSession(session);
        const userId = session.user.id;

        // Fetch user role
        const roleRes = await getUserRole(userId);
        if (!roleRes.success) throw new Error(roleRes.error);

        // Fetch user details
        const detailsRes = await getUserDetailsByRole(userId, roleRes.data);
        if (!detailsRes.success) throw new Error(detailsRes.error);

        // Update states
        setUserRole(roleRes.data);
        setUser(detailsRes.data);

        return {
          success: true,
          data: { role: roleRes.data, user: detailsRes.data },
        };
      } else {
        // No session → clear states
        setSession(null);
        setUser(null);
        setUserRole(null);
        return { success: false, error: "No active session" };
      }
    } catch (err) {
      console.error("❌ handleSession error:", err.message);
      setUser(null);
      setUserRole(null);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Initialize session + subscribe to changes
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("🔹 Initial session:", session);
      await handleSession(session);
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

  // 🔹 Login function
  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (!result.success) return result;

    const session = result.data.session;
    const sessionRes = await handleSession(session);

    // Return consistent structure
    if (sessionRes.success) {
      return {
        success: true,
        data: {
          session,
          role: sessionRes.data.role,
          user: sessionRes.data.user,
        },
      };
    } else {
      return { success: false, error: sessionRes.error };
    }
  };

  // 🔹 Logout function
  const logout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setSession(null);
      setUser(null);
      setUserRole(null);
    }
    return result;
  };

  return (
    <AuthContext.Provider
      value={{ session, user, userRole, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

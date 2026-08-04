import { useEffect, useMemo, useState } from "react";

import AuthContext from "@/context/AuthContext";
import { getCurrentUser, logout as logoutApi, refreshAccessToken } from "@/api/auth.api";
import { setAuthToken } from "@/lib/axios";

const ACCESS_TOKEN_KEY = "accessToken";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function loadCurrentUser() {
      let token = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (!token) {
        try {
          token = await refreshAccessToken();
          if (token) {
            setAuthToken(token);
          }
        } catch {
          setAuthToken(null);
          localStorage.removeItem(ACCESS_TOKEN_KEY);
        }
      } else {
        setAuthToken(token);
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        setAuthToken(null);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    }

    loadCurrentUser();
  }, []);

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setAuthToken(null);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, isLoading, logout }),
    [user, isAuthenticated, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

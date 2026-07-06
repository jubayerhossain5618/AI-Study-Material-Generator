import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("studygen_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  const persistSession = (token, userData) => {
    localStorage.setItem("studygen_token", token);
    localStorage.setItem("studygen_user", JSON.stringify(userData));
    setUser(userData);
  };

  const register = async ({ fullName, email, password }) => {
    const { data } = await api.post("/auth/register", { fullName, email, password });
    persistSession(data.token, data.user);
    return data.user;
  };

  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    persistSession(data.token, data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("studygen_token");
    localStorage.removeItem("studygen_user");
    setUser(null);
  };

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      localStorage.setItem("studygen_user", JSON.stringify(data.user));
      setUser(data.user);
    } catch {
      // token invalid/expired — interceptor handles redirect
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("studygen_token");
    if (token) {
      refreshUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, register, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

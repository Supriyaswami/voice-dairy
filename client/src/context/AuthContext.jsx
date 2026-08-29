import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";
import { extractApiError } from "../services/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "echo-diary-token";
const USER_KEY = "echo-diary-user";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => {
    const rawUser = localStorage.getItem(USER_KEY);
    return rawUser ? JSON.parse(rawUser) : null;
  });
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(token));
  const [authError, setAuthError] = useState("");

  const persistSession = (nextToken, nextUser) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (!token) {
      setIsBootstrapping(false);
      return;
    }

    let ignore = false;

    const bootstrap = async () => {
      try {
        const response = await authService.profile();
        if (!ignore) {
          localStorage.setItem(USER_KEY, JSON.stringify(response.user));
          setUser(response.user);
        }
      } catch (error) {
        if (!ignore) {
          clearSession();
        }
      } finally {
        if (!ignore) {
          setIsBootstrapping(false);
        }
      }
    };

    bootstrap();

    return () => {
      ignore = true;
    };
  }, [token]);

  const register = async (payload) => {
    try {
      setAuthError("");
      const response = await authService.register(payload);
      persistSession(response.token, response.user);
      return response.user;
    } catch (error) {
      const message = extractApiError(error, "Registration failed.");
      setAuthError(message);
      throw new Error(message);
    }
  };

  const login = async (payload) => {
    try {
      setAuthError("");
      const response = await authService.login(payload);
      persistSession(response.token, response.user);
      return response.user;
    } catch (error) {
      const message = extractApiError(error, "Login failed.");
      setAuthError(message);
      throw new Error(message);
    }
  };

  const refreshProfile = async () => {
    const response = await authService.profile();
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    setUser(response.user);
    return response.user;
  };

  const logout = () => {
    clearSession();
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isBootstrapping,
      authError,
      register,
      login,
      logout,
      refreshProfile
    }),
    [token, user, isBootstrapping, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};


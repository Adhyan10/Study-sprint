import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getSessionUser,
  login as authLogin,
  logout as authLogout,
  signup as authSignup,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionUser = getSessionUser();
    setUser(sessionUser);
    setIsLoading(false);
  }, []);

  const login = useCallback((payload) => {
    const nextUser = authLogin(payload);
    setUser(nextUser);
    return nextUser;
  }, []);

  const signup = useCallback((payload) => {
    const nextUser = authSignup(payload);
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [isLoading, login, logout, signup, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

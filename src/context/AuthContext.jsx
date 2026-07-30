import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentAdmin, loginAdmin, logoutAdmin } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentAdmin()
      .then(setAdmin)
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      admin,
      loading,
      login: async (email, password) => {
        const user = await loginAdmin(email, password);
        setAdmin(user);
        return user;
      },
      logout: async () => {
        await logoutAdmin();
        setAdmin(null);
      },
    }),
    [admin, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}

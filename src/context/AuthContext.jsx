import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  function login(email, password) {
    // Fake auth
    if (email && password) {
      localStorage.setItem("auth", "true");
      setIsAuthenticated(true);
      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
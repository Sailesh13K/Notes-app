import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
//  Create Context
const AuthContext = createContext();

//  Create Provider Component
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const name = sessionStorage.getItem("userName");
    return name ? { name } : null;
  });

  // Login and Logout functions
  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    // navigate("/");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    setUser(null);
    // window.location.reload();
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          const name = sessionStorage.getItem("userName");
          setUser({ name });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Verification failed:", error.message);
        setUser(null);
      }
    };
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//  Custom Hook for easy access
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export default ContextProvider;

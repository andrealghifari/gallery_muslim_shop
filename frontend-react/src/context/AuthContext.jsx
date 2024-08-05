import { createContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //declare state  to save auth status and update the auth status(useState)
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("token")
  );

  useEffect(() => {
    const handleTokenChange = () => {
      setIsAuthenticated(!!Cookies.get("token"));

      window.addEventListener("storage", handleTokenChange);

      return () => {
        window.removeEventListener("storage", handleTokenChange);
      };
    };
  }, []);

  return (<AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
    {children}
  </AuthContext.Provider>)
};

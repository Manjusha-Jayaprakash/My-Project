// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password) => {
    // Replace the following line with your actual authentication logic
    const isAuthenticated = username === 'admin' && password === 'admin123';

    if (isAuthenticated) {
      setIsAuthenticated(true);
    }

    return isAuthenticated;
  };

  const logout = () => {
    // Perform logout logic here
    // Set isAuthenticated to false
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

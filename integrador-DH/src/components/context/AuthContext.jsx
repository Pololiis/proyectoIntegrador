import React, { createContext, useState, useEffect,useContext } from 'react';

const AuthContext = createContext(); // Crea el contexto

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, updateToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }; // Exporta el contexto

export const useAuthContext = () => useContext(AuthContext)
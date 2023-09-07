import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  currUser: null,
  setCurrUser: () => {},
  pending: true,
  setPending: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default to false
  const [currUser, setCurrUser] = useState(null); // default to null
  const [pending, setPending] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrUser(user);
        setPending(false);
      }
    })
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currUser, setCurrUser, pending, setPending }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

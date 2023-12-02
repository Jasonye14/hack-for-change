import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  currUser: null,
  setCurrUser: () => { },
  pending: true,
  setPending: () => { }
});

/**
 * abc123@lehigh.edu => abc123lehigh
 * test456@gmail.com => test456gmail
 */
const getEUsername = user => user.email.replace(/\..+/g, '').replace('@', '');

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // default to false
  const [currUser, setCurrUser] = useState(null);       // default to null
  const [pending, setPending] = useState(true);         // default to true
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const eUsername = getEUsername(user);
        let userWithEUsername = { ...user, eUsername }
        setIsLoggedIn(true);
        setCurrUser(userWithEUsername);
      }
      setPending(false);
    })
  }, [auth]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currUser, setCurrUser, pending, setPending }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { getEUsername, AuthProvider, useAuth }
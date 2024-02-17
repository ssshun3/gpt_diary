import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserID(user ? user.uid : null);
      }
      return () => unsubscribe();
    });
  }, []);
  return (
    <AppContext.Provider value={{ user, setUser, userID }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../configs/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (loggedinUser) => {
      setUser(loggedinUser);
    })

    return () => {
      unsubsribe();
    }
  }, [])
  
  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
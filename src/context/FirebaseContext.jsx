// React
import React from "react";
import { useContext, createContext, useState, useEffect } from "react";

// Firebase
import app from "../firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Create Context
const FirebaseContext = createContext(null);

// Create Custom Hook for using this Context
export const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log("user ", user);
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const isLoggedin = user ? true : false;

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  return (
    <FirebaseContext.Provider
      value={{
        isLoggedin,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

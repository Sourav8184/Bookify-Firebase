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

import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const fireStore = getFirestore(app);
const Storage = getStorage(app);

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

  // Signup Method
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Signin Method
  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Signin With Google Method
  const signinWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };
  console.log(user);

  // Create Books List method
  const handleCreateNewListing = async (Name, isbn, price, coverImg) => {
    const imageRef = ref(
      Storage,
      `uploads/images/${Date.now()}-${coverImg.name}`
    );

    const uploadResult = await uploadBytes(imageRef, coverImg);

    return await addDoc(collection(fireStore, "books"), {
      Name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL,
    });
  };
  //List all Books
  const listAllBooks = () => {
    return getDocs(collection(fireStore, "books"));
  };

  // getDownload image URL:
  const getImageURL = (path) => {
    return getDownloadURL(ref(Storage, path));
  };

  return (
    <FirebaseContext.Provider
      value={{
        isLoggedin,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

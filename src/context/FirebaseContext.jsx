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

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
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

  // getBookById
  const getBookById = async (id) => {
    const docRef = doc(fireStore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  // console.log("user -> ", user);

  // PlaceOrder
  const placeOrder = async (bookId, qyt) => {
    const collectoionRef = collection(fireStore, "books", bookId, "orders");
    const result = await addDoc(collectoionRef, {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qyt: Number(qyt),
    });
    return result;
  };

  //fetchMyOrder
  const fetchMyBooks = async (user_id) => {
    const collectionRef = collection(fireStore, "books");
    const q = query(collectionRef, where("userId", "==", user_id));
    const result = await getDocs(q);
    return result;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(fireStore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
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
        getBookById,
        placeOrder,
        fetchMyBooks,
        user,
        getOrders,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

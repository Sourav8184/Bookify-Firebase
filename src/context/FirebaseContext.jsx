import React from "react";
import { useContext, createContext } from "react";

import app from "../firebase/firebase";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;

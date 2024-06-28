/* eslint-disable react/prop-types */
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import axios from "axios";

import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password, displayName, photoURL, phone) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName,
        photoURL,
        phone,
      });

      console.log("User created:", user);
      return user;
    } catch (error) {
      console.error("Error creating user:", error.code, error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const loggedInUser = result.user;
      console.log("Logged In User:", loggedInUser);

      // Send the user's information to the backend to get a JWT
      const response = await axios.post(
        "https://boycott-product-forum-server.vercel.app/jwt",
        {
          email: loggedInUser.email,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("JWT Token for google login:", response.data.token);
        setUser(loggedInUser);
        return loggedInUser;
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      console.error("Error signing:", error.code, error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current user: " + currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe;
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    handleGoogleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

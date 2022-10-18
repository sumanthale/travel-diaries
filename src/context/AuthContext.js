import React, { useEffect, useRef, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { signOutUser } from "../Helpers/Login";
import Loader from "ui-component/Loader";
import { useNavigate } from "react-router";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const timeout = useRef();

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/weak-password") {
          setErrorMessage({ password: errorMessage });
        } else {
          setErrorMessage({ email: errorMessage });
        }
      });
  }

  function login({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrorMessage("Invalid Email/Password");
      });
  }

  // function resetPassword(email) {
  //   sendPasswordResetEmail(auth, email)
  //     .then(() => {
  //       // Password reset email sent!
  //       // ..
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });
  // }

  function googleSignIn() {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        console.log(token);
        const user = result.user;

        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log({ errorCode, errorMessage, email, credential });
      });
  }

  function signOutUser() {
    signOut(auth)
      .then(() => {
        console.log("Sign Out Sucessfull");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setIsAuthenticated(true);
        setUser(user);
        // setUser(user); // will set the user and all the useEffect's will use this user
        // getUserDetails(user);
        console.log(user.email);
        navigate("/");
      } else {
        setIsAuthenticated(false);

        console.log("😢 We are not authenticated!");
      }
      setIsLoading(false);
    });
    return () => {
      subscription();
      clearTimeout(timeout.current);
    };
  }, []);

  const setErrorMessage = (err) => {
    setError(err);
    if (timeout.current) {
      console.log(timeout.current);
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setError(null);
    }, 3000);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        googleSignIn,
        signOutUser,
        signUp,
        login,
        error,
      }}
    >
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

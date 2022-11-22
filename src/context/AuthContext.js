import React, { useEffect, useRef, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
// import { signOutUser } from "../Helpers/Login";
import Loader from "ui-component/Loader";
import { useLocation, useNavigate } from "react-router";
import { getUser, registerUser, updateUserData } from "api/api";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const timeout = useRef();
  console.log("AuthProvider", { isLoading });

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        registerUser({ email, password, uid: user?.uid });
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
        getUser(user?.uid);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrorMessage("Invalid Email/Password");
      });
  }
  function googleSignIn() {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        registerUser({
          email: user?.email,
          password: "default",
          uid: user?.uid,
        });
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
  const getUserDetails = async (uid) => {
    setTimeout(async () => {
      const response = await getUser(uid);
      console.log(response);
      if (response) {
        setUser(response.user);
      }
    }, 100);
  };

  const updateUser = async (usr) => {
    const response = await updateUserData({ ...usr, uid: user?.uid });
    console.log(response);
    if (response) {
      setUser((u) => ({ ...u, ...usr }));
    }
  };
  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (usr) => {
      if (usr != null) {
        setIsAuthenticated(true);
        setUser({
          ...usr,
          photoUrl:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        });
        getUserDetails(usr.uid);

        // setUser(user); // will set the user and all the useEffect's will use this user
        if (["/login", "/register"].includes(location.pathname)) {
          navigate("/");
        } else {
          navigate(location.pathname);
        }
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
        updateUser,
      }}
    >
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase";

const authContext = createContext<authContextValue>({} as authContextValue);

interface authContextProviderProps {
  children: ReactNode;
}

interface authContextValue {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignInFormActive: boolean;
  setIsSignInFormActive: React.Dispatch<React.SetStateAction<boolean>>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  user: User | null;
  getErrorMessage: (
    errorCode: string,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}

export const AuthContextProvider: React.FC<authContextProviderProps> = ({
  children,
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSignInFormActive, setIsSignInFormActive] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const signUp = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    //function that firebase notifies you if a user is set
    const unsubsrcibe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubsrcibe;
  }, []);

  const getErrorMessage = (
    errorCode: string,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return setError(
          "Email is already in use. Please choose a different email."
        );
      case "auth/wrong-password":
        return setError("Invalid password. Please enter the correct password.");
      case "auth/invalid-password":
        return setError("Invalid password. Please enter the correct password.");
      case "auth/invalid-email":
        return setError("Email doesn't exist. Please enter the correct email");
      case "auth/user-not-found":
        return setError("User does not exist");
      // Add more cases for other error codes as needed
      default:
        return setError("An error occurred. Please try again later.");
    }
  };

  const values = {
    loading,
    setLoading,
    isSignInFormActive,
    setIsSignInFormActive,
    signUp,
    signIn,
    user,
    getErrorMessage,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export const useAuthContext = (): authContextValue => useContext(authContext);

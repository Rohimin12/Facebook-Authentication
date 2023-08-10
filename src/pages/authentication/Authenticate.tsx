import React from "react";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import { useAuthContext } from "./context/authContext";

const Authenticate = () => {
  const { isSignInFormActive } = useAuthContext();
  return (
    <>
      <Login />
      {isSignInFormActive && <SignUp />}
    </>
  );
};

export default Authenticate;

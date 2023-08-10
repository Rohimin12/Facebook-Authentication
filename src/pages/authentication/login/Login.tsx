import React from "react";
import Greeting from "./Greeting/Greeting";
import Form from "./form/Form";
import { useAuthContext } from "../context/authContext";

//    md:justify-center items-center md:items-start md:px-10 md:pt-40 md:pb-48 lg:gap-24 md:gap-12

const Login: React.FC = () => {
  const { isSignInFormActive } = useAuthContext();

  return (
    <div>
      <main className="w-full min-h-[45rem] bg-gray-50 px-12 pt-5 font-SFProDisplay-Regular overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between md:mt-32 md:gap-10 lg:gap-16 max-w-[61.25rem] mx-auto">
          <Greeting />
          <div className="shrink-0 w-[24.75rem]">
            <Form />
            <h5 className="font-sans-serif text-sm text-center mt-5">
              <button className="font-bold">Create a page</button> for a
              celebrity, brand or business.
            </h5>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Login;

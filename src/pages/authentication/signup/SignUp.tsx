import React from "react";
import Form from "./form/Form";
import { FormContextProvider } from "./form/FormContext";

const SignUp = () => {
  return (
    <div className="absolute z-10 inset-0 bg-[#ffffffa6] flex justify-center items-center">
      <FormContextProvider>
        <Form />
      </FormContextProvider>
    </div>
  );
};

export default SignUp;

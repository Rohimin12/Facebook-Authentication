import { Button, FullButton } from "../../../../utils/Button";
import React, { useEffect, useState } from "react";
import LinkText from "../../../../utils/LinkText";
import { useForm } from "react-hook-form";
import Line from "../../../../utils/Line";
import { useAuthContext } from "../../context/authContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FirebaseError } from "firebase/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const formSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password required"),
});

interface loginFormValues {
  email: string;
  password: string;
}

const Form: React.FC = () => {
  const { setIsSignInFormActive, signIn, getErrorMessage } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<loginFormValues>({ resolver: yupResolver(formSchema) });
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFormError(""), 2000);
  }, [formError]);

  const signInUser = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      try {
        navigate("/main");
      } catch (error) {
        console.log(`🚀 ~ signUp error`, error);
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        getErrorMessage(err.code, setFormError);
      }
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="w-full bg-white p-4 pb-6 shadow-default rounded-md text-center">
      {formError && (
        <div className="bg-red-200 py-1 mb-2 rounded-sm flex justify-between items-center px-2">
          <h1 className="text-sm text-gray-900 text-center max-w-sm">
            {formError}
          </h1>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            size="sm"
            className="text-red-700"
          />
        </div>
      )}
      <form onSubmit={signInUser}>
        <input
          type="text"
          className="w-full border-gray-300 rounded-md text-[1.0625rem] placeholder:text-gray-400 py-3 px-4  focus:border-none mb-4"
          placeholder="Email address or phone number"
          {...register("email")}
        />
        <input
          type="password"
          className="w-full border-gray-300 rounded-md text-[1.0625rem] placeholder:text-gray-400 py-3 px-4  focus:border-none mb-4"
          placeholder="Password"
          {...register("password")}
        />
        <button
          className={`w-full font-sans-serif font-bold rounded-md drop-shadow-md text-white py-[0.6rem] px-4 mb-2 text-xl ${
            isLoading ? "bg-gray-500 pointer-events-none" : "bg-[#1877f2]"
          }`}
          type="submit">
          Log in
        </button>
      </form>
      <LinkText location="/forgottenPassword" text="Forgotten Password?" />
      <Line color="#dadde1" />
      <Button
        text="Create a new account"
        bgColor="#42b72a"
        textColor="white"
        func={() => setIsSignInFormActive((prev) => !prev)}
      />
    </div>
  );
};

export default Form;

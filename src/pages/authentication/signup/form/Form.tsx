import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import InputField from "./InputField";
import DateOfBirth from "./DateOfBirth";
import loading from "./loading.gif";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Gender from "./Gender/Gender";
import { FirebaseError } from "firebase/app";

const currentYear = new Date().getFullYear();

const formSchema = yup.object().shape({
  name: yup.object().shape({
    firstName: yup.string().required().min(4).max(10),
    surname: yup.string().required().min(4).max(10),
  }),
  gender: yup.string().required(),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^(?:\+?[0-9]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
      "Invalid phone number or email"
    ),
  newPassword: yup
    .string()
    .required("Password required")
    .min(6)
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!&])[a-zA-Z0-9!&]{6,}$/,
      "Password must contain at least six characters with numbers, letters, and punctuation (! and &)."
    )
    .max(30),
  dateOfBirth: yup.object().shape({
    day: yup.number().default(new Date().getDate()),
    month: yup.string().default(new Date().getMonth().toString()),
    year: yup
      .number()
      .required()
      .notOneOf(
        [...Array(5)].map((_, index) => currentYear - index),
        "Invalid year selection"
      ),
  }),
});

export interface FormValuesType {
  name: {
    firstName: string;
    surname: string;
  };
  email: string;
  gender: string;
  newPassword: string;
  dateOfBirth: {
    day: number;
    month: string;
    year: number;
  };
}

const Form: React.FC = () => {
  const { setIsSignInFormActive, signUp, getErrorMessage } = useAuthContext();
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    setTimeout(() => setFormError(""), 3000);
  }, [formError]);

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValuesType>({ resolver: yupResolver(formSchema) });

  function isUserAbove13Years(dateOfBirth: {
    day: number;
    month: string;
    year: number;
  }): boolean {
    const { day, month, year } = dateOfBirth;

    const DOB = new Date(year, parseInt(month) - 1, day);

    const today = new Date();
    const age = today.getFullYear() - DOB.getFullYear();
    const monthDiff = today.getMonth() - DOB.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < DOB.getDate())) {
      return age - 1 >= 13;
    } else {
      return age >= 13;
    }
  }

  const signUpUser = handleSubmit(async (data) => {
    if (!isUserAbove13Years(data.dateOfBirth)) {
      setFormError(
        "We couldn't create your account We were not able to sign you up for Facebook."
      );
      setTimeout(() => setIsSignInFormActive(false), 1000);
      return;
    }
    setFormSubmitting(true);
    try {
      await signUp(data.email, data.newPassword);

      try {
        navigate("/main");
      } catch (error) {
        console.log(`🚀 ~ signUp error`, error);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        getErrorMessage(error.code, setFormError);
        setFormSubmitting(false);
      }
    }
  });

  return (
    <form
      onSubmit={signUpUser}
      className="relative bg-white shadow-default w-[27rem] rounded-lg font-SFProDisplay-Regular">
      <div className="py-2 px-4 border-b border-b-gray-300">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-primary text-[2rem] font-SFProDisplay-bold leading-10">
            Sign Up
          </h1>
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            color="#707070"
            cursor={"pointer"}
            onClick={() => setIsSignInFormActive(false)}
          />
        </div>
        <p>It's quick and easy</p>
      </div>

      {formError && (
        <div className="text-black border-red-700 border mx-4 bg-red-200 text-sm leading-4 py-1 text-center mt-2">
          <p className="max-w-xs mx-auto">{formError}</p>
        </div>
      )}

      <div className="p-4">
        <div className="flex w-full gap-3 items-center">
          <InputField
            {...register("name.firstName")}
            placeholder="First Name"
            type="text"
            tooltip={{
              id: "firstName",
              content: "What's your name?",
              place: "left",
            }}
            error={errors.name?.firstName ? true : false}
          />
          <InputField
            type="text"
            {...register("name.surname")}
            tooltip={{
              id: "surname",
              content: "What's your name?",
              place: "bottom",
            }}
            placeholder="Surname"
            error={errors.name?.surname ? true : false}
          />
        </div>

        <div>
          <div>
            <InputField
              type="text"
              placeholder="Email Address"
              tooltip={{
                id: "email",
                content:
                  "You'll use this when you log in and if you ever need to reset your password.",
                place: "left",
              }}
              {...register("email")}
              error={errors.email ? true : false}
            />
            <InputField
              type="password"
              placeholder="New password"
              tooltip={{
                id: "password",
                content:
                  "Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).",
                place: "left",
              }}
              {...register("newPassword")}
              error={errors.newPassword ? true : false}
            />
          </div>
        </div>

        <DateOfBirth control={control} errors={errors} />

        <Gender control={control} errors={errors} />

        <p className="text-xs mt-3">
          People who use our service may have uploaded your contact information
          to Facebook.{" "}
          <a
            target="_blank"
            className="text-blue-500 hover:underline"
            href="https://www.facebook.com/help/637205020878504">
            Learn more.
          </a>
        </p>

        <p className="text-xs mt-3">
          By clicking Sign Up, you agree to our Terms,{" "}
          <a
            target="_blank"
            className="text-blue-500 hover:underline"
            href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0">
            Privacy Policy
          </a>{" "}
          and {""}
          <a
            target="_blank"
            className="text-blue-500 hover:underline"
            href="https://www.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0">
            Cookies Policy.
          </a>
          You may receive SMS notifications from us and can opt out at any time.
        </p>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className={`bg-[#42b72a] text-white py-1 max-w-[12.125rem] mt-4 text-lg hover:brightness-90 w-full font-sans-serif font-bold rounded-md drop-shadow-md inline-block ${
              formSubmitting && "hover:grayscale"
            }`}
            disabled={formSubmitting}>
            Sign Up
          </button>
          {formSubmitting && (
            <img
              src={loading}
              alt="loading"
              className="inline-block pt-5 ml-2"
            />
          )}
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </form>
  );
};

export default Form;

"use client";

import { useFormState } from "react-dom";
import signUpAction from "./signUpAction";
import PendingSubmitButton from "../custom/PendingSubmitButton";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons
import GoogleSignInButton from "../custom/Googlebtn";
import GoogleSignInError from "../custom/GoogleSignInError";

type InputErrorsT = {
  username?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

type SignUpFormInitialStateT = {
  error: false;
};

type SignUpFormErrorStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};

export type SignUpFormStateT = SignUpFormInitialStateT | SignUpFormErrorStateT;

const initialState: SignUpFormInitialStateT = {
  error: false,
};

export default function SignUpForm() {
  const [state, formAction] = useFormState<SignUpFormStateT, FormData>(
    signUpAction,
    initialState
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to manage confirm password visibility

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow dark:border sm:max-w-md p-8 md:p-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form className="space-y-4 md:space-y-6" action={formAction}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {state.error && state?.inputErrors?.username ? (
              <div className="text-red-700" aria-live="polite">
                {state.inputErrors.username[0]}
              </div>
            ) : null}
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {state.error && state?.inputErrors?.email ? (
              <div className="text-red-700" aria-live="polite">
                {state.inputErrors.email[0]}
              </div>
            ) : null}
          </div>

          <div className="mb-3 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password *
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={password}
              onChange={handlePasswordChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex justify-center items-center pt-8 pr-2" // Position the eye icon
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
            {state.error && state?.inputErrors?.password ? (
              <div className="text-red-700" aria-live="polite">
                {state.inputErrors.password[0]}
              </div>
            ) : null}
          </div>

          <div className="mb-3 relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Re-enter Password *
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex justify-center items-center pt-8 pr-2" // Position the eye icon
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
            {passwordMatchError ? (
              <div className="text-red-700" aria-live="polite">
                Passwords do not match
              </div>
            ) : null}
          </div>

          <div className="mb-3">
            <PendingSubmitButton />
          </div>

          {state.error && state.message ? (
            <div className="text-red-700" aria-live="polite">
              {state.message}
            </div>
          ) : null}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <GoogleSignInButton />
          <GoogleSignInError />

          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Already have an account?&nbsp;&nbsp;
            <a
              href="/signin"
              className="font-medium text-[#261b72] hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

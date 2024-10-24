"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons
import GoogleSignInButton from "../custom/Googlebtn";
import GoogleSignInError from "../custom/GoogleSignInError";
import Link from "next/link";
import { FaCertificate } from "react-icons/fa6";

const initialState = {
  identifier: "",
  password: "",
};

const formSchema = z.object({
  identifier: z.string().min(2).max(30),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long." })
    .max(30),
});

type FormErrorsT = {
  identifier?: undefined | string[];
  password?: undefined | string[];
  strapiError?: string;
};

export function SigninForm() {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Set state
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState<FormErrorsT>({});
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();

  // Create an event handler
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const validatedFields = formSchema.safeParse(data);

    if (!validatedFields.success) {
      setErrors(validatedFields.error.formErrors.fieldErrors);
      setLoading(false);
    } else {
      // No zod errors
      const signInResponse = await signIn("credentials", {
        identifier: data.identifier,
        password: data.password,
        redirect: true,
        callbackUrl,
      });
      if (signInResponse && !signInResponse?.ok) {
        setErrors({
          strapiError: signInResponse.error
            ? signInResponse.error
            : "Something went wrong.",
        });
        setLoading(false);
      } else {
        // Handle success
        router.push(callbackUrl);
        router.refresh();
      }
    }
  }

  return (
    <section className="p-8">
      <div className="flex flex-col items-center justify-center mx-auto md:h-fit lg:py-24">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <h4 className="font-bold text-4xl md:text-5xl text-[#350203] flex">
            Magneto <FaCertificate className="text-[#350203] cert" size={20} />
          </h4>
        </Link>
        <div className="w-full max-w-md bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {session && session.user ? (
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-center">You are already signed in.</p>
            </div>
          ) : (
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleSubmit}
                method="post"
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="identifier"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email or username
                  </label>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    required
                    value={data.identifier}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@mail.com"
                  />
                  {errors?.identifier ? (
                    <div className="text-red-700" aria-live="polite">
                      {errors.identifier[0]}
                    </div>
                  ) : null}
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={data.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />{" "}
                  {errors?.password ? (
                    <div className="text-red-700" aria-live="polite">
                      {errors.password[0]}
                    </div>
                  ) : null}{" "}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex justify-center items-center pt-7 pr-2" // Position the eye icon
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-self-end">
                  <a
                    href="/password/requestreset"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  aria-disabled={loading}
                  className="w-full text-white bg-[#350203] hover:bg-[#350203a9] focus:ring-4 focus:outline-none focus:bg-[#35020330] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Sign in
                </button>
                {errors.password || errors.identifier ? (
                  <div className="text-red-700" aria-live="polite">
                    Something went wrong. Please check your data.
                  </div>
                ) : null}
                {errors.strapiError ? (
                  <div className="text-red-700" aria-live="polite">
                    Something went wrong: {errors.strapiError}
                  </div>
                ) : null}

                {/* Add "or" separator with borders */}
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-2 text-gray-500">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <GoogleSignInButton />
                <GoogleSignInError />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?&nbsp;&nbsp;
                  <a
                    href="/signup"
                    className="font-medium text-[#261b72] hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

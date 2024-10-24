import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SignUpForm from "./SignUpForm";
import Link from "next/link";

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  return (
    <section>
      <div className="flex flex-col items-center justify-center mx-auto lg:py-6">
        <div className="mx-auto my-2 p-8 md:p-0 max-w-lg rounded-sm">
          <h2 className="text-center text-2xl text-[#350203] mb-8 font-bold">
            Sign Up
          </h2>
          {session && session.user ? (
            <p className="text-center">You are already signed in.</p>
          ) : (
            <div>
              <p className="mb-4 text-center md:text-base">
                Sign up for a new account or{" "}
                <Link href="/signin" className="underline">
                  sign in
                </Link>{" "}
                when you already have an account.
              </p>
              <SignUpForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

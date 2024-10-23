"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton() {
  return (
    <button
      className="bg-white flex justify-center items-center gap-4 border border-zinc-300 hover:bg-[#350203] hover:text-[#f8d6b6] px-8 py-2 rounded-2xl w-full text-zinc-700"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      <span className="text-red-700 mr-2">
        <FcGoogle size={30} />
      </span>{" "}
      Sign in with Google
    </button>
  );
}

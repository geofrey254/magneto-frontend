"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <button
      className="bg-white flex justify-center items-center gap-4 border border-zinc-300 hover:bg-[#3502033b] hover:text-[#350203] px-8 py-2 rounded-2xl w-full text-zinc-700"
      onClick={() => signIn("google", { callbackUrl: callbackUrl })}
    >
      <span className="text-red-700 mr-2">
        <FcGoogle size={30} />
      </span>{" "}
      Sign in with Google
    </button>
  );
}

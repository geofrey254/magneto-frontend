"use client";

import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation"; // To handle redirection after successful login

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") || process.env.NEXT_PUBLIC_WEB_URL;
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    // This should be your Django endpoint for Google login
    const googleLoginUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/social/google/`;

    // You can append the callback URL as query params if needed
    const loginUrlWithCallback = `${googleLoginUrl}?callbackUrl=${encodeURIComponent(
      callbackUrl
    )}`;

    // Redirect to the Django social login URL (this will trigger the Google OAuth flow)
    window.location.href = loginUrlWithCallback;
  };

  return (
    <button
      className="bg-white flex justify-center items-center gap-4 border border-zinc-300 hover:bg-[#3502033b] hover:text-[#350203] px-4 md:px-8 py-2 rounded-2xl w-full text-zinc-700"
      onClick={handleGoogleSignIn}
    >
      <span className="text-red-700 mr-2">
        <FcGoogle size={30} />
      </span>
      Sign in with Google
    </button>
  );
}

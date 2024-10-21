import React from "react";
import Login from "./Login";

function page() {
  return (
    <section className="w-full py-8 md:py-16 px-8 flex justify-center items-center">
      <div className="container flex flex-col items-center justify-center gap-20">
        <div className="login_head flex flex-col p-8 md:p-0 gap-4 rounded-2xl shadow-lg shadow-black justify-center items-center text-center h-[20vh] md:h-[30vh]">
          <h2 className="text-[#f8d6b6] text-2xl md:text-3xl font-bold">
            Welcome to Magneto
          </h2>
          <h3 className="text-[#f8d6b6] text-sm">
            Log in to continue your learning, or sign up to join the community.
          </h3>
        </div>
        <Login />
      </div>
    </section>
  );
}

export default page;

import React from "react";
import { FaCertificate } from "react-icons/fa6";

function Loading() {
  return (
    <section className="w-full">
      <div className="container flex justify-center items-center text-center my-52">
        <FaCertificate className="cert text-[#350203]" size={100} />
      </div>
    </section>
  );
}

export default Loading;

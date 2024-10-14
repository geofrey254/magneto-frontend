import React from "react";
import Link from "next/link";
import { SiBookstack } from "react-icons/si";
import Image from "next/image";
import learn from "@/public/img/learn.png";
import { FaCertificate } from "react-icons/fa6";

function Hero() {
  return (
    <section className="hero w-full max-w-full px-4 py-8 md:p-0">
      <div className="container grid grid-cols-4">
        <div className="col-span-3 flex flex-col gap-6">
          <h2 className="text-6xl font-bold texty">
            Level Up with{" "}
            <span className="text-transparent magneto_txt flex">
              Magneto{" "}
              <FaCertificate className="cert text-[#350203]" size={30} />
            </span>
          </h2>
          <p className="texty font-semibold">
            Access quality high school learning materials at an affordable daily
            fee, tailored to the Kenyan curriculum. Study anytime, anywhere.
          </p>
          <div className="flex justify-between items-center mt-8 gap-6">
            <Link
              href="/"
              className="texty text-nowrap bg-[#f8d6b6] p-3 rounded-xl"
            >
              Start Learning Today
            </Link>
            <Link
              href="/"
              className="texty text-nowrap p-3 flex gap-2 items-center border border-[#f8d6b6] rounded-xl"
            >
              <SiBookstack size={20} className="text-[#350203]" />
              Explore Subjects
            </Link>
          </div>
        </div>
        <div className="col-span-2 hidden md:flex">
          <Image
            src={learn}
            width={400}
            height={400}
            alt="learning illustration"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;

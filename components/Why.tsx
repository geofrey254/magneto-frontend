import React from "react";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { SiReadthedocs } from "react-icons/si";
import { PiCertificateFill } from "react-icons/pi";

function Why() {
  return (
    <section className="jumbotron bg-[#f9eeea] w-full px-4 py-8 flex justify-center">
      <div className="container bg-[#350203] w-full grid md:grid-cols-4 p-8 rounded-xl gap-12 md:gap-5">
        <div className="col-span-2 flex flex-col gap-8">
          <h3 className="text-[#f8d6b6] text-4xl md:text-6xl font-extrabold">
            How it Works!
          </h3>
          <p className="text-[#f8d6b6] md:text-xl">
            At Magneto, we{"'"}ve made accessing quality education easy and
            affordable. Follow these simple steps to enhance your learning
            experience!
          </p>
        </div>
        <div className="col-span-2 gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#f8d6b6]">
                <RiAccountPinCircleLine size={30} />
                <h4 className="text-md ">Sign Up for Free</h4>
              </div>
              <p className="text-white/65 text-sm leading-7">
                Create an account to get started. It{"'"}s quick, easy, and free
                to sign up.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#f8d6b6]">
                <BsCashCoin size={30} />
                <h4 className="text-md">Pay a Small Daily Fee</h4>
              </div>
              <p className="text-white/65 text-sm leading-7">
                To access our premium learning content, pay a small daily fee of
                Kes 40 using your preferred payment method.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#f8d6b6]">
                <SiReadthedocs size={30} />
                <h4 className="text-md">Access High-Quality Content</h4>
              </div>
              <p className="text-white/65 text-sm leading-7">
                Browse through a wide range of subjects and materials including
                video lessons, notes, and quizzes {"-"} all designed to help you
                excel.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#f8d6b6]">
                <PiCertificateFill size={30} />
                <h4 className="text-md">Achieve Academic Success</h4>
              </div>
              <p className="text-white/65 text-sm leading-7">
                With Magneto{"'"}s wide range of learning resources, you{"'"}ll
                be fully equipped to excel in your studies and achieve your
                academic goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Why;

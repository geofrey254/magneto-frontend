import Link from "next/link";
import React from "react";
import { BsQuestionDiamondFill } from "react-icons/bs";

function Why() {
  return (
    <section className="why w-full p-8 flex items-center">
      <div className="container flex flex-col gap-6 bg-[#350203] p-4 rounded-xl">
        <div className="flex items-center gap-4 mt-4">
          <h3 className="text-[#f8d6b6] text-2xl">Why Magneto</h3>
          <BsQuestionDiamondFill size={30} className="text-[#f8d6b6]" />
        </div>
        <div>
          <p className="text-white/65">
            We understand the challenges students face in getting quality
            educational resources. Magneto solves this problem by offering:
          </p>
          <ul className="mt-4 flex flex-col gap-4">
            <li className="text-white/75">
              <span className="font-bold text-[#f8d6b6]">
                Affordable Access:&nbsp;
              </span>
              Pay only for the days you use the platform, making it
              cost-effective for students.
            </li>
            <li className="text-white/75">
              <span className="font-bold text-[#f8d6b6]">
                Curriculum-Based Content:&nbsp;
              </span>
              Our materials are specifically tailored to the Kenyan high school
              curriculum, ensuring you learn exactly what{"'"}s required.
            </li>
            <li className="text-white/75">
              <span className="font-bold text-[#f8d6b6]">
                Anytime, Anywhere Learning:&nbsp;
              </span>
              Whether at home, on the go, or in school, access learning
              resources from your mobile or desktop device.
            </li>
            <li className="text-white/75">
              <span className="font-bold text-[#f8d6b6]">
                Expert Instructors:&nbsp;
              </span>
              All of our materials are curated by experienced teachers to ensure
              high-quality content.
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <Link href="#" className="bg-[#f8d6b6] p-2 rounded-xl">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Why;

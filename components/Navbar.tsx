import React from "react";
// import { MdOutlineMenuBook } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa6";

function Navbar() {
  return (
    <nav className="h-[4vh] w-full flex items-center p-8">
      <div className="container flex justify-between items-center">
        <div>
          <h4 className="font-bold text-3xl texty text-[#350203] flex">
            Magneto <FaCertificate className="text-[#350203]" size={20} />
          </h4>
        </div>
        <div className="hidden md:flex">
          <ul className="flex gap-6 items-center text-white">
            <li>Home</li>
            <li>Subjects</li>
            <li>Pricing</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <BiSolidFoodMenu size={30} className="texty" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

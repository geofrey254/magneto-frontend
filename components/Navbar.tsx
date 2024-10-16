"use client";
import React, { useState } from "react";
import { MdOutlineMenuBook } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa6";
import Link from "next/link";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="h-[4vh] w-full flex justify-center items-center py-8 px-4 md:px-12">
      <div className="container flex justify-between items-center">
        <div>
          <h4 className="font-bold text-3xl text-[#350203] flex">
            Magneto <FaCertificate className="text-[#350203]" size={20} />
          </h4>
        </div>
        <div className="hidden md:flex">
          <ul className="flex gap-8 2xl:gap-12 items-center text-[#350203] font-bold">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Subjects</Link>
            </li>
            <li>
              <Link href="#">Pricing</Link>
            </li>
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
          </ul>
        </div>
        {/* mobile menu */}
        <div
          className={
            menuOpen
              ? "collapse fixed w-0 h-[100%] left-4 top-[2000px] transition-all duration-700 ease-in-out md:hidden"
              : "fixed mobile_nav w-[90%] left-4 top-16 h-[100%] z-10 transition-all duration-700 ease-linear rounded-3xl shadow-xl shadow-[#8a6445] md:hidden"
          }
        >
          <ul className="flex flex-col gap-y-16 mt-24 justify-center text-white font-semibold">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Subjects</Link>
            </li>
            <li>
              <Link href="#">Pricing</Link>
            </li>
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="flex">
          <div className="hidden md:flex gap-6 justify-center items-center font-semibold">
            <Link href="#" className="text-[#350203]">
              Log In
            </Link>
            <Link
              href="#"
              className="bg-[#f8d6b6] hover:bg-[#facba0] rounded-2xl px-4 py-2 text-[#350203]"
            >
              Join Now
            </Link>
          </div>
          <div className="mobile-menu md:hidden">
            <BiSolidFoodMenu
              size={30}
              className={
                menuOpen
                  ? "text-[#350203] cursor-pointer transition-all duration-700 ease-in-out"
                  : "hidden transition-all duration-700 ease-in-out"
              }
              onClick={handleNav}
            />
            <MdOutlineMenuBook
              size={30}
              className={
                !menuOpen
                  ? "text-[#350203] cursor-pointer transition-all duration-700 ease-in-out"
                  : "hidden transition-all duration-700 ease-in-out"
              }
              onClick={handleNav}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

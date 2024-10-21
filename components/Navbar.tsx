"use client";
import React, { useState } from "react";
import {
  MdOutlineMenuBook,
  MdOutlinePriceCheck,
  MdNotes,
  MdContactPage,
} from "react-icons/md"; // Importing Material Design icons for use in the navbar
import { BiSolidFoodMenu } from "react-icons/bi"; // Importing another icon for mobile menu
import { FaCertificate } from "react-icons/fa6"; // Importing FontAwesome icon for certificate symbol
import { FaSchool } from "react-icons/fa6"; // Importing FontAwesome icon for school symbol
import { TbBooks } from "react-icons/tb";

import Link from "next/link"; // Importing Next.js Link component for navigation between pages

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(true); // State for controlling the mobile menu's visibility

  // Toggles the menu state between open and closed
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="h-[4vh] w-full flex justify-center items-center py-8 px-4 md:px-12">
      {/* Container for Navbar content */}
      <div className="container flex justify-between items-center">
        {/* Branding Section */}
        <div>
          <Link href="/">
            <h4 className="font-bold text-3xl text-[#350203] flex">
              Magneto <FaCertificate className="text-[#350203]" size={20} />
            </h4>
          </Link>
        </div>

        {/* Desktop Menu: Hidden on mobile (md:hidden) */}
        <div className="hidden md:flex">
          <ul className="flex gap-8 2xl:gap-12 items-center text-[#350203] font-bold">
            {/* Links for various sections of the website */}
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/subjects">Subjects</Link>
            </li>
            <li>
              <Link href="/Lessons">Lessons</Link>
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

        {/* Mobile Menu (hamburger) */}
        <div
          className={
            menuOpen
              ? "collapse fixed w-0 h-[100%] left-4 top-[2000px] transition-all duration-700 ease-in-out md:hidden"
              : "fixed mobile_nav w-[90%] left-4 top-16 h-[100%] z-10 transition-all duration-700 ease-linear rounded-3xl shadow-xl shadow-[#8a6445] md:hidden"
          }
        >
          {/* Buttons for Login and Signup */}
          <div className="flex flex-col gap-6 text-[#f8d6b6]">
            <ul className="flex mt-6 px-4 justify-between">
              <li>
                <Link
                  href="http://localhost:1337/api/connect/google"
                  className="text-[#f8d6b6] border-2 border-[#f8d6b6] px-8 py-2 rounded-2xl"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href="/User"
                  className="bg-[#f8d6b6] hover:bg-[#facba0] rounded-2xl px-4 py-2 text-[#350203]"
                >
                  Join Now
                </Link>
              </li>
            </ul>
            <hr /> {/* Divider */}
          </div>

          {/* Mobile Navigation Links */}
          <ul className="flex flex-col text-lg gap-y-14 mt-8 p-4 text-[#f8d6b6] font-semibold">
            <li className="flex gap-4 justify-start items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <FaSchool size={15} className="text-[#350203]" />
              </div>
              <Link href="/" onClick={handleNav}>
                Home
              </Link>
            </li>
            <li className="flex gap-4 items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <TbBooks size={15} className="text-[#350203]" />
              </div>
              <Link href="/subjects" onClick={handleNav}>
                Subjects
              </Link>
            </li>
            <li className="flex gap-4 items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <TbBooks size={15} className="text-[#350203]" />
              </div>
              <Link href="/Lessons" onClick={handleNav}>
                Lessons
              </Link>
            </li>
            <li className="flex gap-4 items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <MdOutlinePriceCheck size={15} className="text-[#350203]" />
              </div>
              <Link href="#" onClick={handleNav}>
                Pricing
              </Link>
            </li>
            <li className="flex gap-4 items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <MdNotes size={15} className="text-[#350203]" />
              </div>
              <Link href="#" onClick={handleNav}>
                About Us
              </Link>
            </li>
            <li className="flex gap-4 items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <MdContactPage size={15} className="text-[#350203]" />
              </div>
              <Link href="#" onClick={handleNav}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side of the Navbar */}
        <div className="flex">
          {/* Desktop Login/Join buttons */}
          <div className="hidden md:flex gap-6 justify-center items-center font-semibold">
            <Link
              href="http://localhost:1337/api/connect/google"
              className="text-[#350203]"
            >
              Log In
            </Link>
            <Link
              href="/User"
              className="bg-[#f8d6b6] hover:bg-[#facba0] rounded-2xl px-4 py-2 text-[#350203]"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="mobile-menu md:hidden" onClick={handleNav}>
            <BiSolidFoodMenu
              size={30}
              className={
                menuOpen
                  ? "text-[#350203] cursor-pointer transition-all duration-700 ease-in-out"
                  : "hidden transition-all duration-700 ease-in-out"
              }
              // Closes menu when clicked
            />
            <MdOutlineMenuBook
              size={30}
              className={
                !menuOpen
                  ? "text-[#350203] cursor-pointer transition-all duration-700 ease-in-out"
                  : "hidden transition-all duration-700 ease-in-out"
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

"use client";
import React from "react";
import { SlChemistry } from "react-icons/sl";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { FaCertificate } from "react-icons/fa6";

function Categories() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <section className="bg-[#f9eeea] jumbotron w-full p-4 flex justify-center items-center">
      <div className="flex flex-col gap-6 justify-center items-center mt-8">
        <h4 className="flex gap-4">
          <FaCertificate className="cert text-[#350203]" size={20} />
          Large Collection of Subjects
        </h4>
        <h4 className={`font-bold text-center text-4xl`}>Explore Subjects</h4>
        <div className="grid grid-cols-2 gap-x-16 gap-y-8">
          <Link href="#">
            <div className="blurry flex flex-col justify-center items-center gap-4 p-4">
              <Image
                src="/icons/math.png"
                width={60}
                height={60}
                alt="math icon"
              />
              <h3 className="text-xl">Math</h3>
            </div>
          </Link>
          <Link href="#">
            <div className="blurry flex flex-col justify-center items-center gap-4 p-4 hover:shadow-none">
              <Image
                src="/icons/english.png"
                width={60}
                height={60}
                alt="math icon"
              />
              <h3 className="text-xl">English</h3>
            </div>
          </Link>
          <Link href="#">
            <div className="blurry flex flex-col justify-center items-center gap-4 p-4 hover:shadow-none">
              <Image
                src="/icons/english.png"
                width={60}
                height={60}
                alt="math icon"
              />
              <h3 className="text-xl">Kiswahili</h3>
            </div>
          </Link>
          <Link href="#">
            <div className="blurry flex flex-col justify-center items-center gap-4 p-4 hover:shadow-none">
              <Image
                src="/icons/chem.png"
                width={60}
                height={60}
                alt="math icon"
              />
              <h3 className="text-xl">Chemistry</h3>
            </div>
          </Link>
          <Link href="#">
            <div className="blurry flex flex-col justify-center items-center gap-4 p-4 hover:shadow-none">
              <Image
                src="/icons/physics.png"
                width={60}
                height={60}
                alt="math icon"
              />
              <h3 className="text-xl">Physics</h3>
            </div>
          </Link>
          <Link href="#">
            <div className="blurry flex flex-col justify-center items-center gap-4 p-4 hover:shadow-none">
              <Image
                src="/icons/bio.png"
                width={60}
                height={60}
                alt="math icon"
              />
              <h3 className="text-xl">Biology</h3>
            </div>
          </Link>
          <Link href="#">
            <div className="blurry flex flex-col justify-center items-center gap-4 p-4 hover:shadow-none">
              <Image
                src="/icons/hist.png"
                width={60}
                height={60}
                alt="math icon"
              />
              <h3 className="text-xl">History</h3>
            </div>
          </Link>
          <Link href="#">
            <div className="blurry flex flex-col justify-center items-center gap-4 p-4 hover:shadow-none">
              <Image
                src="/icons/geo.png"
                width={60}
                height={60}
                alt="math icon"
              />
              <h3 className="text-xl">Geography</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Categories;

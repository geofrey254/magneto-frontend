import React from "react";
import Image from "next/image";
import Link from "next/link";

import { FaCertificate } from "react-icons/fa6";
async function getSubjects() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/subjects";

  const url = new URL(path, baseUrl);
  const res = await fetch(url, {
    next: {
      revalidate: 86400,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch subjects");

  const data = await res.json();
  console.log(data);
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"
  }${url}`;

  return data;
}

async function Categories() {
  const subject = await getSubjects();
  console.log(subject);

  return (
    <section className="bg-[#f9eeea] jumbotron w-full px-4 py-4 md:py-12 2xl:py-8 flex justify-center items-center">
      <div className="flex flex-col gap-6 justify-center md:items-center mt-8">
        <h4 className="flex gap-4">
          <FaCertificate className="cert text-[#350203]" size={20} />
          Large Collection of Subjects
        </h4>
        <h4 className={`font-bold text-center text-4xl`}>Explore Subjects</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-x-16 gap-y-8">
          {subject.data.map((sub, id) => (
            <Link key={id} href="#">
              <div className="blurry flex flex-col justify-center items-center gap-4 p-4">
                <Image src={sub.url} width={60} height={60} alt="math icon" />
                <h3 className="text-xl">{sub.description}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;

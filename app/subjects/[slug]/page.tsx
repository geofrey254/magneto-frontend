import React, { useState } from "react";
import Link from "next/link";

// Dynamic page component for subject chapters
const SubjectChapters = async ({ params }) => {
  const { slug } = params;

  // Fetch chapters data from Strapi API based on subject slug
  const res = await fetch(
    `http://192.168.100.4:1337/api/subjects?filters[slug][$eq]=${slug}&populate=*` // Ensure fresh data on each request (you can modify this as per your requirements)
  );

  if (!res.ok) {
    throw new Error("Failed to fetch chapters");
  }

  const data = await res.json();
  const chapters = data.data || [];

  return (
    <section className="w-full flex justify-center items-center p-8">
      <div className="container">
        <div>
          <div className="text-center p-8">
            <h1 className="text-xl font-bold">
              Topics for Subject:{" "}
              <span className="text-2xl uppercase">{slug}</span>
            </h1>
          </div>
          <div>
            {chapters.map((chap) => (
              <div
                key={chap.id}
                className="border flex flex-col gap-4 border-[#350203] shadow rounded-md p-4 max-w-sm w-full mx-auto"
              >
                <h2 className="text-lg font-bold text-black">
                  {chap.chapter.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {chap.chapter.description}
                </p>

                <div className="">
                  <Link
                    href={`/Lessons/${chap.chapter.slug}`}
                    className="bg-[#350203] rounded-2xl px-4 py-1 text-xs text-[#f8d6b6] text-center"
                  >
                    Start
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectChapters;

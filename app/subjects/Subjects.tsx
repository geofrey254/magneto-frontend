"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "@/components/Skeleton";

export function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(
          "http://192.168.100.4:1337/api/subjects?populate=*"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const data = await res.json();
        setSubjects(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-12 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {subjects?.map((sub) => (
          <div
            key={sub.id}
            className="border border-[#350203] shadow rounded-md p-4 max-w-sm w-full mx-auto"
          >
            <div className="flex space-x-4">
              <div className="rounded-full bg-[#f8d6b6] p-2 h-10 w-10">
                <Image
                  src={`http://localhost:1337${sub.photo?.formats?.thumbnail.url}`}
                  width={60}
                  height={60}
                  alt={`${sub.name} icon`}
                />
              </div>
              <div className="flex-1 space-y-4 py-1">
                <h2 className="font-bold text-lg">{sub.name}</h2>
                <p className="text-sm text-gray-600">{sub.description}</p>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {sub.classes?.map((cls) => (
                      <span
                        key={cls.id}
                        className="bg-[#35020362] text-[#350203] px-2 py-1 rounded text-xs"
                      >
                        {cls.name}
                      </span>
                    ))}
                  </div>

                  <div className="rounded">
                    <Link
                      href={`/subjects/${sub.slug}`}
                      className="bg-[#350203] rounded-2xl px-4 py-1 text-xs text-[#f8d6b6] text-center"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Subjects;

export async function getServerSideProps() {
  // Fetch data from Strapi
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/subjects";

  const url = new URL(path, baseUrl);
  const res = await fetch(url, {
    next: {
      revalidate: 1,
    },
  });
  const data = await res.json();

  return {
    props: {
      subjects: data,
    },
  };
}

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Skeleton from "@/components/Skeleton";
import Image from "next/image";

// Define interfaces for classes and subjects
// Define interfaces for classes and subjects
interface Class {
  id: number;
  name: string;
}

interface Subject {
  id?: number; // Optional if not always present in data
  title: string;
  description: string;
  slug: string;
  image?: string; // Updated to reflect a direct URL string
  form?: Class[]; // Optional property
}

export function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]); // Use the Subject type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/subjects/`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) {
          console.error("Fetch error:", res.status, await res.text());
          throw new Error("Failed to fetch subjects");
        }

        const data = await res.json();
        setSubjects(data);
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
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className="border border-[#350203] shadow rounded-md p-4 max-w-sm w-full mx-auto"
          >
            <div className="flex space-x-4">
              <div className="rounded-full bg-[#f8d6b6] p-2 h-10 w-10">
                {" "}
                <Image
                  src={sub.image || "path/to/default/image.svg"}
                  alt={sub.title || "Image for " + sub.title}
                  className="rounded-md"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex-1 space-y-4 py-1">
                <h2 className="font-bold text-lg">
                  {sub.title || "Unnamed Subject"}
                </h2>
                <p className="text-sm text-gray-600">
                  {sub.description || "No description available."}
                </p>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {sub.form && sub.form.length > 0 ? (
                      sub.form.map((cls) => (
                        <span
                          key={cls.id}
                          className="bg-[#35020362] text-[#350203] px-2 py-1 rounded text-xs"
                        >
                          {cls.name || "Unnamed Class"}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-600 text-xs">
                        No classes available.
                      </span>
                    )}
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

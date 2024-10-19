"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "@/components/Skeleton";

function Chapters() {
  const [chapters, setChapters] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch(
          "http://192.168.100.4:1337/api/chapters?populate=*"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch chapters");
        }
        const data = await res.json();
        setChapters(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <div>Error: {error}</div>;

  // Filter chapters based on the search term
  const filteredChapters = chapters.filter((chap) => {
    return (
      chap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chap.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chap.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chap.class.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <section className="w-full py-12 flex flex-col gap-6 justify-center items-center">
      <div className="flex px-4 py-3 rounded-md border-2 border-[#350203] overflow-hidden max-w-md mx-auto font-[sans-serif]">
        <input
          type="text"
          placeholder="Search chapters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-600 text-sm"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="16px"
          className="fill-gray-600"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.length > 0 ? (
          filteredChapters.map((chap) => (
            <div
              key={chap.id}
              className="border flex flex-col gap-4 border-[#350203] shadow rounded-md p-4 max-w-sm w-full mx-auto"
            >
              <div className="flex gap-4 text-xs">
                <span className="text-black bg-[#f8d6b6] p-2 rounded-2xl">
                  {chap.class.name}
                </span>
                <span className="text-black bg-[#f8d6b6] p-2 rounded-2xl">
                  {chap.subject.name}
                </span>
              </div>
              <h2 className="text-lg font-bold text-black">{chap.title}</h2>
              <p className="text-gray-600 text-sm">{chap.description}</p>

              <div className="">
                <Link
                  href={`/Lessons/${chap.slug}`}
                  className="bg-[#350203] rounded-2xl px-4 py-1 text-xs text-[#f8d6b6] text-center"
                >
                  Start
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No chapters found</p>
        )}
      </div>
    </section>
  );
}

export default Chapters;

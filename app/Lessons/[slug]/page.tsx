import React from "react";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Link from "next/link";

// Fetch all chapter slugs for static paths generation
export async function generateStaticParams() {
  const res = await fetch("http://localhost:1337/api/chapters?populate=*");
  const data = await res.json();

  return data.data.map((lesson) => ({
    slug: lesson.slug, // Ensure your API returns a slug
  }));
}

// Lesson Page Component
async function LessonPage({ params }: { params: any }) {
  const { slug } = params; // Get slug from URL params

  // Fetch the chapter data for the given slug
  const res = await fetch(
    `http://localhost:1337/api/chapters?filters[slug][$eq]=${slug}&populate=*`
  );
  const data = await res.json();
  const lesson = data.data[0]; // Assuming you fetch one chapter based on the slug

  // Handle case when lesson is not found
  if (!lesson) {
    return <div>Chapter not found</div>;
  }

  return (
    <section className="mx-auto bg-[#350203] w-full flex flex-col justify-center items-center">
      <div className="bg-[#350203] w-full h-[20vh] flex justify-center items-center text-center">
        <h2 className="text-white text-5xl font-bold">{lesson.title}</h2>
      </div>
      <div className="prose prose-img:w-1/2 flex flex-col justify-center prose-zinc mt-8 text-[#ffebd7]">
        <BlocksRenderer content={lesson.content} />
      </div>
    </section>
  );
}

export default LessonPage;

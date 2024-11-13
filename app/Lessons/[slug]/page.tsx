import React from "react";
import Link from "next/link"; // Assuming you're using Next.js for routing

// Fetch all chapter slugs for static paths generation
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapters`, {
    next: { revalidate: 1 },
  });
  const data = await res.json();

  return data.map((lesson) => ({
    slug: lesson.slug, // Ensure your API returns a slug
  }));
}

// Lesson Page Component
async function LessonPage({ params }) {
  const { slug } = params; // Get slug from URL params

  // Fetch the chapter data for the given slug
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content?slug=${slug}`,
    {
      next: { revalidate: 1 },
    }
  );
  const data = await res.json();
  const lesson = data.length > 0 ? data[0] : null;

  // Handle case when lesson is not found
  if (!lesson) {
    return <div>Chapter not found</div>;
  }

  return (
    <section className="mx-auto bg-[#f8d6b6] w-full flex flex-col justify-center items-center p-8 md:p-0 md:py-4">
      {/* Breadcrumb Navigation */}
      <div>
        <nav className="w-full max-w-4xl text-sm mb-4 text-[#350203] rounded-xl p-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/Lessons" className="hover:underline">
            Go back
          </Link>
          <span className="mx-2">/</span>
          <span>{lesson.title}</span>
        </nav>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          {/* Lesson Overview */}
          <div className="w-full max-w-4xl p-4 mb-6">
            <h2 className="text-[#350203] text-5xl font-bold mb-2">
              Lesson Overview
            </h2>
            {lesson.description && (
              <p className="text-[#350203] text-lg">{lesson.description}</p>
            )}
          </div>

          {/* Lesson Content */}
          <div className="text-[#350203] p-4  prose-img:w-1/2 prose-p:text-[#350203] prose-headings:text-[#350203] prose-strong:text-[#350203] prose-zinc">
            <div
              className="prose prose-md "
              dangerouslySetInnerHTML={{ __html: lesson.lesson_content }}
            />
          </div>
        </div>
        <div className="col-span-2"></div>
        <div className="bg-black col-span-2"></div>
      </div>
    </section>
  );
}

export default LessonPage;

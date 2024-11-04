import Link from "next/link";

// Dynamic page component for subject chapters
const SubjectChapters = async ({ params }) => {
  const { slug } = params;

  // Fetch chapters data from Strapi API based on subject slug
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chapters?slug=${slug}` // Ensure fresh data on each request (you can modify this as per your requirements)
  );

  if (!res.ok) {
    throw new Error("Failed to fetch chapters");
  }

  const data = await res.json();
  const chapters = data || [];

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
                className="border flex flex-col gap-4 border-[#350203] shadow rounded-md p-8 max-w-sm w-full mx-auto"
              >
                <h2 className="text-xl font-bold text-black">
                  {chap.chapter.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {chap.chapter.description}
                </p>

                <div className="flex justify-center items-center">
                  <Link
                    href={`/Lessons/${chap.chapter.slug}`}
                    className="bg-[#350203] hover:bg-[#f8d6b6] w-[30vh] h-[4vh] flex items-center justify-center rounded-2xl px-4 py-1 text-lg text-[#f8d6b6] hover:text-[#350203] text-center"
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

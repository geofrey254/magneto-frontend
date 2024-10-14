import Hero from "@/components/Hero";
import Jumbotron from "@/components/Jumbotron";
import Categories from "@/components/Categories";

export default function Home() {
  return (
    <main className="flex flex-col row-start-2 items-center sm:items-start">
      <Hero />
      <Jumbotron />
      <Categories />
    </main>
  );
}

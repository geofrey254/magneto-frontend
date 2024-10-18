import Hero from "@/components/Hero";
import Jumbotron from "@/components/Jumbotron";
import Categories from "@/components/Categories";
import Why from "@/components/Why";
import Download from "@/components/Download";
import Pricing from "@/components/Pricing";
import Accordion from "@/components/Accordion";

export default function Home() {
  return (
    <main className="flex flex-col row-start-2 items-center sm:items-start">
      <Hero />
      <Jumbotron />
      <Categories />
      <Why />
      <Pricing />
      <Accordion />
      <Download />
    </main>
  );
}

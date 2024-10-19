import Hero from "@/components/Hero";
import Jumbotron from "@/components/Jumbotron";
import Categories from "@/components/Categories";
import Why from "@/components/Why";
import Download from "@/components/Download";
import Pricing from "@/components/Pricing";
import Accordion from "@/components/Accordion";
import Lessons from "@/components/Lessons";

export default function Home() {
  return (
    <main className="flex flex-col row-start-2 items-center sm:items-start">
      <Hero />
      <Jumbotron />
      <Categories />
      <Lessons />
      <Why />
      <Pricing />
      <Download />
      <Accordion />
    </main>
  );
}

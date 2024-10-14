"use client";
import React from "react";
import { SlChemistry } from "react-icons/sl";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
function Categories() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <section className="jumbotron w-full p-4 flex justify-center items-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-sm"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div className="p-1">
                <Card className="bg-transparent border-white text-white">
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                    <SlChemistry size={40} />
                    <h4>Chemistry</h4>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white border-white" />
        <CarouselNext className="bg-white border-white" />
      </Carousel>
    </section>
  );
}

export default Categories;

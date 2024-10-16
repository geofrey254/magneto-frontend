import React from "react";
import Image from "next/image";

function Download() {
  return (
    <section className="w-full download p-8 flex justify-center items-center">
      <div className="container">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg">Ready to start ?</h3>
          <h4 className="text-2xl">
            Take Learning with You – Download the Magneto App
          </h4>
        </div>
        <div className="mt-5">
          <Image
            src="/img/play.png"
            width={300}
            height={150}
            alt="google play"
          />
        </div>
      </div>
    </section>
  );
}

export default Download;

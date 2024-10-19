import React from "react";
import Chapters from "../Data/Chapters";
function page() {
  return (
    <section className="w-full flex justify-center items-center">
      <div className="container">
        <Chapters />
      </div>
    </section>
  );
}

export default page;

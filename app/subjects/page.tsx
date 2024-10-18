import React from "react";
import Subjects from "./Subjects";

function page() {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div>
        <h3>Choose Your Subject</h3>
        <p>
          Discover a variety of subjects designed to enhance your knowledge and
          skills. Whether you're exploring Math, Science, or Literature, each
          subject is structured to guide you step by step. Select a subject to
          begin your learning journey!
        </p>
      </div>
      <Subjects />
    </section>
  );
}

export default page;

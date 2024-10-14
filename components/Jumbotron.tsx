import React from "react";

function Jumbotron() {
  return (
    <section className="jumbotron w-full px-4 py-8 bg-[#350203] flex justify-center items-center">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#f8d6b6]">
              <h4 className="text-2xl">1</h4>
              <h4 className="text-md ">Sign Up for Free</h4>
            </div>
            <p className="text-white/65 text-sm leading-7">
              Create an account to get started. It{"'"}s quick, easy, and free
              to sign up.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#f8d6b6]">
              <h4 className="text-2xl">2</h4>
              <h4 className="text-md">Pay a Small Daily Fee</h4>
            </div>
            <p className="text-white/65 text-sm leading-7">
              To access our premium learning content, pay a small daily fee of
              Kes 40 using your preferred payment method.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#f8d6b6]">
              <h4 className="text-2xl">3</h4>
              <h4 className="text-md">Access High-Quality Content</h4>
            </div>
            <p className="text-white/65 text-sm leading-7">
              Browse through a wide range of subjects and materials including
              video lessons, notes, and quizzes {"-"} all designed to help you
              excel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Jumbotron;

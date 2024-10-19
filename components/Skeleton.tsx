import React from "react";

function Skeleton() {
  return (
    <section className="w-full p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="border border-[#350203] shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-[#f8d6b6]  h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-[#f8d6b6]  rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-[#f8d6b6] rounded col-span-2"></div>
                  <div className="h-2 bg-[#f8d6b6] rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-[#f8d6b6]  rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-[#350203] shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-[#f8d6b6]  h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-[#f8d6b6]  rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-[#f8d6b6] rounded col-span-2"></div>
                  <div className="h-2 bg-[#f8d6b6] rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-[#f8d6b6]  rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-[#350203] shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-[#f8d6b6]  h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-[#f8d6b6]  rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-[#f8d6b6] rounded col-span-2"></div>
                  <div className="h-2 bg-[#f8d6b6] rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-[#f8d6b6]  rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-[#350203] shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-[#f8d6b6]  h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-[#f8d6b6]  rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-[#f8d6b6] rounded col-span-2"></div>
                  <div className="h-2 bg-[#f8d6b6] rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-[#f8d6b6]  rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skeleton;

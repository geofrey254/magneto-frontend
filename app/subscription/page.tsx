import React from "react";
import Payment from "./components/payment";
import SubscriptionForm from "./components/SubscriptionForm";
function page() {
  return (
    <div className="w-full flex flex-col row-start-2 justify-center items-center p-8">
      <SubscriptionForm />
    </div>
  );
}

export default page;

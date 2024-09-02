import ShowNestedRoute from "@/components/ShowNestedRoute";
import OrderPresent from "@/layout/OrderPresent";
import React from "react";

export default function Present() {
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/order", name: "سبد خرید" },
          { path: "/order/present", name: "حضوری" },
        ]}
      />
      <OrderPresent />
    </main>
  );
}



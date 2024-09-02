import ShowNestedRoute from "@/components/ShowNestedRoute";
import FactorPresent from "@/layout/FactorPresent";
import React from "react";

export default function PresentFactor() {
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/order", name: "سبد خرید" },
          { path: "/order/present", name: "حضوری" },
          { path: "/order/present/factor", name: "فاکتور" },
        ]}
      />
      <FactorPresent />
    </main>
  );
}

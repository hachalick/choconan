import ShowNestedRoute from "@/components/ShowNestedRoute";
import React from "react";

export default function Products() {
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/products", name: "محصولات" },
        ]}
      />
    </main>
  );
}

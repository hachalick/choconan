import ShowNestedRoute from "@/components/ShowNestedRoute";
import React from "react";

function Services() {
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/services", name: "خدمات" },
        ]}
      />
    </main>
  );
}

export default Services;

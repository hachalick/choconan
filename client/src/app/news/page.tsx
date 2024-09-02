import ShowNestedRoute from "@/components/ShowNestedRoute";
import React from "react";

export default function News() {
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/news", name: "اخبار" },
        ]}
      />
    </main>
  );
}

import ShowNestedRoute from "@/components/ShowNestedRoute";
import React from "react";

export default function Question() {
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/questions", name: "پرسش و پاسخ" },
        ]}
      />
    </main>
  );
}

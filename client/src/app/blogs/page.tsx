import ShowNestedRoute from "@/components/ShowNestedRoute";
import React from "react";

function Blog() {
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/blogs", name: "مقالات" },
        ]}
      />
      <div className="bg-slate-400"></div>
    </main>
  );
}

export default Blog;

import ShowNestedRoute from "@/components/ShowNestedRoute";
import { redirect, RedirectType } from "next/navigation";
import React from "react";

function Category({ params }: { params: { category: string } }) {
  redirect(`/menu/#${params.category}`, RedirectType.replace);
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/blogs", name: "بلاگ" },
        ]}
      />
    </main>
  );
}

export default Category;

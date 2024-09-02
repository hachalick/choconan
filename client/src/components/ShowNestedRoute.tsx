import Link from "next/link";
import React from "react";

function ShowNestedRoute({ list_route }: { list_route: NestedRoute }) {
  if (list_route.length === 1)
    return (
      <div className="mb-4 text-[#3a2e3c] flex items-center gap-2 flex-wrap border-b border-[#3a2e3c]">
        <span>
          <span className="ml-1">{">"}</span>
          <Link href={list_route[0].path} className="font-bold text-sm mr-1">
            {list_route[0].name}
          </Link>
        </span>
      </div>
    );
  if (list_route.length > 1)
    return (
      <div className="mb-4 text-[#3a2e3c] flex items-center flex-wrap gap-2 border-b border-[#3a2e3c]">
        {list_route.map((route, i) => (
          <span key={i}>
            <span className="ml-1">{">"}</span>
            <Link href={route.path} className="font-bold text-sm  mr-1">
              {route.name}
            </Link>
          </span>
        ))}
      </div>
    );
}

export default ShowNestedRoute;

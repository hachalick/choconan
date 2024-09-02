import React from "react";
import ShowNestedRoute from "@/components/ShowNestedRoute";
import { ERoute } from "@/enum/routs";
import Image from "next/image";
import Link from "next/link";
import SearchBoxMenu from "@/components/SearchBoxMenu";
import { fetchSearch } from "@/utils/FetchData";

async function Search({ searchParams }: { searchParams: { query: string } }) {
  let result: TIdProductsSearchMenu = [];
  if (Object.keys(searchParams).length) {
    result = await fetchSearch({ query: searchParams.query.trim() });
  }
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/search", name: "جستجو" },
        ]}
      />
      <SearchBoxMenu />
      <div>
        {result.map((card, i) => (
          <div
            className="bg-zinc-300/90 rounded-md md:flex shadow-neo-sm mt-3"
            key={i}
          >
            <div className="shrink-0 flex items-center justify-center p-4">
              <Image
                src={ERoute.HOST + card.src}
                width={100}
                height={100}
                alt={card.name}
                className="md:w-32 md:h-32 w-44 h-44 object-contain rounded-md"
              />
            </div>
            <div className="pt-2 pb-10 mx-2 text-[#3a2e3c] relative my-1 md:w-full ">
              <h2 className="font-bold border-b mb-2 pb-1 border-[#3a2e3c]">
                {card.name}
              </h2>
              <p className="text-justify w-full text-ellipsis indent-3">
                {card.description}
              </p>
              <Link
                href={`/menu/${card.category}/${card.id}`}
                className="border border-[#3a2e3c] px-3 py-1 absolute left-0 md:bottom-1 bottom-2 rounded-md font-bold text-sm"
              >
                برو به محصول
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Search;

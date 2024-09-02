"use client";
import { fetchAllProductMenu } from "@/utils/FetchData";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";



function SearchBar() {
  const router = useRouter();

  const [isShow, setShow] = useState(false);
  const [data, setData] = useState<TIdCategoriesMenu>([]);

  useEffect(() => {
    const fetches = async () => {
      const fetchData = await fetchAllProductMenu();
      setData(fetchData);
      setShow(true);
    };
    fetches();
  }, []);

  function redirectToRoute(val: string) {
    const [category, id, name] = val?.split("##") ?? ["", "", ""];
    router.push(`/menu/${encodeURI(category)}/${id}/${encodeURI(name)}`);
  }

  if (isShow)
    return (
      <form className="flex items-center justify-center py-2 text-black">
        <div className="bg-white border-2 border-slate-300 flex px-2 py-1 rounded-lg items-center">
          <div>
            <FaSearch />
          </div>
          <select
            title="s"
            name="product"
            id="product"
            className="p-1 px-2 text-sm focus:outline-none bg-white"
            onChange={(e) => redirectToRoute(e.target.value)}
          >
            {data.map((category, i) => {
              return (
                <optgroup key={i} label={category.category} className="pt-12">
                  {category.products.map((product, i) => {
                    return (
                      <option
                        key={i}
                        value={`${category.category}##${product.id}##${product.name}`}
                      >
                        {product.name}
                      </option>
                    );
                  })}
                </optgroup>
              );
            })}
          </select>
        </div>
      </form>
    );
}

export default SearchBar;

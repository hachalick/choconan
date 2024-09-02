import HorizontalScroll from "@/components/HorizontalScroll";
import ShowNestedRoute from "@/components/ShowNestedRoute";
import { fetchAllProductMenu } from "@/utils/FetchData";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { CiShoppingBasket } from "react-icons/ci";

async function Menu() {
  const allProduct = await fetchAllProductMenu();
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/menu", name: "منو" },
        ]}
      />
      <Link
        href="/order"
        className="py-[2px] px-3 rounded-md text-sm font-bold w-fit border border-[#3a2e3c] text-[#4e3751] flex items-center justify-center shadow-neo-sm sticky mr-auto top-12 z-20 bg-zinc-300"
      >
        <CiShoppingBasket size={25} className="ml-1" />
        مشاهده سبد خرید
      </Link>
      {allProduct.map((product, i) => (
        <HorizontalScroll
          key={i}
          title={product.category}
          products={product.products}
          icon={product.icon}
          category={product.category}
        />
      ))}
    </main>
  );
}

export default Menu;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { category: string; id: string };
  searchParams: { id?: string };
}): Promise<Metadata> {
  const allProduct = await fetchAllProductMenu();
  let text = "";
  allProduct.forEach((pro) => {
    pro.products.forEach((product) => {
      text += product.name + "-";
    });
  });
  const metaData: Metadata = {
    title: "choconan | منو کافه شوکونان",
    description: `محصولات کافه شوکونان ${text}`,
  };
  return metaData;
}

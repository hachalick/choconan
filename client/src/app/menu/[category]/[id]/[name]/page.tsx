import { ERoute } from "@/enum/routs";
import { Metadata } from "next";
import Image from "next/image";
import { LuTimer } from "react-icons/lu";
import React from "react";
import HorizontalScroll from "@/components/HorizontalScroll";
import { suggestionsMenu } from "@/constants/suggestion";
import ShowNestedRoute from "@/components/ShowNestedRoute";
import AddDeleteProductMenu from "@/components/AddDeleteProductMenu";
import { fetchCategoryMenu, fetchProductMenu } from "@/utils/FetchData";
import Link from "next/link";
import { CiShoppingBasket } from "react-icons/ci";
import { IoAlertCircleOutline } from "react-icons/io5";
import { redirect, RedirectType } from "next/navigation";

async function Product({
  params,
}: {
  params: { category: string; id: string; name: string };
}) {
  let response: TIdProductMenu = {
    available: false,
    description: "",
    id: 0,
    meta_description: "",
    meta_title: "",
    name: "",
    price: 0,
    product_id: "",
    src: "",
    waiting: 0,
  };
  try {
    const res = await fetchProductMenu({
      category: decodeURI(params.category),
      id: params.id,
    });
    if (res.name !== decodeURI(params.name)) {
      redirect(`/menu/${params.category}/${params.id}`, RedirectType.replace);
    }
    response = res;
  } catch (error) {
    redirect(`/menu`, RedirectType.replace);
  }
  const name_category = decodeURI(params.category);
  const find_suggestion = suggestionsMenu.find(
    (suggestion) => suggestion.category === name_category
  );
  let list_all_suggestions = [];
  if (find_suggestion) {
    for (let i in find_suggestion.suggest) {
      const category_suggest = find_suggestion.suggest[i];
      const resCategory = await fetchCategoryMenu({
        category: category_suggest,
      });
      list_all_suggestions.push({
        title: resCategory.category,
        product: resCategory.products,
      });
    }
  }
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/menu", name: "منو" },
          {
            path: `/menu/${decodeURI(params.category)}`,
            name: `${decodeURI(params.category)}`,
          },
          {
            path: `/menu/${decodeURI(params.category)}/${params.id}`,
            name: `${response.name}`,
          },
        ]}
      />
      <Link
        href="/order"
        className="py-[2px] px-3 rounded-md text-sm font-bold w-fit border border-[#3a2e3c] text-[#4e3751] flex items-center justify-center shadow-neo-sm sticky mr-auto top-12 z-20 bg-zinc-300"
      >
        <CiShoppingBasket size={25} className="ml-1" />
        مشاهده سبد خرید
      </Link>
      <div
        className={`max-w-[620px] relative my-3 shadow-neo rounded-3xl bg-gradient-to-br from-[#948796] to-[#4e3751] mx-auto mb-5 ${
          response.available ? "grayscale-0" : "grayscale"
        }`}
      >
        <div className="flex flex-col justify-center items-center pt-6">
          <Image
            src={ERoute.HOST + (response.src || `/default-product.jpg`)}
            alt={response.name || "image product"}
            className="w-[90%] rounded-2xl animate-show-gray-to-color"
            width={500}
            height={500}
          />
          <div
            className="mt-4 py-1 px-2 rounded-lg text-center flex items-center"
            dir="ltr"
          >
            {response.waiting} <LuTimer className="mx-1" /> | {response.price} T
          </div>
        </div>
        <div className="mt-3 rounded-b-3xl pb-3">
          <h1 className="font-bold text-center text-xl mb-4">
            {response.name}
          </h1>
          <p className="mx-6 text-justify whitespace-pre">{response.description}</p>
          {response.available ? (
            <AddDeleteProductMenu
              category={decodeURI(params.category)}
              id_product_menu={parseInt(params.id)}
            />
          ) : (
            <span className="my-3 text-center mr-5 flex gap-2">
              <IoAlertCircleOutline size={25} />
              ناموجود
              <IoAlertCircleOutline size={25} />
            </span>
          )}
        </div>
      </div>
      {list_all_suggestions.map((data, i) => (
        <HorizontalScroll
          key={i}
          icon={"/delicious.png"}
          title={`کنارش چی میچسبه ؟! --> (${data.title})`}
          products={data.product}
          category={data.title}
        />
      ))}
    </main>
  );
}

export default Product;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { category: string; id: string };
  searchParams: { id?: string };
}): Promise<Metadata> {
  const metaData: Metadata = {
    title: "کافه شوکونان | choconan",
    description: "",
  };
  try {
    const res = await fetchProductMenu({
      category: decodeURI(params.category),
      id: params.id,
    });
    metaData.title = res.meta_title || "" + " کافه شوکونان | choconan";
    metaData.description =
      res.meta_description || "" + " کافه شوکونان | choconan";
  } catch (err) {}
  return metaData;
}

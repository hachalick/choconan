import React from "react";
import CardHorizontalScroll from "./CardHorizontalScroll";
import Image from "next/image";
import { ERoute } from "@/enum/routs";

function HorizontalScroll({
  title,
  category,
  products,
  icon,
}: {
  title: string;
  category: string;
  icon: string;
  products: TIdProductsMenu;
}) {
  return (
    <div className="relative mt-3">
      <div className=" flex items-center mb-2 scroll-mt-[50px]" id={title}>
        <Image
          src={ERoute.HOST + icon}
          alt={title}
          width={40}
          height={40}
          className="w-9 h-9 ml-2"
          loading="lazy"
        />
        <h2 className="font-bold text-lg text-[#3a2e3c]">{title}</h2>
      </div>
      <div className="flex snap-x snap-mandatory scroll-smooth w-full overflow-x-auto gap-5 2sm:gap-10 py-7">
        <BlankCard />
        <div className="bg-radial-gradient-right w-10 h-[91%] absolute right-0 bottom-1"></div>
        <div className="bg-radial-gradient-left w-10 h-[91%] absolute left-0 bottom-1"></div>
        {products.map((data, i) => (
          <CardHorizontalScroll
            key={data.id}
            data={data}
            category={category}
            isLink={data.available}
          />
        ))}
        <BlankCard />
      </div>
    </div>
  );
}

function BlankCard() {
  return <div className="shrink-0 w-[42%] md:w-0"></div>;
}

export default HorizontalScroll;

import { allCategory } from "@/constants/category";
import { ERoute } from "@/enum/routs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Category() {
  return (
    <div className="mt-5">
      <h2 className="font-extrabold text-xl text-[#3a2e3c]">
        چیا داریم ؟!
      </h2>
      <ul className="text-white gap-6 flex flex-wrap py-4 justify-center">
        {allCategory.map((category, i) => (
          <li key={i} className="bg-white basis-32 rounded-2xl p-4 bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo md:grow-0 grow">
            <Link
              className="flex flex-col justify-center items-center"
              href={`/menu/${category.category}`}
              title={category.category}
            >
              <Image
                src={ERoute.HOST + category.icon}
                width={60}
                height={60}
                alt={category.category}
                priority
              />
              <h3 dir="ltr" className="mt-2">
                {category.category}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;

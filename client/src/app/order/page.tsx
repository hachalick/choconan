import ShowNestedRoute from "@/components/ShowNestedRoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Order() {
  return (
    <main className="px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/order", name: "سبد خرید" },
        ]}
      />
      <h1 className="font-bold text-lg text-[#3a2e3c]">محل سفارش دهی</h1>
      <div className="text-white gap-7 flex flex-wrap py-4 justify-center">
        <Link
          className="bg-slate-100 basis-48 grow md:aspect-0 p-4 rounded-2xl bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo flex flex-col justify-center items-center"
          href="/order/present"
          title="برای دیدن سفارش ارسال پیک خود از کافه"
        >
          <Image
            src="/present.png"
            width={110}
            height={110}
            alt="telegram choconan"
          />
          <h3 dir="ltr" className="mt-2">
            حضوری
          </h3>
        </Link>
        <Link
          className="bg-slate-100 basis-48 grow md:aspect-0 p-4 rounded-2xl bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo flex flex-col justify-center items-center"
          href="/order/transfer"
          title="برای دیدن سفارش حضوری خود در کافه"
        >
          <Image
            src="/take-away.png"
            width={110}
            height={110}
            alt="telegram choconan"
          />
          <h3 dir="ltr" className="mt-2">
            ارسال پیک
          </h3>
        </Link>
      </div>
    </main>
  );
}

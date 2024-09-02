import ShowNestedRoute from "@/components/ShowNestedRoute";
import Image from "next/image";
import React from "react";

export default function ContactUs() {
  return (
    <main className="text-[#3a2e3c] px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/contact-us", name: "ارتباط با ما" },
        ]}
      />
      <h1 className="font-bold text-lg">
        راه های ارتباطی و شبکه های اجتماعی کافه شوکونان
      </h1>
      <div className="text-white gap-7 flex flex-wrap py-4 justify-center">
        <a
          className="bg-slate-100 basis-48 grow md:aspect-0 p-4 rounded-2xl bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo flex flex-col justify-center items-center"
          href="https://t.me/choconanchannel"
          title="link channel choconannel"
        >
          <Image
            src="/telegram.png"
            width={60}
            height={60}
            alt="telegram choconan"
          />
          <h3 dir="ltr" className="mt-2">
            @choconanchannel
          </h3>
        </a>
        <a
          className="bg-slate-100 basis-48 grow md:aspect-0 p-4 rounded-2xl bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo flex flex-col justify-center items-center"
          href="https://instagram.com/choconan.ir"
          title="link instagram choconan"
        >
          <Image
            src="/instagram.png"
            width={60}
            height={60}
            alt="instagram choconan"
          />
          <h3 dir="ltr" className="mt-2">
            @choconan.ir
          </h3>
        </a>
        <a
          className="bg-slate-100 basis-48 grow md:aspect-0 p-4 rounded-2xl bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo flex flex-col justify-center items-center"
          href="https://wa.me/+989127017624"
          title="link whatsapp choconan"
        >
          <Image
            src="/whatsapp.png"
            width={60}
            height={60}
            alt="instagram choconan"
          />
          <h3 dir="ltr" className="mt-2">
            +98 - 9127017624
          </h3>
        </a>
        <a
          className="bg-slate-100 basis-48 grow md:aspect-0 p-4 rounded-2xl bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo flex flex-col justify-center items-center"
          href="mailto:choconan.ir@gmail.com"
          title="link whatsapp choconan"
        >
          <Image
            src="/gmail.png"
            width={60}
            height={60}
            alt="instagram choconan"
          />
          <h3 dir="ltr" className="mt-2">
            choconan.ir
          </h3>
        </a>
        <a
          className="bg-slate-100 basis-48 grow md:aspect-0 p-4 rounded-2xl bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo flex flex-col justify-center items-center"
          href="https://maps.app.goo.gl/1m3wv9uVnohukrrL7"
          title="link whatsapp choconan"
        >
          <Image
            src="/map.png"
            width={60}
            height={60}
            alt="instagram choconan"
          />
          <h3 dir="ltr" className="mt-2">
            location
          </h3>
        </a>
        <a
          className="bg-slate-100 basis-48 grow md:aspect-0 p-4 rounded-2xl bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo flex flex-col justify-center items-center"
          href="tel:02186072428"
          title="link whatsapp choconan"
        >
          <Image
            src="/telephone.png"
            width={60}
            height={60}
            alt="instagram choconan"
          />
          <h3 dir="ltr" className="mt-2">
            021 - 8607 2428
          </h3>
        </a>
        <a
          className="bg-slate-100 basis-48 grow md:aspect-0 p-4 rounded-2xl bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo flex flex-col justify-center items-center"
          href="tel:+989127017624"
          title="link whatsapp choconan"
        >
          <Image src="/phone.png" width={60} height={60} alt="phone choconan" />
          <h3 dir="ltr" className="mt-2">
            +98 - 9127017624
          </h3>
        </a>
      </div>
    </main>
  );
}

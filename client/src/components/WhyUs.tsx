import Image from "next/image";
import React from "react";

export default function WhyUs() {
  return (
    <div className="mt-5">
      <h3 className="font-bold text-[#3a2e3c] text-center">
        چرا کافه شوکونان ؟!
      </h3>
      <h2 className="font-bold text-xl text-[#3a2e3c] text-center">
        در یک محیط سالم و امن از محصولات تازه با دستور پخت مخصوص ما بهره مند می
        شوید
      </h2>
      <div className="flex flex-wrap my-2 gap-5 mt-5 justify-center">
        <div className="basis-80 rounded-2xl p-4 bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo aspect-[4/3]">
          <div className="flex">
            <Image
              alt="logo"
              src="/whyus1.jpg"
              width={200}
              height={200}
              className="w-full aspect-[4/3] object-cover rounded-md"
            />
          </div>
          <div>
            <h3 className="text-center font-bold text-xl mt-2">فضای مناسب</h3>
            <p className="mt-1"></p>
          </div>
        </div>
        <div className="basis-80 rounded-2xl p-4 bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo aspect-[4/3]">
          <div className="flex">
            <Image
              alt="logo"
              src="/whyus2.jpg"
              width={200}
              height={200}
              className="w-full aspect-[4/3] object-cover rounded-md"
            />
          </div>
          <div>
            <h3 className="text-center font-bold text-xl mt-2">انتقاد پذیر</h3>
            <p className="mt-1"></p>
          </div>
        </div>
        <div className="basis-80 rounded-2xl p-4 bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo aspect-[4/3]">
          <div className="flex">
            <Image
              alt="logo"
              src="/whyus3.jpg"
              width={200}
              height={200}
              className="w-full aspect-[4/3] object-cover rounded-md"
            />
          </div>
          <div>
            <h3 className="text-center font-bold text-xl mt-2">
              محصولات خوش مزه
            </h3>
            <p className="mt-1"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

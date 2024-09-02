import Image from "next/image";
import React from "react";

function PreviewSearchConsole({
  meta_title,
  meta_description,
}: {
  meta_title: string;
  meta_description: string;
}) {
  return (
    <div className="bg-white px-2 py-2">
      <div className="flex items-center">
        <div className="ml-[12px]">
          <Image
            src="/favicon.ico"
            alt="ico"
            width={28}
            height={28}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[16px] text-[#202124]">choconan.ir</span>
          <span className="text-[12px] text-[#202124]">https://choconan.ir</span>
        </div>
      </div>
      <div>
        <h3 className="text-[22px] text-[#1A0DAB]">{meta_title} کافه شوکونان | choconan</h3>
      </div>
      <div>
        <span className="text-[14px] text-[#202124]">{meta_description}</span>
      </div>
    </div>
  );
}

export default PreviewSearchConsole;

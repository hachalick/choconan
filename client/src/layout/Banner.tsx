import Image from "next/image";
import React from "react";

function Banner() {
  return (
    <div className="bg-black w-full h-40 relative">
      <Image
        src={"/banner.jpg"}
        alt="banner"
        width={6720}
        height={4480}
        className="object-cover h-40"
        loading="lazy"
      />
      <h1 className="absolute bottom-3 right-3 font-extrabold md:text-3xl text-xl">کافه شوکونان</h1>
    </div>
  );
}

export default Banner;

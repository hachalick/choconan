"use client"
import { ERoute } from "@/enum/routs";
import Image from "next/image";
import React, { useState } from "react";

function ImageClient({ alt, src }: { alt: string; src: string }) {
  const [imgError, setImgError] = useState(false);
  const default_img = "/s-logo.jpg";
  return (
    <>
      {imgError ? (
        <div className="h-full flex justify-center items-center">
          <Image
            className="rounded-t-xl w-36 h-36 opacity-20 object-contain"
            src={ERoute.HOST + default_img}
            alt={alt}
            width={500}
            height={500}
            loading="lazy"
          />
        </div>
      ) : (
        <Image
          className="rounded-t-xl w-full h-full object-contain"
          src={ERoute.HOST + src}
          alt={alt}
          width={500}
          height={500}
          onError={() => setImgError(true)}
        />
      )}
    </>
  );
}

export default ImageClient;

import Image from "next/image";
import Link from "next/link";
import React from "react";
import SliderMenu from "./SliderMenu";
import BtnBackHistory from "./BtnBackHistory";
import BtnForwardHistory from "./BtnForwardkHistory";
import BtnUpToPage from "./BtnUpToPage";

function Navbar() {
  return (
    <div className="flex bg-zinc-200 items-center p-1 h-10 relative">
      <Link href="/" className="mr-2 absolute left-[calc(50%-40px)]">
        <Image
          src="/h-logo.svg"
          alt="choconan Logo"
          width={40}
          height={40}
          priority
          className="w-24"
        ></Image>
      </Link>
      <SliderMenu />
      <BtnForwardHistory />
      <BtnUpToPage />
      <BtnBackHistory />
    </div>
  );
}

export default Navbar;

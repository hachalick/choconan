"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsNewspaper } from "react-icons/bs";
import { FaQuora, FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { GrWorkshop } from "react-icons/gr";
import { IoCafeOutline, IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { PiPhoneDisconnectBold } from "react-icons/pi";
import { RiMenu4Fill } from "react-icons/ri";
import { TbLogs } from "react-icons/tb";

function SliderMenu() {
  const [isShow, setShow] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (isShow)
    return (
      <div className="flex items-center">
        <button
          type="button"
          title="button show navbar"
          onClick={() => setOpen((val) => !val)}
          className="z-10"
        >
          <RiMenu4Fill size={30} />
        </button>
        <div
          className={`w-screen h-dvh backdrop-blur-lg absolute ${
            isOpen ? "right-0" : "-right-[100vw]"
          } top-0`}
          onClick={() => setOpen((val) => !val)}
        ></div>
        <nav
          className={`text-zinc-100 bg-gradient-to-br from-[#948796] to-[#4e3751] transition-all absolute overflow-y-auto overflow-x-hidden ${
            isOpen ? "right-0" : "-right-48"
          } top-0 h-dvh w-48 pt-10`}
        >
          <Image
            src="/s-logo.svg"
            alt="choconan Logo"
            width={38}
            height={40}
            priority
            className="absolute top-4 left-3 "
          ></Image>
          <ul className="flex gap-2 flex-col">
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/" className="flex">
                <GoHome size={25} className="w-8 ml-1" /> خانه
              </Link>
            </li>
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/menu" className="flex">
                <MdOutlineRestaurantMenu size={25} className="w-8 ml-1" /> منو
              </Link>
            </li>
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/products" className="flex">
                <IoCafeOutline size={25} className="w-8 ml-1" /> محصولات
              </Link>
            </li>
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/order" className="flex">
                <FiShoppingBag size={22} className="w-8 ml-1" /> سبد خرید
              </Link>
            </li>
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/faqs" className="flex">
                <FaQuora size={25} className="w-8 ml-1" /> سوال متداول
              </Link>
            </li>
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/blogs" className="flex">
                <TbLogs size={25} className="w-8 ml-1" /> مقالات
              </Link>
            </li>
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/news" className="flex">
                <BsNewspaper size={25} className="w-8 ml-1" /> اخبار
              </Link>
            </li>
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/services" className="flex">
                <GrWorkshop size={25} className="w-8 ml-1" /> خدمات
              </Link>
            </li>
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/about-us" className="flex">
                <IoInformationCircleOutline size={25} className="w-8 ml-1" />{" "}
                درباره ما
              </Link>
            </li>
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/contact-us" className="flex">
                <PiPhoneDisconnectBold size={25} className="w-8 ml-1" /> ارتباط
                با ما
              </Link>
            </li>
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/questions" className="flex">
                <FaQuora size={25} className="w-8 ml-1" /> پرسش و پاسخ
              </Link>
            </li>
            <li onClick={() => setOpen((val) => !val)}>
              <Link href="/search" className="flex">
                <FaSearch size={22} className="w-8 ml-1" /> جستجو
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
}

export default SliderMenu;

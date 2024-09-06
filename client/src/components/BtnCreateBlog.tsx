"use client";
import { fetchCreateBlogPanel } from "@/utils/FetchData";
import { useRouter } from "next/navigation";
import React from "react";
import { LuFilePlus2 } from "react-icons/lu";

export default function BtnCreateBlog() {
  const router = useRouter();

  const onClickCreateBlog = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const { create, id } = await fetchCreateBlogPanel({ access_token });
    if (create) router.push(`/account/blog/${id}`);
  };

  return (
    <div>
      <button
        className="mr-auto mb-3 text-white w-40 bg-gradient-to-br from-[#948796] to-[#4e3751] rounded-lg shadow-neo-sm px-3 py-1 flex items-center justify-center"
        onClick={() => onClickCreateBlog()}
      >
        <LuFilePlus2 />
        <span className="mx-auto">بلاگ جدید</span>
      </button>
    </div>
  );
}

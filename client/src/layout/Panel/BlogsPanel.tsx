import BtnCreateBlog from "@/components/BtnCreateBlog";
import { fetchBlogsPanel } from "@/utils/FetchData";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function BlogsPanel() {
  const [blogs, setBlogs] = useState<TGetIdBlogs>([]);

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await fetchBlogsPanel();
      setBlogs(blogs);
    };
    fetchData();
  }, []);

  return (
    <div>
      <BtnCreateBlog />
      <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full">
        <caption className="caption-bottom">
          Table 3.1: Professional wrestlers and their signature moves.
        </caption>
        <thead className="">
          <tr>
            <th className="bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo-sm rounded-lg px-3 py-2">
              تیتر
            </th>
            <th className="bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo-sm rounded-lg px-3 py-2">
              وضعیت انتشار
            </th>
            <th className="bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo-sm rounded-lg px-3 py-2">
              ویرایش
            </th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.blog_id}>
              <td className="border border-[#4e3751] rounded-lg px-3 py-1 text-center">
                {blog.title || "ندارد"}
              </td>
              <td className="border border-[#4e3751] rounded-lg px-3 py-1 text-center">
                {blog.publish ? "شده" : "نشده"}
              </td>
              <td className="border border-[#4e3751] rounded-lg px-3 py-1 text-center text-sky-200">
                <Link href={`/account/blog/${blog.blog_id}`}>برو</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

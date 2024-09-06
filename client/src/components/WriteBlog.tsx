"use client";
import React, { useEffect, useState } from "react";
import PreviewSearchConsole from "./PreviewSearchConsole";
import EditorTextQuill from "./EditorTextQuill";
import RenderBlog from "./RenderBlog";
import { ERoute } from "@/enum/routs";
import { IoCloudDoneOutline, IoCloudOfflineOutline } from "react-icons/io5";
import { fetchBLog, fetchUpdateBlogPanel } from "@/utils/FetchData";

function WriteBlog({ blog_id }: { blog_id: string }) {
  const [saveCloud, setSaveCloud] = useState(false);
  const [showBLod, setShowBlog] = useState(false);
  const [showCodeBLod, setShowCodeBlog] = useState(true);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [blog, setBlog] = useState("");
  const [data, setData] = useState({
    meta_title: "",
    short_description: "",
    title: "",
    src_banner: "",
    publish: false,
  });

  useEffect(() => {
    const setDataBlog = async () => {
      const {
        blog,
        meta_title,
        publish,
        short_description,
        src_banner,
        title,
      } = await fetchBLog({ blog_id });
      const short_descriptions = short_description || "";
      const src = src_banner || "";
      setData({
        short_description: short_descriptions,
        title,
        meta_title,
        src_banner: src,
        publish,
      });
      setBlog(blog || "");
    };
    setDataBlog();
  }, []);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    clearTimeout(timer);
    setSaveCloud(false);
    return setTimer(
      setTimeout(async () => {
        await fetchUpdateBlogPanel({
          access_token,
          blog_id,
          blog,
          meta_title: data.meta_title,
          publish: data.publish,
          short_description: data.short_description,
          src_banner: data.src_banner,
          title: data.title,
        });
        setSaveCloud(true);
      }, 3000)
    );
  }, [blog, data]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  return (
    <div className="text-[#3a2e3c]">
      <div className="w-full">
        {saveCloud ? (
          <IoCloudDoneOutline size={25} />
        ) : (
          <IoCloudOfflineOutline size={25} />
        )}
        <div className="bg-zinc-300/90 mb-3">
          <h3 className="p-1 border-[#3a2e3c] border-b mb-2">سرچ کنسول</h3>
          <PreviewSearchConsole
            meta_title={data.meta_title}
            meta_description={data.short_description}
          />
          <form dir="ltr" className="flex flex-wrap md:flex-nowrap gap-2 mt-2">
            <input
              type="text"
              value={data.meta_title}
              name="meta_title"
              placeholder="meta title"
              className="text-right px-2 py-1 w-full"
              onChange={(e) => onChangeInput(e)}
            />
            <input
              type="text"
              value={data.short_description}
              name="short_description"
              placeholder="meta description"
              className="text-right px-2 py-1 w-full"
              onChange={(e) => onChangeInput(e)}
            />
          </form>
        </div>
        <div className="bg-zinc-300/90 mb-3">
          <h3 className="p-1 border-[#3a2e3c] border-b">تیتر</h3>
          <div className="w-full mt-7 ">
            <img
              src={ERoute.HOST + "/" + data.src_banner}
              alt={data.title}
              className="object-contain h-96 aspect-video mx-auto"
            />
            <h1>{data.title}</h1>
          </div>
          <form className="flex flex-wrap md:flex-nowrap gap-2 mt-2">
            <input
              type="text"
              name="title"
              placeholder="title"
              className="text-right px-2 py-1 w-full"
              onChange={(e) => onChangeInput(e)}
            />
            <input
              type="text"
              name="src_banner"
              placeholder="src banner"
              className="text-right px-2 py-1 w-full"
              onChange={(e) => onChangeInput(e)}
            />
          </form>
        </div>
        <button
          className="mr-auto mb-3 text-white w-40 bg-gradient-to-br from-[#948796] to-[#4e3751] rounded-lg shadow-neo-sm px-3 py-1 flex items-center justify-center"
          onClick={() => setShowBlog((val) => !val)}
        >
          <span className="mx-auto">
            {showBLod ? "ویرایش متن" : "پیش نمایش"}
          </span>
        </button>
        <div className="bg-zinc-300/90">
          <h3 className="p-1 border-[#3a2e3c] border-b">بلاگ</h3>
          {showBLod ? (
            <>
              <h3 className="p-1 border-[#3a2e3c]">پیش نمایش</h3>
              <div dir="ltr" className="border">
                <RenderBlog blog={blog} />
              </div>
            </>
          ) : (
            <>
              <h3 className="p-1 border-[#3a2e3c]">ویرایش متن</h3>
              <button
                className="mr-auto mb-3 ml-2 text-white bg-gradient-to-br from-[#948796] to-[#4e3751] rounded-lg shadow-neo-sm px-3 py-1 flex items-center justify-center"
                onClick={() => setShowCodeBlog((val) => !val)}
              >
                <span className="mx-auto">
                  {showCodeBLod ? "کد" : "رابط کاربری"}
                </span>
              </button>
              {showCodeBLod ? (
                <div dir="ltr" className="border">
                  {/* <div dangerouslySetInnerHTML={{__html: blog}}></div> */}
                  <EditorTextQuill blog={blog} setBlog={setBlog} />
                </div>
              ) : (
                <textarea
                  placeholder="text"
                  dir="ltr"
                  className="min-h-52 w-full px-2 py-1"
                  onChange={(e) => setBlog(e.target.value)}
                >
                  {blog}
                </textarea>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WriteBlog;

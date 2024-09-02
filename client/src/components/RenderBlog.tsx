"use client";
// import dynamic from "next/dynamic";
// import localFont from "next/font/local";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";


// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function RenderBlog({ blog }: { blog: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (show) return <div dangerouslySetInnerHTML={{ __html: blog }}></div>;
  // if (show) return <ReactQuill readOnly={true} theme={"bubble"} value={blog} className={`${iranyekan.className}`}/>;
}

export default RenderBlog;

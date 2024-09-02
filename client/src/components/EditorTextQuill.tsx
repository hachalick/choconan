"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function EditorTextQuill({
  blog,
  setBlog,
}: {
  blog: string;
  setBlog: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const reactQuillRef = useRef(null);
  

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      // ["blockquote", "code-block"],
      ["link", "image", "video"],
      [{ header: 1 }, { header: 2 }],
      // [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      // [{ script: "sub" }, { script: "super" }],
      // [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: ["ltr", "rtl"] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "bullet",
    "bold",
    // "color",
    "font",
    "code",
    "italic",
    "link",
    "size",
    "strike",
    // "script",
    "underline",
    "blockquote",
    "header",
    // "indent",
    // "list",
    "align",
    "direction",
    "code-block",
    // "formula",
    "image",
    "video",
  ];

  useEffect(() => {
    setShow(true);
  }, []);

  if (show)
    return (
      <ReactQuill
        theme="snow"
        // ref={reactQuillRef}
        value={blog}
        onChange={setBlog}
        formats={formats}
        modules={modules}
        onKeyUp={e=>console.log("on key up",e)}
        onChangeSelection={e=>console.log("on change", e)}
      />
    );
}

export default EditorTextQuill;

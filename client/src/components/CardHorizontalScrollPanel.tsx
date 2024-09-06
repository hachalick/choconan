"use client";
import React, { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { ERoute } from "@/enum/routs";
import { fetchUpdateProductMenu } from "@/utils/FetchData";
import { MdOutlineCloudDone, MdOutlineCloudUpload } from "react-icons/md";

function CardHorizontalScrollPanel({ data }: { data: TIdProductMenu }) {
  const [dataCard, setDataCard] = useState<TIdProductMenu>(data);
  const [statusChange, setStatusChange] = useState(false);
  const [statusCloud, setStatusCloud] = useState(true);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    clearTimeout(timer);
    setStatusChange(false);
    statusChange && setStatusCloud(false);
    return setTimer(
      setTimeout(async () => {
        if (statusChange) {
          const { update } = await fetchUpdateProductMenu({
            product_id: dataCard.product_id,
            id: dataCard.id,
            available: dataCard.available,
            description: dataCard.description,
            meta_description: dataCard.meta_description,
            meta_title: dataCard.meta_title,
            name: dataCard.name,
            price: dataCard.price,
            src: dataCard.src,
            waiting: dataCard.waiting,
            access_token,
          });
          setStatusChange(update);
          setStatusCloud(update);
        }
      }, 3000)
    );
  }, [dataCard]);

  const changeHandler = (e: any) => {
    setDataCard((val) => ({ ...val, [e.target.name]: e.target.value }));
    setStatusChange(true);
  };

  const onClickHandlerAvailable = () => {
    setDataCard((val) => ({ ...val, available: !val.available }));
    setStatusChange(true);
  };

  return (
    <div className="flex flex-col shrink-0 snap-center w-[70%] md:w-80 h-[450px] rounded-xl bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo pb-1 mb-4 overflow-y-auto">
      <div className="flex flex-col shrink-0 pb-1 relative">
        <div
          title="save change"
          className={`${
            statusCloud ? "bg-emerald-500" : " bg-rose-500"
          } rounded-lg w-8 h-8 flex justify-center items-center sticky left-2 top-2 mr-auto`}
        >
          {statusCloud ? (
            <MdOutlineCloudDone size={25} />
          ) : (
            <MdOutlineCloudUpload size={25} />
          )}
        </div>
        <div className="aspect-[7/8] md:aspect-square">
          <img alt={dataCard.name} src={ERoute.HOST + dataCard.src} />
        </div>
        <form className="flex flex-col mx-3 gap-1 mb-2">
          <label htmlFor="src">آدرس عکس :</label>
          <input
            id="src"
            name="src"
            type="text"
            value={dataCard.src}
            placeholder="src"
            className="bg-zinc-50/20 px-2 py-1 mx-2"
            dir="ltr"
            onChange={(e) => changeHandler(e)}
          />
          <label htmlFor="meta_title">متا تایتل :</label>
          <input
            id="meta_title"
            name="meta_title"
            type="text"
            value={dataCard.meta_title}
            placeholder="meta_title"
            className="bg-zinc-50/20 px-2 py-1 mx-2"
            onChange={(e) => changeHandler(e)}
          />
          <label htmlFor="meta_description">متا توضیحات :</label>
          <textarea
            id="meta_description"
            name="meta_description"
            value={dataCard.meta_description}
            placeholder="meta_description"
            className="bg-zinc-50/20 px-2 py-1 mx-2 resize-none"
            rows={5}
            onChange={(e) => changeHandler(e)}
          />
          <label htmlFor="name">نام محصول :</label>
          <input
            id="name"
            name="name"
            type="text"
            value={dataCard.name}
            placeholder="name"
            className="bg-zinc-50/20 px-2 py-1 mx-2"
            onChange={(e) => changeHandler(e)}
          />
          <label htmlFor="description">توضیحات :</label>
          <textarea
            id="description"
            name="description"
            value={dataCard.description}
            placeholder="description"
            className="bg-zinc-50/20 px-2 py-1 mx-2 resize-none"
            rows={5}
            onChange={(e) => changeHandler(e)}
          />
          <label htmlFor="waiting">مدت زمان انتظار :</label>
          <input
            id="waiting"
            name="waiting"
            type="number"
            value={dataCard.waiting}
            placeholder="waiting"
            className="bg-zinc-50/20 px-2 py-1 mx-2"
            onChange={(e) => changeHandler(e)}
          />
          <label htmlFor="price">قیمت :</label>
          <input
            id="price"
            name="price"
            type="number"
            value={dataCard.price}
            placeholder="price"
            className="bg-zinc-50/20 px-2 py-1 mx-2"
            onChange={(e) => changeHandler(e)}
          />
          <label htmlFor="src">وضعیت موجودی :</label>
          {dataCard.available ? "موجود" : "ناموجود"}
          <button
            type="button"
            className="mb-4 bg-zinc-200/20 w-32 mx-auto py-1 rounded-lg"
            onClick={() => onClickHandlerAvailable()}
          >
            {dataCard.available ? "ناموجود کردن" : "موجود کردن"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CardHorizontalScrollPanel;

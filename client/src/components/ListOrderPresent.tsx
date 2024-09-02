"use client";
import { ERoute } from "@/enum/routs";
import { dbOrders } from "@/utils/DbClient";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddDeleteProductMenu from "./AddDeleteProductMenu";
import { fetchProductMenu } from "@/utils/FetchData";

function ListOrder({
  listOrder,
  setListOrder,
}: {
  listOrder: TOrdersPresent;
  setListOrder: React.Dispatch<React.SetStateAction<TOrdersPresent>>;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getAllData = async () => {
      const dataDb = await dbOrders.getAll();
      const listAllData: TOrdersPresent = [];
      for (let i in dataDb) {
        const {
          available,
          description,
          id,
          meta_description,
          meta_title,
          name,
          price,
          src,
          waiting,
          product_id,
        } = await fetchProductMenu({
          category: dataDb[i].category,
          id: String(dataDb[i].id_product_menu),
        });
        listAllData.push({
          available,
          description,
          meta_description,
          meta_title,
          name,
          price,
          src,
          waiting,
          id_product_menu: id,
          category: dataDb[i].category,
          count: dataDb[i].count,
          product_id,
        });
      }
      setListOrder(listAllData);
      setShow(true);
    };
    getAllData();
  }, []);

  if (show) {
    return (
      <div>
        {listOrder.length ? (
          listOrder.map((card, i) => (
            <div
              className="bg-zinc-300/90 rounded-md md:flex shadow-neo-sm mt-3"
              key={i}
            >
              <div className="shrink-0 flex items-center justify-center p-4">
                <Image
                  src={ERoute.HOST + card.src}
                  width={100}
                  height={100}
                  alt={card.name}
                  className="md:w-32 md:h-32 w-44 h-44 object-contain rounded-md"
                />
              </div>
              <div className="pt-2 pb-10 mx-2 text-[#3a2e3c] relative my-1 md:w-full ">
                <h2 className="font-bold border-b mb-4 pb-1 border-[#3a2e3c]">
                  {card.name}
                </h2>
                <p className="text-justify w-full text-ellipsis indent-3 mb-2">
                  {card.description}
                </p>
                <div className="py-1 absolute left-0 md:bottom-1 bottom-2 rounded-md font-bold text-sm">
                  <AddDeleteProductMenu
                    category={card.category}
                    id_product_menu={card.id_product_menu}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="shadow-neo-sm py-2 bg-zinc-300/90 rounded-md text-[#3a2e3c] px-2">
            💔 سبد خرید خالی است 💔
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="shadow-neo-sm py-2 bg-zinc-300/90 rounded-md text-[#3a2e3c] px-2">
        در حال دریافت اطلاعات ...
      </div>
    );
  }
}

export default ListOrder;

"use client";
import React, { useEffect, useState } from "react";
import { BtnOrderDecrement, BtnOrderIncrement } from "./BtnIndexOrder";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { dbOrders } from "@/utils/DbClient";
import { digitsEnToFa } from "@persian-tools/persian-tools";

function AddDeleteProductMenu({
  category,
  id_product_menu,
}: {
  category: string;
  id_product_menu: number;
}) {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await dbOrders.getOne({
        data: { id_product_menu, category },
      });
      if (data) {
        setCount(data.count);
      }
      setShow(true);
    };
    getData();
  }, []);

  if (show)
    return (
      <div className="flex items-center justify-center rounded-xl">
        <div className="flex items-center justify-center bg-zinc-50/10 w-fit shadow-lg rounded-xl">
          <div className="border flex p-1 rounded-r-xl">
            <BtnOrderIncrement
              data={{ category, id_product_menu }}
              count={count}
              setCount={setCount}
            >
              <FaPlusCircle size={25} />
            </BtnOrderIncrement>
          </div>
          <div className="px-2 w-24 text-center text-xl">
            <span>{digitsEnToFa(count)}</span>
          </div>
          <div className="border flex p-1 rounded-l-xl">
            <BtnOrderDecrement
              data={{ category, id_product_menu }}
              count={count}
              setCount={setCount}
            >
              <FaMinusCircle size={25} />
            </BtnOrderDecrement>
          </div>
        </div>
      </div>
    );
}

export default AddDeleteProductMenu;

"use client";
import ListOrder from "@/components/ListOrderPresent";
import { dbOrders } from "@/utils/DbClient";
import Link from "next/link";
import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineDeleteSweep } from "react-icons/md";

export default function OrderPresent() {
  const [listOrder, setListOrder] = useState<TOrdersPresent>([]);

  const onclickClear = () => {
    dbOrders.clear();
    setListOrder([]);
  };

  return (
    <>
      <h2 className="font-bold text-lg mb-2 text-[#3a2e3c]">سبد خرید</h2>
      {listOrder.length ? (
        <div className="flex justify-end my-4">
          <button
            type="button"
            onClick={() => onclickClear()}
            className="w-52 bg-gradient-to-br from-[#948796] to-[#4e3751] rounded-lg shadow-neo-sm px-3 py-1 flex items-center justify-center"
          >
            <MdOutlineDeleteSweep size={20} />
            <span className="mx-auto"> خالی کردن سبد خرید</span>
          </button>
        </div>
      ) : (
        <></>
      )}
      <ListOrder listOrder={listOrder} setListOrder={setListOrder} />
      {listOrder.length ? (
        <div className="flex justify-end mt-4">
          <Link
            href="/order/present/factor"
            className="w-40 bg-gradient-to-br from-[#948796] to-[#4e3751] rounded-lg shadow-neo-sm px-3 py-1 flex items-center justify-center"
          >
            <FiShoppingBag size={20} />
            <span className="mx-auto">ادامه خرید</span>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

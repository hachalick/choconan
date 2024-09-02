"use client";
import SelectTable from "@/components/SelectTable";
import TotalFactorMenu from "@/components/TotalFactorMenu";
import { dbOrders } from "@/utils/DbClient";
import {
  fetchOrderTable,
  fetchProductMenu,
  fetchStatusTable,
} from "@/utils/FetchData";
import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import Swal from "sweetalert2";

export default function FactorPresent() {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState("");
  const [listOrder, setListOrder] = useState<TOrdersPresent>([]);

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

  useEffect(() => {
    setShow(true);
  }, []);

  const onClickHandler = async () => {
    if (!val) {
      Swal.fire({
        title: "مشکل داریم !",
        text: "میز خود را انتخاب نکردید",
        icon: "error",
        confirmButtonText: "تلاش مجدد",
      });
    } else if (!listOrder.length) {
      Swal.fire({
        title: "مشکل داریم !",
        text: "سبد سفارش خالی است",
        icon: "error",
        confirmButtonText: "تلاش مجدد",
      });
    } else {
      const statusTable = await fetchStatusTable({ table_id: val });
      if (statusTable.can_order) {
        Swal.fire({
          title: "مشکل داریم !",
          text: `میز انتخاب شده در حال استفاده است`,
          icon: "error",
          confirmButtonText: "تعویض میز",
        });
      } else {
        const orders = listOrder.map((order) => ({
          count: order.count,
          product_id: order.product_id,
        }));
        const res = await fetchOrderTable({
          table_id: val,
          list_order: orders,
        });
        if (res.submit) {
          Swal.fire({
            title: "ثبت سفارش",
            text: "سفارش شما در لیست تایید قرار گرفت",
            icon: "success",
            confirmButtonText: "تایید",
          });
          dbOrders.clear();
        } else {
          Swal.fire({
            title: "مشکل داریم !",
            text: `میز سفارش شما در لیست تایید قرار گرفت حال استفاده است`,
            icon: "error",
            confirmButtonText: "تایید",
          });
        }
      }
    }
  };

  if (show)
    return (
      <>
        <h2 className="font-bold text-lg mb-2 text-[#3a2e3c]">میز سفارش</h2>
        <div className="mb-4 text-[#3a2e3c]">
          <SelectTable setVal={setVal} />
        </div>
        <TotalFactorMenu listOrder={listOrder} />
        <div className="flex justify-end mt-4">
          <button
            className="w-40 bg-gradient-to-br from-[#948796] to-[#4e3751] rounded-lg shadow-neo-sm px-3 py-1 flex items-center justify-center"
            onClick={() => onClickHandler()}
          >
            <FiShoppingBag size={20} />
            <span className="mx-auto">ثبت سفارش</span>
          </button>
        </div>
      </>
    );
}

"use client";
import AcceptDeleteOrder from "@/components/AcceptDeleteOrder";
import { ERoute } from "@/enum/routs";
import { fetchOrderPanel } from "@/utils/FetchData";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function OrdersPanel() {
  const [orders, setData] = useState<TIdPresentOrdersTable>([]);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    if (refetch) {
      const fetchData = async () => {
        const orders = await fetchOrderPanel();
        setData(orders);
      };
      fetchData();
      setRefetch(false);
    }
  }, [refetch]);

  useEffect(() => {
    const socket = io(ERoute.HOST);

    const handleRefetch = () => {
      setRefetch(true);
    };

    socket.on("order-present", (data: { code: number; message: string }) => {
      if (data.code === 1) handleRefetch();
    });

    window.addEventListener("online", handleRefetch);

    return () => {
      socket.disconnect();
      window.removeEventListener("online", handleRefetch);
    };
  }, []);

  return (
    <div>
      <div className="text-[#3a2e3c]">
        {orders.map((val) => (
          <div
            key={val.table}
            className="bg-zinc-300/90 shadow-neo-sm px-2 py-1 rounded-md mb-3 flex"
          >
            <AcceptDeleteOrder table_id={val.present_order_table_id} />
            <div className="grow">
              <h3 className="font-bold text-lg mb-3 pb-1 border-b border-[#3a2e3c]">
                سفارش میز شماره {digitsEnToFa(val.table)}
              </h3>
              <ul>
                {val.factorPresentOrderTable.map((order, i) => (
                  <li
                    key={i}
                    className="font-semibold text-md mb-2 list-decimal mr-5"
                  >
                    <span className="ml-2 w-10">
                      <Image
                        src={ERoute.HOST + order.products.src}
                        width={30}
                        height={30}
                        alt={order.products.name}
                        className="inline"
                      />
                    </span>
                    {order.products.name} {digitsEnToFa(order.count)} عدد
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

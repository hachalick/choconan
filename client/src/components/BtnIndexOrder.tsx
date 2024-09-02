"use client";
import { dbOrders } from "@/utils/DbClient";
import React, { useEffect } from "react";

export function BaseIndexDb() {
  const fetchAllOrders = async ({ data }: { data: any[] }) => {
    console.log(data);
  };

  useEffect(() => {
    const handleOnline = async () => {
      const all_data = await dbOrders.getAll();
      fetchAllOrders({ data: all_data });
      for (let i in all_data) {
        dbOrders.deleteById({ id: all_data[i].id });
      }
    };
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return <></>;
}

export function BtnOrderIncrement({
  setCount,
  count,
  className,
  data,
  children,
}: {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  className?: string;
  data: { category: string; id_product_menu: number };
  children?: any;
}) {
  const clickHandler = async ({ category, count, id_product_menu }: TOrder) => {
    if (navigator) {
      setCount((val) => val + 1);
      const existOrderProduct = await dbOrders.getOne({
        data: { category, id_product_menu },
      });
      if (existOrderProduct) {
        await dbOrders.updateById({
          id: existOrderProduct.id,
          data: { count: existOrderProduct.count + 1 },
        });
      } else {
        await dbOrders.add({
          data: {
            category: category,
            count: count,
            id_product_menu: id_product_menu,
          },
        });
      }
    }
  };

  return (
    <button
      type="button"
      title="increment btn"
      className={className}
      onClick={() =>
        clickHandler({
          category: data.category,
          count: count + 1,
          id_product_menu: data.id_product_menu,
        })
      }
    >
      {children}
    </button>
  );
}

export function BtnOrderDecrement({
  setCount,
  count,
  className,
  data,
  children,
}: {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  className?: string;
  data: { category: string; id_product_menu: number };
  children?: any;
}) {
  const clickHandler = async ({ category, count, id_product_menu }: TOrder) => {
    if (navigator) {
      setCount((val) => (val > 0 ? val - 1 : 0));
      const existOrderProduct = await dbOrders.getOne({
        data: { category, id_product_menu },
      });
      if (existOrderProduct) {
        if (existOrderProduct.count > 1) {
          await dbOrders.updateById({
            id: existOrderProduct.id,
            data: {
              count:
                existOrderProduct.count > 0 ? existOrderProduct.count - 1 : 0,
            },
          });
        } else if (existOrderProduct.count == 1) {
          await dbOrders.deleteById({ id: existOrderProduct.id });
          await dbOrders.sortIds();
        }
      }
    }
  };

  return (
    <button
      type="button"
      title="decrement btn"
      className={className}
      onClick={() =>
        clickHandler({
          category: data.category,
          count: count - 1,
          id_product_menu: data.id_product_menu,
        })
      }
    >
      {children}
    </button>
  );
}

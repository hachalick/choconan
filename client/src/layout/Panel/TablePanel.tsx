"use client";
import {
  fetchCreateTable,
  fetchDeleteTable,
  fetchTables,
} from "@/utils/FetchData";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { RiDeleteBack2Line } from "react-icons/ri";

export default function TablePanel() {
  const [reFetch, setReFetch] = useState(true);
  const [listTable, setListTable] = useState<
    {
      table_id: string;
      table: number;
    }[]
  >([]);

  useEffect(() => {
    if (reFetch) {
      const fetchTable = async () => {
        const res = await fetchTables();
        setListTable(res);
      };
      fetchTable();
      setReFetch(false);
    }
  }, [reFetch]);

  const onClickAddTable = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    let numberTable = 1;
    for (let i = 0; i < listTable.length; i++) {
      if (listTable[i].table - 1 !== i) {
        numberTable = i + 1;
        break;
      }
      else {
        numberTable += 1
      }
    }
    await fetchCreateTable({ access_token, table_number: numberTable });
    setReFetch(true);
  };

  const onClickDeleteTable = async ({ table_id }: { table_id: string }) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await fetchDeleteTable({ access_token, table_id });
    setReFetch(true);
  };

  return (
    <div>
      <div>
        <button
          type="button"
          title="add table"
          onClick={() => onClickAddTable()}
          className="bg-emerald-500 rounded-lg h-8 flex justify-center items-center mr-auto gap-1 px-2 shadow-neo-sm"
        >
          <MdOutlineAddBox size={25} /> صندلی جدید
        </button>
      </div>
      <div>
        <h2 className="text-[#3a2e3c] font-semibold mb-2">میز های موجود:</h2>
        <div className="flex flex-col gap-1">
          {listTable.map((table) => (
            <div
              key={table.table_id}
              className="border px-2 py-3 rounded-md flex gap-2"
            >
              <button
                type="button"
                title="add table"
                onClick={() => onClickDeleteTable({ table_id: table.table_id })}
                className="bg-red-500 rounded-lg h-8 flex justify-center items-center gap-1 px-2 shadow-neo-sm"
              >
                <RiDeleteBack2Line size={25} /> حذف میز{" "}
                {digitsEnToFa(table.table)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";
import {
  fetchAcceptStatusTable,
  fetchDeleteStatusTable,
  fetchEditableStatusTable,
} from "@/utils/FetchData";
import Link from "next/link";
import React from "react";
import { BsCheckSquare, BsDashSquare } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePrint } from "react-icons/md";

function AcceptDeleteOrder({ table_id }: { table_id: string }) {
  const onClickAccept = async () => {
    await fetchAcceptStatusTable({ table_id });
  };

  const onClickEditable = async () => {
    await fetchEditableStatusTable({ table_id });
  };

  const onClickDelete = async () => {
    await fetchDeleteStatusTable({ table_id });
    location.reload();
  };

  return (
    <div className="flex flex-col gap-2 ml-2">
      <button
        type="button"
        title="delete order"
        className="w-8 h-8 bg-red-200 flex justify-center items-center rounded-md"
        onClick={() => onClickDelete()}
      >
        <BsDashSquare size={25} color="#b91c1c" />
      </button>
      <button
        type="button"
        title="accept order"
        className="w-8 h-8  bg-orange-200 flex justify-center items-center rounded-md"
        onClick={() => onClickEditable()}
      >
        <CiEdit size={25} color="#c2410c" />
      </button>
      <button
        type="button"
        title="accept order"
        className="w-8 h-8  bg-green-200 flex justify-center items-center rounded-md"
        onClick={() => onClickAccept()}
      >
        <BsCheckSquare size={25} color="#15803d" />
      </button>
      <Link
        href={`/account/factor/${table_id}`}
        title="print order"
        className="w-8 h-8  bg-gray-200 flex justify-center items-center rounded-md"
      >
        <MdOutlinePrint size={25} color="#374151" />
      </Link>
    </div>
  );
}

export default AcceptDeleteOrder;

import Link from "next/link";
import React from "react";
import { LuTimer } from "react-icons/lu";
import AddDeleteProductMenu from "./AddDeleteProductMenu";
import ImageClient from "./ImageClient";
import { IoAlertCircleOutline } from "react-icons/io5";

function CardHorizontalScroll({
  data,
  category,
  isLink,
}: {
  data: TIdProductMenu;
  category: string;
  isLink: boolean;
}) {
  return (
    <div
      className={`flex flex-col shrink-0 snap-center w-[70%] md:w-80 aspect-[3/4] rounded-xl bg-gradient-to-br from-[#948796] to-[#4e3751]  shadow-neo pb-1 mb-4 ${
        data.available ? "grayscale-0" : "grayscale"
      }`}
    >
      <ContainerCardHorizontalScroll
        category={category}
        id={data.id}
        isLink={isLink}
        name={data.name}
      >
        <div className="aspect-[7/8] md:aspect-square">
          <ImageClient alt={data.name} src={data.src} />
        </div>
        <h5 dir="ltr" className="mt-4 mx-auto text-slate-300 flex items-center">
          {data?.waiting} <LuTimer className="mx-1 -translate-y-[2px]" /> |{" "}
          {data?.price} T
        </h5>
        <h3 className="font-bold mx-2 mb-3 mt-2 text-center">{data.name}</h3>
        <p className="truncate mx-4">{data.description}</p>
      </ContainerCardHorizontalScroll>
      {data.available ? (
        <span className="my-3">
          <AddDeleteProductMenu category={category} id_product_menu={data.id} />
        </span>
      ) : (
        <span className="my-3 mx-auto flex items-center gap-2">
          <IoAlertCircleOutline size={25} />
          ناموجود
          <IoAlertCircleOutline size={25} />
        </span>
      )}
    </div>
  );
}

function ContainerCardHorizontalScroll({
  isLink,
  category,
  id,
  name,
  children,
}: {
  isLink: boolean;
  category: string;
  id: number;
  name: string;
  children: React.ReactNode;
}) {
  const className = "flex flex-col shrink-0 pb-1";

  if (isLink)
    return (
      <Link
        href={`/menu/${category}/${id}/${encodeURI(name)}`}
        className={className}
      >
        {children}
      </Link>
    );
  else return <div className={className}>{children}</div>;
}

export default CardHorizontalScroll;

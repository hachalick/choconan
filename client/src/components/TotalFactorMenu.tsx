import React from "react";
import {
  addCommas,
  digitsEnToFa,
  numberToWords,
} from "@persian-tools/persian-tools";
import { RxCross2 } from "react-icons/rx";

function TotalFactorMenu({ listOrder }: { listOrder: TOrdersPresent }) {
  let totalCoste = 0;
  listOrder.forEach((item) => {
    totalCoste += item.count * item.price;
  });
  totalCoste *= 1000;
  let totalCosteWords = "";
  const resConvert = numberToWords(totalCoste);
  if (typeof resConvert === "string") {
    totalCosteWords = resConvert;
  }

  return (
    <div className="bg-zinc-300/90 rounded-md mt-3 text-[#3a2e3c] font-bold px-4 py-1  shadow-neo-sm">
      <div className="border-[#3a2e3c] border-b pb-3">
        <h3 className="mb-2 text-lg">فاکتور خرید :</h3>
        {listOrder.length ? (
          listOrder.map((item, i) => (
            <div className="flex items-center flex-wrap" key={i}>
              <h4>{item.meta_title}</h4>
              <span className="border-dotted border-b-4 border-[#3a2e3c8a] h-[1px] grow mx-4"></span>
              <span className="flex items-center">
                {digitsEnToFa(addCommas(item.price * 1000))}
                <RxCross2 />
                {digitsEnToFa(item.count)}
              </span>
            </div>
          ))
        ) : (
          <div>سبد خرید خالی است</div>
        )}
      </div>
      <div>
        <h3 className="mb-2 mt-4">جمع کل مبلغ ( تومان ) :</h3>
        <div className="flex items-center flex-wrap">
          <h3>به عدد</h3>
          <span className="border-dotted border-b-4 border-[#3a2e3c8a] h-[1px] grow mx-4"></span>
          <span>{digitsEnToFa(addCommas(totalCoste))}</span>
        </div>
        <div className="flex items-center flex-wrap">
          <h3>به حروف</h3>
          <span className="border-dotted border-b-4 border-[#3a2e3c8a] h-[1px] grow mx-4"></span>
          <span>{totalCosteWords}</span>
        </div>
      </div>
    </div>
  );
}

export default TotalFactorMenu;

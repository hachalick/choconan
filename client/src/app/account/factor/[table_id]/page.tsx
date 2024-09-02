"use client";
import { fetchOrderTablePanel } from "@/utils/FetchData";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SlPrinter } from "react-icons/sl";
import { Jalali } from "jalali-ts";
import { ImSphere } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";

function OrderTablePanel({ params }: { params: { table_id: string } }) {
  const [table, setTable] = useState<TIdPresentOrderTable>();
  const [show, setShow] = useState(false);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const setterData = async () => {
      const table = await fetchOrderTablePanel({ table_id: params.table_id });
      setTable(table);
      setShow(true);
    };
    setterData();
  }, []);

  useEffect(() => {
    if (table) {
      const total = table.factorPresentOrderTable
        .map((item) => item.count * item.products.price)
        .reduce((acc, item) => acc + item);
      setTotal(total);
    }
  }, [table]);

  const numberHandler = ({ number }: { number: string | undefined }) => {
    if (number === undefined) {
      return 0;
    }
    const int = parseInt(number);
    if (int > 0) {
      return int;
    }
    return 0;
  };

  const date = new Jalali();
  console.log(date.getDate());

  if (show && table)
    return (
      <main className="px-2 flex flex-col justify-center items-center">
        <div className="App-print bg-white text-black w-[70mm] p-2">
          <div className="box-header flex justify-center items-center text-center">
            <div className="w-24 h-16 flex justify-center items-center">
              میز
              <span className="mx-2">{digitsEnToFa(table.table)}</span>
            </div>
            <div className="mx-auto">
              <Image src="/s-logo.jpg" alt="logo" width={70} height={70} />
            </div>
            <div className=" w-24 h-16 flex justify-center items-center">
              {digitsEnToFa(date.getFullYear())}/{digitsEnToFa(date.getMonth())}
              /{digitsEnToFa(date.getDate())}
              <br />
              {digitsEnToFa(date.getHours())}:{digitsEnToFa(date.getMinutes())}
            </div>
          </div>
          <div className="box-title text-center my-2 font-extrabold text-2xl">
            کافه شوکونان
          </div>
          <table className="w-full table-auto border-collapse border border-slate-500 mt-3">
            <thead>
              <tr>
                <th className="border border-slate-600 box-orders text-start">
                  سفارشات
                </th>
                <th className="border border-slate-600">فی</th>
                <th className="border border-slate-600">تعداد</th>
                <th className="border border-slate-600">جمع</th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm">
              {table.factorPresentOrderTable.map((data, i) => (
                <tr key={i}>
                  <td className="border border-slate-600">
                    {data.products.name}
                  </td>
                  <td className="border border-slate-600 text-center">
                    {digitsEnToFa(addCommas(data.products.price * 1000))}
                  </td>
                  <td className="border border-slate-600 text-center">
                    {digitsEnToFa(data.count)}
                  </td>
                  <td className="border border-slate-600 text-center">
                    {digitsEnToFa(
                      addCommas(data.count * data.products.price * 1000)
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border-b border-slate-600">جمع کل</td>
                <td className="border-b border-slate-600"></td>
                <td className="border-b border-slate-600"></td>
                <td className="border border-slate-600 text-center">
                  {digitsEnToFa(addCommas(total * 1000))}
                </td>
              </tr>
              <tr>
                <td className="border-b border-slate-600">مالیات</td>
                <td className="border-b border-slate-600 text-center">
                  {digitsEnToFa(tax)}
                </td>
                <td className="border-b border-slate-600">درصد</td>
                <td className="border border-slate-600 text-center">
                  {digitsEnToFa(addCommas(total * tax * 10))}
                </td>
              </tr>
              <tr>
                <td className="border-b border-slate-600">تخفیف</td>
                <td className="border-b border-slate-600 text-center">
                  {digitsEnToFa(discount)}
                </td>
                <td className="border-b border-slate-600">درصد</td>
                <td className="border border-slate-600 text-center">
                  {digitsEnToFa(
                    addCommas(
                      ((((total * tax) / 100 + total) * discount) / 100) * 1000
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="my-3 border-b pb-3 border-black">
            <div className="flex flex-wrap items-center justify-center">
              قابل پرداخت: <span className="border-b-2 grow h-1 mx-2"></span>
              {digitsEnToFa(
                addCommas(
                  Math.floor(
                    (total +
                      (total * tax) / 100 -
                      (((total * tax) / 100 + total) * discount) / 100) *
                      1000
                  )
                )
              )}{" "}
              تومان
            </div>
          </div>
          <div className="text-sm flex items-center mb-1" dir="ltr">
            <ImSphere size={20} className="w-7" /> choconan.ir
          </div>
          <div className="text-sm flex items-center mb-1" dir="ltr">
            <FaInstagram size={20} className="w-7" /> choconan.ir
          </div>
          <div className="text-sm flex items-center mb-1">
            آدرس: سهرودی جنوبی - نرسیده به مطهری - نبش کوچه اسلامی - پلاک ۱۶۲
          </div>
          <div className="text-sm text-center mb-1 underline">
            مشتاق دیدار مجددتون هستیم
          </div>
        </div>
        <form className="print:hidden flex flex-col gap-2 mt-2 w-64 text-black">
          <label htmlFor="tax" className="font-semibold">
            درصد مالیات:
          </label>
          <input
            id="tax"
            type="number"
            value={tax}
            name="tax"
            placeholder="tax"
            onChange={(e) => setTax(numberHandler({ number: e.target.value }))}
            className="w-full px-2 py-1 rounded-lg"
          />
          <label htmlFor="discount" className="font-semibold">
            درصد تخفیف:
          </label>
          <input
            id="discount"
            type="number"
            value={discount}
            name="discount"
            placeholder="discount"
            onChange={(e) =>
              setDiscount(numberHandler({ number: e.target.value }))
            }
            className="w-full px-2 py-1 rounded-lg"
          />
          <button
            type="button"
            onClick={() => window.print()}
            className="print:hidden flex gap-3 justify-center items-center bg-gradient-to-br from-[#948796] to-[#4e3751] text-white w-40 mx-auto mt-4 py-2 rounded-lg shadow-neo-sm"
          >
            <SlPrinter size={25} />
            print
          </button>
        </form>
      </main>
    );
}

export default OrderTablePanel;

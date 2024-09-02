import Link from "next/link";
import { BsExclamationOctagon } from "react-icons/bs";

export default function NotFound() {
  return (
    <div className="h-[calc(100svh_-_56px)] flex items-center justify-center flex-col">
      <div className="bg-slate-100 p-4 rounded-2xl relative max-w-lg mx-auto bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo flex flex-col justify-center items-center">
        <BsExclamationOctagon size={50} className="mb-3 bg-red-200 rounded-full p-1" color="#ff4b4a" />
        <h2 className="font-semibold text-2xl mb-1">
          یافت نشد !!!
        </h2>
        <p className="text-slate-50/70 mb-6">
          برای درخواست شما محتوایی یافت نشد.
        </p>
        <Link
          href="/"
          className="text-color3-800 border bg-color3-200/20 border-color3-800 rounded-md px-3 py-2 "
        >
          رفتن به خانه
        </Link>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import AccountingPanel from "./AccountingPanel";
import BlogsPanel from "./BlogsPanel";
import MenuPanel from "./MenuPanel";
import OrdersPanel from "./OrdersPanel";
import TablePanel from "./TablePanel";
import { EPanel } from "@/enum/panel.enum";
import AccountPanel from "./AccountPanel";
import Image from "next/image";
import { fetchGetAccount } from "@/utils/FetchData";
import { ERoute } from "@/enum/routs";

export default function AdminPanel() {
  const [state, setState] = useState(EPanel.DEFAULT);
  const [srcProfile, setSrcProfile] = useState("/default.jpg");

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const fetchSrc = async () => {
      const res = await fetchGetAccount({ access_token });
      setSrcProfile(res.profile);
    };
    fetchSrc();
  }, []);

  return (
    <main className="md:grid grid-cols-4 px-2 gap-2 gap-x-4">
      <aside className="mb-5 md:sticky top-12 p-3 rounded-lg bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo-sm h-fit flex md:flex-col flex-wrap gap-y-4 gap-x-2">
        <Image
          src={ERoute.HOST + srcProfile}
          alt="profile"
          width={50}
          height={50}
          className="mx-auto rounded-full w-16"
        />
        <button
          className="w-full px-2 py-1 border border-zinc-50 rounded-lg"
          onClick={() => setState(EPanel.USER)}
        >
          اطلاعات حساب
        </button>
        <button
          className="w-full px-2 py-1 border border-zinc-50 rounded-lg"
          onClick={() => setState(EPanel.ORDERS)}
        >
          سفارشات
        </button>
        <button
          type="button"
          className="w-full px-2 py-1 border border-zinc-50 rounded-lg"
          onClick={() => setState(EPanel.MENU)}
        >
          منو
        </button>
        <button
          type="button"
          className="w-full px-2 py-1 border border-zinc-50 rounded-lg"
          onClick={() => setState(EPanel.BLOGS)}
        >
          بلاگ
        </button>
        <button
          type="button"
          className="w-full px-2 py-1 border border-zinc-50 rounded-lg"
          onClick={() => setState(EPanel.ACCOUNTING)}
        >
          حسابداری
        </button>
        <button
          type="button"
          className="w-full px-2 py-1 border border-zinc-50 rounded-lg"
          onClick={() => setState(EPanel.TABLE)}
        >
          مدیریت میز
        </button>
        <button
          type="button"
          className="w-full px-2 py-1 border border-zinc-50 rounded-lg"
          onClick={() => {
            sessionStorage.clear();
            localStorage.clear();
            location.reload();
          }}
        >
          خروج از حساب
        </button>
      </aside>
      <Container state={state} />
    </main>
  );
}

function Container({ state }: { state: number }) {
  if (state === EPanel.USER) {
    return (
      <article className="col-span-3">
        <AccountPanel />
      </article>
    );
  } else if (state === EPanel.ORDERS) {
    return (
      <article className="col-span-3">
        <OrdersPanel />
      </article>
    );
  } else if (state === EPanel.MENU) {
    return (
      <article className="col-span-3">
        <MenuPanel />
      </article>
    );
  } else if (state === EPanel.BLOGS) {
    return (
      <article className="col-span-3">
        <BlogsPanel />
      </article>
    );
  } else if (state === EPanel.ACCOUNTING) {
    return (
      <article className="col-span-3">
        <AccountingPanel />
      </article>
    );
  } else if (state === EPanel.TABLE) {
    return (
      <article className="col-span-3">
        <TablePanel />
      </article>
    );
  }
}

"use client";
import React, { useState } from "react";
import OrdersPanel from "./OrdersPanel";
import { EPanel } from "@/enum/panel.enum";

export default function WaiterPanel() {
  const [state, setState] = useState(EPanel.DEFAULT);

  return (
    <main className="md:grid grid-cols-[200px_auto] gap-2 mx-3">
      <aside className="mb-5 md:sticky top-12 p-3 rounded-lg bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo-sm h-fit flex md:flex-col flex-wrap gap-y-4 gap-x-2">
        <button
          className="w-full px-2 py-1 border border-zinc-50 rounded-lg"
          onClick={() => setState(EPanel.ORDERS)}
        >
          سفارشات
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
  if (state === EPanel.ORDERS) {
    return (
      <article className="">
        <OrdersPanel />
      </article>
    );
  }
}

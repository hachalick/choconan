"use client";
import React, { useState } from "react";
import OrdersPanel from "./OrdersPanel";

export default function UserPanel() {
  const [state, setState] = useState("0");

  return (
    <main className="md:grid grid-cols-5 px-2 gap-2">
      <aside className="mb-5 md:sticky top-12 p-3 rounded-lg bg-gradient-to-br from-[#948796] to-[#4e3751] shadow-neo-sm h-fit flex md:flex-col flex-wrap gap-y-4 gap-x-2">
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

function Container({ state }: { state: string }) {
  if (state === "1") {
    return (
      <article className="col-span-4">
        <OrdersPanel />
      </article>
    );
  }
}

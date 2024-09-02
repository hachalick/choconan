"use client";
import AdminPanel from "@/layout/AdminPanel";
import LoginPanel from "@/layout/LoginPanel";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function AccountPanel() {
  const [state, setState] = useState(2);

  useEffect(() => {
    const access_token = localStorage.getItem("lastname");
    // if (access_token) {
    //   setState(2);
    // } else {
    //   setState(1);
    // }
  }, []);

  if (state === 0)
    return (
      <div className="h-[90dvh] text-2xl flex items-center justify-center">
        <Image
          src="/loading.png"
          width={20}
          height={20}
          alt="loading img"
          className="mx-2 w-8 animate-spin"
        />
        در حال لود سایت . . .
      </div>
    );
  else if (state == 1) return <LoginPanel />;
  else if (state == 2) return <AdminPanel />;
  else if (state == 3) return <>user</>;
}

export default AccountPanel;

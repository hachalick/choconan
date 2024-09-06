"use client";
import { ERoleUser } from "@/enum/role-user.enum";
import AdminPanel from "@/layout/Panel/AdminPanel";
import LoginPanel from "@/layout/Panel/LoginPanel";
import UserPanel from "@/layout/Panel/UserPanel";
import WaiterPanel from "@/layout/Panel/WaiterPanel";
import { fetchGetRole } from "@/utils/FetchData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function AccountPanel() {
  const [state, setState] = useState(0);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    const fetchRoles = async () => {
      if (access_token) {
        const roles = await fetchGetRole({ access_token });
        if (roles.includes(ERoleUser.ADMIN)) setState(2);
        else if (roles.includes(ERoleUser.WAITER)) setState(3);
        else setState(4);
      } else {
        setState(1);
      }
    };
    fetchRoles();
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
  else if (state == 3) return <WaiterPanel />;
  else if (state == 4) return <UserPanel />;
}

export default AccountPanel;

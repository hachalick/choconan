"use client";
import { fetchGetAccount, fetchUpdatePassword } from "@/utils/FetchData";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AccountPanel() {
  const [profile, setProfile] = useState<TProfile>({
    family: "",
    name: "",
    profile: "",
  });
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
  });

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const fetchSrc = async () => {
      const res = await fetchGetAccount({ access_token });
      setProfile(res);
    };
    fetchSrc();
  }, []);

  const updatePassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (password.old_password.length < 4 || password.new_password.length < 4) {
      e.preventDefault();
      Swal.fire({
        title: "رمز تغییر نکرد",
        text: "رمز عبور کمتر از 4 کارکتر است",
        icon: "warning",
        confirmButtonText: "تلاش مجدد",
      });
    } else {
      const access_token = sessionStorage.getItem("access_token") || "";
      const res = await fetchUpdatePassword({
        access_token,
        new_password: password.new_password,
        old_password: password.old_password,
      });
      if (res.update) {
        Swal.fire({
          title: "رمز تغییر کرد",
          text: "رمز عبور با موفقیت تغییر کرد",
          icon: "success",
          confirmButtonText: "تلاش مجدد",
        });
        setTimeout(() => {
          sessionStorage.clear();
          localStorage.clear();
          location.reload();
        }, 1500);
      } else {
        Swal.fire({
          title: "رمز تغییر نکرد",
          text: "مشکلی در تغییر رمز بوجود آمد",
          icon: "warning",
          confirmButtonText: "تلاش مجدد",
        });
      }
    }
  };

  return (
    <div>
      <form className="flex flex-wrap text-[#3a2e3c] border-b pb-2">
        <div className="flex flex-col gap-1 grow shrink-0 basis-1/2 p-1">
          <label htmlFor="name" className="font-semibold">
            نام:
          </label>
          <input
            type="text"
            id="name"
            value={profile.name}
            placeholder="نام"
            className="mb-2 px-2 py-1 rounded-md"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
          />
        </div>
        <div className="flex flex-col gap-1 grow shrink-0 basis-1/2 p-1">
          <label htmlFor="family" className="font-semibold">
            نام خانوادگی:
          </label>
          <input
            type="text"
            id="family"
            value={profile.family}
            placeholder="نام خانوادگی"
            className="mb-2 px-2 py-1 rounded-md"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
          />
        </div>
        <button
          type="button"
          className="mr-auto rounded-lg bg-gradient-to-br from-[#948796] to-[#4e3751] px-2 py-1 shadow-neo-sm text-white"
        >
          بروزرسانی اطلاعات
        </button>
      </form>
      <form className="flex flex-wrap text-[#3a2e3c] border-b pb-2">
        <div className="flex flex-col gap-1 grow shrink-0 basis-1/2 p-1">
          <label htmlFor="last_password" className="font-semibold">
            رمز عبور فعلی:
          </label>
          <input
            type="password"
            id="last_password"
            value={password.old_password}
            placeholder="رمز عبور فعلی"
            className="mb-2 px-2 py-1 rounded-md"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onChange={(e) =>
              setPassword((val) => ({ ...val, old_password: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-1 grow shrink-0 basis-1/2 p-1">
          <label htmlFor="new_password" className="font-semibold">
            رمز عبور جدید:
          </label>
          <input
            type="password"
            id="new_password"
            value={password.new_password}
            placeholder="رمز عبور جدید"
            className="mb-2 px-2 py-1 rounded-md"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onChange={(e) =>
              setPassword((val) => ({ ...val, new_password: e.target.value }))
            }
          />
        </div>
        <button
          type="button"
          className="mr-auto rounded-lg bg-gradient-to-br from-[#948796] to-[#4e3751] px-2 py-1 shadow-neo-sm text-white"
          onClick={(e) => updatePassword(e)}
        >
          بروزرسانی رمز
        </button>
      </form>
    </div>
  );
}

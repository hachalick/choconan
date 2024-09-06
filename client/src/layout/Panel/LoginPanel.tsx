"use client";
import { fetchLoginPassword, fetchRefreshToken } from "@/utils/FetchData";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function LoginPanel() {
  const [stepForm, setStepForm] = useState(1);
  const [nationalCode, setNationalCode] = useState("98");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const refresh_token = localStorage.getItem("refresh_token");
    const fetchToken = async () => {
      if (refresh_token) {
        const tokens = await fetchRefreshToken({ refresh_token });
        if (tokens.refresh) {
          localStorage.setItem("refresh_token", tokens.refresh_token);
          sessionStorage.setItem("access_token", tokens.access_token);
          location.reload();
        }
      }
    };
    fetchToken();
  }, []);

  const onChangeNationalCode = () => {};

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitFrom1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nationalCode.length > 3 || phone.length !== 10 || password.length < 4) {
      e.preventDefault();
    } else {
      try {
        const res = await fetchLoginPassword({
          national_code: nationalCode,
          password,
          phone,
        });
        if (res.login === true) {
          localStorage.setItem("refresh_token", res.refresh_token);
          sessionStorage.setItem("access_token", res.access_token);
          Swal.fire({
            title: "ورود با موفقیت انجام شد",
            text: "در حال ورود به سایت",
            icon: "success",
            confirmButtonText: "باشه",
          });
          setTimeout(() => {
            location.reload();
          }, 1500);
        } else {
          Swal.fire({
            title: "ورود نکردید!",
            text: "رمز عبور صحیح نیست",
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          });
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      } catch (error) {
        Swal.fire({
          title: "ورود نکردید!",
          text: "اطلاعات کاربر ثبت نام نشده است",
          icon: "error",
          confirmButtonText: "گرفتم",
        });
      }
    }
  };

  if (stepForm === 1) {
    return (
      <div>
        <div className="flex gap-2 px-2 mb-3">
          {/* <button
            type="button"
            onClick={() => setStepForm(2)}
            className="flex bg-gradient-to-br from-[#948796] to-[#4e3751] px-2 py-1 text-sm rounded-md shadow-neo-sm"
          >
            ثبت نام
          </button> */}
        </div>
        <div className="flex justify-center items-center h-[80dvh]">
          <form
            className="bg-gray-300 p-3 text-black flex flex-col gap-2 rounded-md shadow-neo-sm"
            onSubmit={(e) => onSubmitFrom1(e)}
          >
            <label htmlFor="phone" className="font-semibold">
              شماره همراه:
            </label>
            <span
              dir="ltr"
              className="bg-gray-100 p-1 rounded-md border border-gray-400"
            >
              <span dir="ltr">
                +
                <input
                  type="text"
                  placeholder="na"
                  maxLength={3}
                  className="w-6 text-center focus:outline-none focus:cursor-default hover::cursor-default bg-transparent"
                  value={nationalCode}
                  readOnly
                />
              </span>
              <input
                type="number"
                id="phone"
                placeholder="9#########"
                maxLength={10}
                minLength={10}
                className="text-left w-42 focus:outline-none no-spinner bg-transparent "
                autoFocus
                autoComplete="off"
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onChange={(e) => onChangePhone(e)}
              />
            </span>
            <label htmlFor="password" className="font-semibold">
              رمز ورود:
            </label>
            <input
              type="password"
              id="password"
              placeholder="* * * * * * * * * * * * * * * * * * *"
              minLength={4}
              className="w-full text-center focus:outline-none bg-gray-100 p-1 rounded-md border border-gray-400"
              autoComplete="off"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onChange={(e) => onChangePassword(e)}
            />
            <button
              type="submit"
              className="bg-gradient-to-br from-[#948796] to-[#4e3751] text-white px-2 py-1 rounded-md shadow-neo-sm text-center my-1 w-42 mx-5"
            >
              ورود
            </button>
          </form>
        </div>
      </div>
    );
  } else if (stepForm === 2) {
    return (
      <div>
        <div className="flex gap-2 px-2">
          <button
            type="button"
            onClick={() => setStepForm(1)}
            className="flex bg-gradient-to-br from-[#948796] to-[#4e3751] px-2 py-1 text-sm rounded-md shadow-neo-sm"
          >
            ورود
          </button>
        </div>
        <form></form>
      </div>
    );
  }
}

export default LoginPanel;

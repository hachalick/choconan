import ShowNestedRoute from "@/components/ShowNestedRoute";
import React from "react";

function FAQ() {
  return (
    <main className="text-[#3a2e3c] px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/faqs", name: "سوالات متداول" },
        ]}
      />
      <details className="mb-4">
        <summary className="bg-zinc-200 px-3 rounded-md font-bold py-1">
          نحوه رزرو کردن کافه شوکونان
        </summary>
        <div className="bg-zinc-300/90 px-3 py-1 mx-3 translate-y-2 rounded-md shadow-neo-sm">
          در ابتدا نیاز است که بصورت حضوری جزئیات مطرح شود اما بصورت کلی به
          مواردی اشاره خواهیم کرد.
          <br />
          رزرو کردن به دو صورت امکان پذیر می باشد
          <br />
          <ol className="list-decimal">
            <li className="mr-4">
              فضا داخل یا ایوان بدون درخواست سرویس از کافه، فضا آن قسمت بطور
              کامل در اختیار شخص قرار می گیرد که در اینصورت مبلغی به صورت توافقی
              بنابر روز، ساعت، میزان زمان و ... برای اجاره مکان تعیین می شود که
              یک سوم آن به عنوان پیش پرداخت و مابقی آن در روز مراسم پرداخت می
              شود.
            </li>
            <li className="mr-4">
              فضا داخل یا ایوان با گرفتن سرویس از کافه، هزینه و تعداد هر محصول
              بنابر قیمت روز برآورد می شود و دو ثلث آن هزینه به عنوان پیش پرداخت
              و مابقی آن به در روز مراسم پرداخت می شود.
            </li>
          </ol>
          <br />
        </div>
      </details>
    </main>
  );
}

export default FAQ;

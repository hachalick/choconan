import ShowNestedRoute from "@/components/ShowNestedRoute";
import React from "react";

function About() {
  return (
    <main className="text-[#3a2e3c] px-2">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/about-us", name: "درباره ما" },
        ]}
      />
      <h1 className="font-bold text-lg text-[#3a2e3c]">
        درباره کافه شوکونان چی میدانید ؟!
      </h1>
      <p className="indent-3">
        دارای دو محیط می باشد. یک فضای خارجی ایوان و یک فضای داخلی سالن که یک
        محیط آرام و خانوادگی، هر سلیقه ای را با این محل خاص مانوس می کند. ساعت
        کاری آن در روزهای شنبه تا پنجشنبه از 8 صبح تا 12 شب است و در روز جمعه از
        11 صبح تا 12 شب آماده پذیرایی از مشتریان عزیز می باشد.
      </p>
      <h2 className="font-bold text-md text-[#3a2e3c] mt-3">
        فعالیت کافه شوکونان:
      </h2>
      <p className="indent-3">
        در ابتدا به وسیله پیج اینستاگرامی choconan.ir فعالیت خود را شروع کرد و
        با عرضه کردن محصولات نان و شکلات های خانگی کار جدی خود را آغاز کرد. در
        نهایت در بهار سال 1403 با ایجاد یک مغازه واقع در سهرودی جنوبی تصمیم به
        ارائه خدمات خود به صورت حضوری انجام داد.
      </p>
      <h2 className="font-bold text-md text-[#3a2e3c] mt-3">
        در کافی شاپ شوکونان همیشه مواد تازه میل کنید:
      </h2>
      <p className="indent-3">
        تمامی محصولات مثل کیک کوکی شکلات کروسان توسط خانم فرهادیان مدیر coffee
        choconan تولید و عرضه میشود.
      </p>
      <h2 className="font-bold text-md text-[#3a2e3c] mt-3">
        چرا کافی شاپ شوکونان:
      </h2>
      <p className="indent-3">
        با داشتن پروانه کسب و کار میتوانید اطمینان از فعالیت قانونی حاصل کنید.
      </p>
      <p className="indent-3">
        میتوانید برای صبحانه ناهار و شام در یک محیط آرام و مواد اولیه با کیفیت
        از خدمات ما بهره ببرید.
      </p>
      <p className="indent-3"></p>
      <h2 className="font-bold text-md text-[#3a2e3c] mt-3">
        نحوه ارائه خدمات کافه شوکونان:
      </h2>
      <p className="indent-3">
        برگزاری ایونت های مختصر و گرفتن جشن تولد که از قبل هماهنگی هایی لازم را
        با مدیریت انجام داده اند.
      </p>
    </main>
  );
}

export default About;

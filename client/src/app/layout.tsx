import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import localFont from "next/font/local";

const iranyekan = localFont({
  src: [
    {
      path: "../assets/font/iranyekan/woff2/IRANYekanX-Black.woff2",
      weight: "900",
      style: "black",
    },
    {
      path: "../assets/font/iranyekan/woff2/IRANYekanX-Bold.woff2",
      weight: "bold",
      style: "bold",
    },
    {
      path: "../assets/font/iranyekan/woff2/IRANYekanX-DemiBold.woff2",
      weight: "600",
      style: "demibold",
    },
    {
      path: "../assets/font/iranyekan/woff2/IRANYekanX-ExtraBlack.woff2",
      weight: "950",
      style: "extra-black",
    },
    {
      path: "../assets/font/iranyekan/woff2/IRANYekanX-ExtraBold.woff2",
      weight: "800",
      style: "extra-bold",
    },
    {
      path: "../assets/font/iranyekan/woff2/IRANYekanX-Heavy.woff2",
      weight: "1000",
      style: "heavy",
    },
    {
      path: "../assets/font/iranyekan/woff2/IRANYekanX-Light.woff2",
      weight: "300",
      style: "light",
    },
    {
      path: "../assets/font/iranyekan/woff2/IRANYekanX-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../assets/font/iranyekan/woff2/IRANYekanX-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../assets/font/iranyekan/woff2/IRANYekanX-Thin.woff2",
      weight: "100",
      style: "thin",
    },
    {
      path: "../assets/font/iranyekan/woff2/IRANYekanX-UltraLight.woff2",
      weight: "200",
      style: "ultralight",
    },
    {
      path: "../assets/font/iranyekan/woff/IRANYekanX-Black.woff",
      weight: "900",
      style: "black",
    },
    {
      path: "../assets/font/iranyekan/woff/IRANYekanX-Bold.woff",
      weight: "bold",
      style: "bold",
    },
    {
      path: "../assets/font/iranyekan/woff/IRANYekanX-DemiBold.woff",
      weight: "600",
      style: "demibold",
    },
    {
      path: "../assets/font/iranyekan/woff/IRANYekanX-ExtraBlack.woff",
      weight: "950",
      style: "extra-black",
    },
    {
      path: "../assets/font/iranyekan/woff/IRANYekanX-ExtraBold.woff",
      weight: "800",
      style: "extra-bold",
    },
    {
      path: "../assets/font/iranyekan/woff/IRANYekanX-Heavy.woff",
      weight: "1000",
      style: "heavy",
    },
    {
      path: "../assets/font/iranyekan/woff/IRANYekanX-Light.woff",
      weight: "300",
      style: "light",
    },
    {
      path: "../assets/font/iranyekan/woff/IRANYekanX-Medium.woff",
      weight: "500",
      style: "medium",
    },
    {
      path: "../assets/font/iranyekan/woff/IRANYekanX-Regular.woff",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../assets/font/iranyekan/woff/IRANYekanX-Thin.woff",
      weight: "100",
      style: "thin",
    },
    {
      path: "../assets/font/iranyekan/woff/IRANYekanX-UltraLight.woff",
      weight: "200",
      style: "ultralight",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "choconan | خانه کافه شوکونان",
    template: "کافه شوکونان",
  },
  description:
    "شوکونان یک کافه واقع در سهرودی است که محصولات خود را بصورت بیرون بر یا سرو داخل کافه ارائه میدهد",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "کافه شوکونان",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "کافه شوکونان",
    title: {
      default: "choconan | خانه کافه شوکونان",
      template: "کافه شوکونان",
    },
    description:
      "شوکونان یک کافه واقع در سهرودی است که محصولات خود را بصورت بیرون بر یا سرو داخل کافه ارائه میدهد",
  },
  twitter: {
    card: "summary",
    title: {
      default: "choconan | خانه کافه شوکونان",
      template: "کافه شوکونان",
    },
    description:
      "شوکونان یک کافه واقع در سهرودی است که محصولات خود را بصورت بیرون بر یا سرو داخل کافه ارائه میدهد",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={`${iranyekan.className} relative`}>
        <Header />
        <div className="min-h-svh relative bg-zinc-400">
          <div className="max-w-lg md:max-w-6xl mx-auto text-slate-100 py-3">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}

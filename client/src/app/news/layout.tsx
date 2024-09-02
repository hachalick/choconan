import { Metadata } from "next";

export const metadata: Metadata = {
  title: "choconan | اخبار کافه شوکونان",
  description:
    "شوکونان یک کافه واقع در سهرودی است که محصولات خود را بصورت بیرون بر یا سرو داخل کافه ارائه میدهد",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import Category from "@/components/Category";
import SearchBoxMenu from "@/components/SearchBoxMenu";
import ShowNestedRoute from "@/components/ShowNestedRoute";
import VideoHome from "@/components/VideoHome";
import WhyUs from "@/components/WhyUs";
import Banner from "@/layout/Banner";

export default function Home() {
  return (
    <main className="px-2">
      <ShowNestedRoute list_route={[{ path: "/", name: "خانه" }]} />
      <Banner />
      <SearchBoxMenu />
      <Category />
      <VideoHome />
      <WhyUs />
    </main>
  );
}

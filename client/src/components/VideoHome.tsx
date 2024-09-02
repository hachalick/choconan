import { fetchLastVideo } from "@/utils/FetchData";
import React from "react";

async function VideoHome() {
  const res = await fetchLastVideo({ category: "aparat" });
  return (
    <div className="mt-5">
      <div className="flex py-4">
        <iframe
          title={res.name}
          src={res.link}
          className="w-full aspect-video rounded-2xl"
        />
      </div>
    </div>
  );
}

export default VideoHome;

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/account/*",
        "/account/accounting",
        "/account/blog",
        "/account/order",
        "/account/blog/*",
        "/order",
        "/order/present",
        "/order/transfer",
      ],
    },
    sitemap: "https://choconan.ir/sitemap.xml",
  };
}

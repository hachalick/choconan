import { ERoute } from "@/enum/routs";
import { MetadataRoute } from "next";
type ItemSitemap = MetadataRoute.Sitemap[0];

async function getData(): Promise<TIdCategoriesMenu> {
  const res = await fetch(ERoute.HOST + ERoute.GET_FULL_MENU);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProduct = await getData();
  const listCategory = allProduct.map((product) => {
    const list: ItemSitemap = {
      url: `https://choconan.ir/menu/${product.category}`,
      lastModified: new Date(),
    };
    return list;
  });
  let listProducts: MetadataRoute.Sitemap = [];
  allProduct.forEach((product) => {
    const list = product.products.map((pro) => {
      const list: ItemSitemap = {
        url: `https://choconan.ir/menu/${product.category}/${
          pro.id
        }/${encodeURI(pro.name)}`,
        lastModified: new Date(),
      };
      return list;
    });
    listProducts = [...listProducts, ...list];
  });
  return [
    {
      url: "https://choconan.ir",
      lastModified: new Date(),
    },
    {
      url: "https://choconan.ir/about-us",
      lastModified: new Date(),
    },
    {
      url: "https://choconan.ir/blogs",
      lastModified: new Date(),
    },
    {
      url: "https://choconan.ir/contact-us",
      lastModified: new Date(),
    },
    {
      url: "https://choconan.ir/faqs",
      lastModified: new Date(),
    },
    {
      url: "https://choconan.ir/news",
      lastModified: new Date(),
    },
    {
      url: "https://choconan.ir/products",
      lastModified: new Date(),
    },
    {
      url: "https://choconan.ir/questions",
      lastModified: new Date(),
    },
    {
      url: "https://choconan.ir/search",
      lastModified: new Date(),
    },
    {
      url: "https://choconan.ir/menu",
      lastModified: new Date(),
    },
    ...listCategory,
    ...listProducts,
  ];
}

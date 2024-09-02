import HorizontalScrollPanel from "@/components/HorizontalScrollPanel";
import { fetchAllProductMenu } from "@/utils/FetchData";
import React, { useEffect, useState } from "react";

export default function MenuPanel() {
  const [allProduct, setAllProduct] = useState<TIdCategoriesMenu>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allProduct = await fetchAllProductMenu();
      setAllProduct(allProduct);
    };
    fetchData();
  }, []);

  return (
    <div>
      {allProduct.map((product, i) => (
        <HorizontalScrollPanel
          key={i}
          category_product_id={product.category_product_id}
          title={product.category}
          products={product.products}
          icon={product.icon}
          category={product.category}
        />
      ))}
    </div>
  );
}

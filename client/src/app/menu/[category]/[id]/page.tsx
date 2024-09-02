import { fetchProductMenu } from "@/utils/FetchData";
import { redirect, RedirectType } from "next/navigation";
import React from "react";

async function ProductId({
  params,
}: {
  params: { category: string; id: string };
}) {
  const product = await fetchProductMenu({
    category: params.category,
    id: params.id,
  });
  if (!Object.keys(product).length) {
    redirect(`/menu/${params.category}`, RedirectType.replace);
  } else {
    redirect(
      `/menu/${params.category}/${product.id}/${encodeURI(product.name)}`,
      RedirectType.replace
    );
  }
}

export default ProductId;

import { EMethodRequest } from "@/enum/method-req.enum";
import { ERoute } from "@/enum/routs";

// app

export async function fetchLastVideo({
  category,
}: {
  category: TCategoryVideo;
}): Promise<TCardVideo> {
  const res = await fetch(
    ERoute.HOST + ERoute.GET_LAST_VIDEO + `/${category}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.GET,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// menu

export async function fetchSearch({
  query,
}: {
  query: string;
}): Promise<TIdProductsSearchMenu> {
  const res = await fetch(`${ERoute.HOST}${ERoute.SEARCH_ON_MENU}/${query}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.GET,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchAllProductMenu(): Promise<TIdCategoriesMenu> {
  const res = await fetch(ERoute.HOST + ERoute.GET_FULL_MENU, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.GET,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchCategoryMenu({
  category,
}: {
  category: string;
}): Promise<TIdCategoryMenu> {
  const res = await fetch(ERoute.HOST + ERoute.GET_FULL_MENU + `/${category}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.GET,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchProductMenu({
  category,
  id,
}: {
  category: string;
  id: string;
}): Promise<TIdProductMenu> {
  const res = await fetch(
    ERoute.HOST + ERoute.GET_FULL_MENU + `/${category}/${id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.GET,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchAddCategoryMenu({
  category,
  icon,
}: {
  category: string;
  icon: string;
}): Promise<{ add: boolean }> {
  const res = await fetch(ERoute.HOST + ERoute.ADD_CATEGORY_MENU, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.POST,
    body: JSON.stringify({ category, icon }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchUpdateCategoryMenu({
  category_id,
  category,
  icon,
}: {
  category_id: string;
  category: string;
  icon: string;
}): Promise<{ update: boolean }> {
  const res = await fetch(
    ERoute.HOST + ERoute.UPDATE_CATEGORY_MENU + `/${category_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.PUT,
      body: JSON.stringify({ category, icon }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchDeleteCategoryMenu({
  category_id,
}: {
  category_id: string;
}): Promise<{ delete: boolean }> {
  const res = await fetch(
    ERoute.HOST + ERoute.DELETE_CATEGORY_MENU + `/${category_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.DELETE,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchAddProductMenu({
  category_id,
  id,
  available,
  price,
  waiting,
  description,
  meta_description,
  meta_title,
  name,
  src,
}: TProductMenu & {
  category_id: string;
}): Promise<{ add: boolean }> {
  const res = await fetch(
    ERoute.HOST + ERoute.ADD_PRODUCT_MENU + `/${category_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.POST,
      body: JSON.stringify({
        id,
        available,
        price,
        waiting,
        description,
        meta_description,
        meta_title,
        name,
        src,
      }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchUpdateProductMenu({
  product_id,
  id,
  available,
  price,
  waiting,
  description,
  meta_description,
  meta_title,
  name,
  src,
}: TProductMenu & {
  product_id: string;
}): Promise<{ update: boolean }> {
  const res = await fetch(
    ERoute.HOST + ERoute.UPDATE_PRODUCT_MENU + `/${product_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.PUT,
      body: JSON.stringify({
        id,
        available,
        price,
        waiting,
        description,
        meta_description,
        meta_title,
        name,
        src,
      }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchDeleteProductMenu({
  product_id,
}: {
  product_id: string;
}): Promise<{ delete: boolean }> {
  const res = await fetch(
    ERoute.HOST + ERoute.DELETE_PRODUCT_MENU + `/${product_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.DELETE,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// order

export async function fetchTables(): Promise<
  { table_id: string; table: number }[]
> {
  const res = await fetch(ERoute.HOST + ERoute.GET_TABLES, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.GET,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchOrderPanel(): Promise<TIdPresentOrdersTable> {
  const res = await fetch(ERoute.HOST + ERoute.GET_ORDER_TABLES, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.GET,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchOrderTablePanel({
  table_id,
}: {
  table_id: string;
}): Promise<TIdPresentOrderTable> {
  const res = await fetch(
    ERoute.HOST + ERoute.GET_ORDER_TABLES + `/${table_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.GET,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchOrderTable({
  table_id,
  list_order,
}: {
  table_id: string;
  list_order: { count: number; product_id: string }[];
}): Promise<{ submit: boolean }> {
  const res = await fetch(ERoute.HOST + ERoute.ORDER_TABLE + `/${table_id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.POST,
    body: JSON.stringify({ list_order }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchCreateTable({
  table_number,
}: {
  table_number: number;
}): Promise<{ create: boolean; table_id: string }> {
  const res = await fetch(
    ERoute.HOST + ERoute.CREATE_TABLE + `/${table_number}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.POST,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchDeleteTable({
  table_id,
}: {
  table_id: string;
}): Promise<{ delete: boolean }> {
  const res = await fetch(ERoute.HOST + ERoute.DELETE_TABLE + `/${table_id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.DELETE,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchStatusTable({
  table_id,
}: {
  table_id: string;
}): Promise<{ can_order: boolean }> {
  const res = await fetch(
    ERoute.HOST + ERoute.GET_STATUS_TABLE + `/${table_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.GET,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchAcceptStatusTable({
  table_id,
}: {
  table_id: string;
}): Promise<{ delete: boolean }> {
  const res = await fetch(
    ERoute.HOST + ERoute.ACCEPT_STATUS_TABLE + `/${table_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.POST,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchDeleteStatusTable({
  table_id,
}: {
  table_id: string;
}): Promise<{ delete: boolean }> {
  const res = await fetch(
    ERoute.HOST + ERoute.DELETE_STATUS_TABLE + `/${table_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.DELETE,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchEditableStatusTable({
  table_id,
}: {
  table_id: string;
}): Promise<{ change: boolean }> {
  const res = await fetch(
    ERoute.HOST + ERoute.EDITABLE_STATUS_TABLE + `/${table_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.PUT,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

//blog

export async function fetchCreateBlogPanel(): Promise<TCreateBlog> {
  const res = await fetch(ERoute.HOST + ERoute.CREATE_BLOG, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.POST,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchBlogsPanel(): Promise<TGetIdBlogs> {
  const res = await fetch(ERoute.HOST + ERoute.GET_LIST_BLOG, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.GET,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchBLog({
  blog_id,
}: {
  blog_id: string;
}): Promise<TGetIdBlog> {
  const res = await fetch(ERoute.HOST + ERoute.GET_BLOG + `/${blog_id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.GET,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchUpdateBlogPanel({
  blog_id,
  blog,
  meta_title,
  publish,
  short_description,
  src_banner,
  title,
}: TIdBlog): Promise<TGetIdBlogs> {
  const res = await fetch(ERoute.HOST + ERoute.UPDATE_BLOG + `/${blog_id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    method: EMethodRequest.PUT,
    body: JSON.stringify({
      blog,
      meta_title,
      publish,
      short_description,
      src_banner,
      title,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

type TProductMenu = {
  id: number;
  price: number;
  waiting: number;
  available: boolean;
  meta_title: string;
  meta_description: string;
  name: string;
  description: string;
  src: string;
};

type TProductsMenu = TProductMenu[];

type TIdProductMenu = TProductMenu & { product_id: string };

type TIdProductsMenu = TIdProductMenu[];

type TCategoryMenu = {
  category: string;
  icon: string;
  products: TProductsMenu;
};

type TIdCategoryMenu = {
  category_product_id: string;
  category: string;
  icon: string;
  products: TIdProductMenu[];
};

type TIdCategoriesMenu = TIdCategoryMenu[];

type TIdProductSearchMenu = TIdProductMenu & { rank: number; category: string };

type TIdProductsSearchMenu = TIdProductSearchMenu[];

type TIdFactorPresentOrder = {
  factor_present_order_id: string;
  count: number;
  products: TIdProductMenu;
};

type TIdPresentOrderTable = {
  present_order_table_id: string;
  table: number;
  busy: boolean;
  accept: boolean;
  factorPresentOrderTable: TIdFactorPresentOrder[];
};

type TIdPresentOrdersTable = TIdPresentOrderTable[];

type TCreateBlog = { create: boolean; id: string };

type TBlog = {
  publish: boolean;
  meta_title: string;
  short_description: string | null;
  title: string;
  src_banner: string | null;
  blog: string | null;
};

type TBlogs = TBlog[];

type TIdBlog = TBlog & { blog_id: string };

type TIdBlogs = TIdBlog[];

type TGetIdBlog = TIdBlog & { create_at: Date; update_at: Date };

type TGetIdBlogs = TGetIdBlog[];

type TSign = {
  national_code: string;
  phone: string;
  password: string;
};

type TLogin =
  | {
      login: false;
    }
  | {
      login: true;
      access_token: string;
      refresh_token: string;
    };

type TRefresh =
  | {
      refresh: false;
    }
  | {
      refresh: true;
      access_token: string;
      refresh_token: string;
    };

type TProfile = {
  name: string;
  family: string;
  profile: string;
};

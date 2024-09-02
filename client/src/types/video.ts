type TCardVideo = {
  id: number;
  name: string;
  link: string;
};

type TCategoryVideo = "aparat"

type TCardCategoryVideo = {
  category: TCategoryVideo;
  products: TCardVideo[];
};

type TCardsCategoryVideo = TCardCategoryVideo[];

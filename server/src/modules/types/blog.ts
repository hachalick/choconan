type TBlog = {
  meta_title: string;
  publish: boolean;
  short_description: string;
  title: string;
  src_banner: string;
  blog: string;
};

type TIdBlog = TBlog & { id: string };

type TContactUs = {
  name: string;
  href: string;
  content: string;
};
type TPlatform = {
  name: string;
  href: string;
  src: string;
};

export const CContactUs: TContactUs[] = [
  {
    name: "موبایل",
    href: "tel:09353790881",
    content: "09353790881",
  },
];
export const CPlatform: TPlatform[] = [
  {
    name: "واتساپ",
    href: "https://wa.me/989127017624",
    src: "/logo/whatsapp.png",
  },
  {
    name: "تلگرام",
    href: "https://t.me/choconanir",
    src: "/logo/telegram.png",
  },
  {
    name: "اینستاگرام",
    href: "https://instagram.com/choconan.ir",
    src: "/logo/instagram.png",
  },
];

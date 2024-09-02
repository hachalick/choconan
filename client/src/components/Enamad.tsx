import React, { ImgHTMLAttributes } from "react";

interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  code?: string;
}

interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  code?: string; // Adding the custom property
}

const CustomImage: React.FC<CustomImageProps> = ({ code, ...imgProps }) => {
  return <img {...imgProps} className="w-36 h-36"/>;
};

const ImageEnamad = () => (
  <CustomImage
    referrerPolicy="origin"
    src="https://trustseal.enamad.ir/logo.aspx?id=511447&Code=kiiUsZ6uHNqe9nxQPELriklLAxdteFnh"
    alt="enamad"
    code="kiiUsZ6uHNqe9nxQPELriklLAxdteFnh"
  />
);

export default function Enamad() {
  return (
    <a
      title="link enamd"
      referrerPolicy="origin"
      target="_blank"
      href="https://trustseal.enamad.ir/?id=511447&Code=kiiUsZ6uHNqe9nxQPELriklLAxdteFnh"
      rel="noopener"
    >
      <ImageEnamad />
    </a>
  );
}

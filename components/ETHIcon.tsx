import image from "../public/ETHIcon.png";
import Image from "next/image";

const ETHIcon = () => {
  return <Image src={image.src} height={50} />;
};

export default ETHIcon;

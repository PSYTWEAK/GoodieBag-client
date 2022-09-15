import image from "../public/logo.png";
import Image from "next/image";

const Logo = () => {
  return <Image src={image.src} height={150} />;
};

export default Logo;

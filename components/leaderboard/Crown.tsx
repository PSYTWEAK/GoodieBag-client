import image from "../../public/crown.png";
import Image from "next/image";

const Crown = () => {
  return <Image src={image.src} height={150} />;
};

export default Crown;

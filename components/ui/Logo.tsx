import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/image/favicon.png";

type TLogo = {
  isLink?: boolean;
  imageClassName?: string;
  parentClassName?: string;
  variant?: "sm" | "md";
};

const Logo = ({
  isLink = true,
  imageClassName,
  parentClassName,
  variant,
}: TLogo) => {
  return isLink ? (
    <Link
      href={"/"}
      className={`flex items-center select-none ${parentClassName}`}
    >
      <Image
        src={logo}
        alt="logo"
        width={32}
        height={32}
        className={`object-cover ${
          variant === "md" ? "max-sm:w-7" : variant === "sm" ? "max-sm:w-5" : ""
        } ${imageClassName}`}
      />
      <h2
        className={`text-3xl font-semibold  ${
          variant === "md"
            ? "max-sm:text-2xl"
            : variant === "sm"
            ? "max-sm:text-base"
            : ""
        }`}
      >
        oostBazaar
      </h2>
    </Link>
  ) : (
    <div className={`flex items-center select-none ${parentClassName}`}>
      <Image
        src={logo}
        alt="logo"
        width={32}
        height={32}
        className={`object-cover ${imageClassName}`}
      />
      <h2 className="text-3xl font-semibold">oostBazar</h2>
    </div>
  );
};

export default Logo;

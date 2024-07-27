import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { label: "Home", path: "#Home" },
    { label: "Services", path: "#Services" },
    { label: "FAQ", path: "#FAQ" },
    { label: "Contact", path: "#Contact" },
  ];

  const socialLinks = [
    { image: "/image/s1.png", link: "" },
    { image: "/image/s2.png", link: "" },
    { image: "/image/s3.png", link: "" },
    { image: "/image/s4.png", link: "" },
  ];

  return (
    <div className="bg-primary/5">
      <div className="container flex items-center justify-between border-b border-black/30 pb-8 pt-24 md:pt-32">
        <Image
          src={"/image/logo.png"}
          width={280}
          height={50}
          alt="logo"
          className="max-sm:w-28"
        />
        <div className="flex items-center gap-3 md:gap-9 h-fit">
          {navLinks.map((nav) => (
            <Link
              key={nav.label}
              href={nav.path}
              className={`block text-sm md:text-base`}
            >
              {nav.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="center gap-4 pt-10 2xl:pt-14 pb-8">
        {socialLinks?.map((link, i) => (
          <Link key={i} href={link.link}>
            <Image
              src={link.image}
              width={40}
              height={40}
              alt="logo"
              className="aspect-square"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;

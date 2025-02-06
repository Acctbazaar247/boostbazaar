import Image from "next/image";
import Link from "next/link";
import Logo from "../ui/Logo";
import { navLinks, socialLinks } from "./data";

const Footer = () => {
  return (
    <div data-aos="zoom-in" className="bg-primary/5">
      <div className="container flex items-center justify-between border-b border-black/30 pb-8 pt-24 md:pt-32">
        <Logo variant="sm" />
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
              width={25}
              height={25}
              alt="logo"
              className="aspect-square"
            />
          </Link>
        ))}
      </div>
      
      <p className="text-center text-sm md:text-base pb-2">Copyright © 2025 AcctPanel. All rights reserved.</p>
    </div>
  );
};

export default Footer;

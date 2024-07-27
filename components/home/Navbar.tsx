"use client";

import Image from "next/image";
import Link from "next/link";
import AppButton from "../ui/AppButton";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const navLinks = [
    { label: "Home", path: "#Home" },
    { label: "Services", path: "#Services" },
    { label: "FAQ", path: "#FAQ" },
    { label: "Contact", path: "#Contact" },
  ];
  return (
    <nav className="fixed top-10 left-0 w-full z-50">
      <header className="container bg-white rounded-xl py-4 px-11 flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/image/logo.png"}
            alt="logo"
            width={180}
            height={30}
            className="max-sm:w-3 object-cover"
          />
        </Link>
        <div className="flex items-center gap-3 md:gap-9">
          {navLinks.map((nav) => (
            <Link
              key={nav.label}
              onClick={() => setActiveTab(nav.label)}
              href={nav.path}
              className={`block font-medium text-sm md:text-lg ${
                nav.label === activeTab ? "text-primary" : "text-dark-grey"
              }`}
            >
              {nav.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <AppButton className="md:px-12" variant="outlined" label="Log in" />
          <AppButton label="Create Account" icon={<AiOutlineUser />} />
        </div>
      </header>
    </nav>
  );
};

export default Navbar;

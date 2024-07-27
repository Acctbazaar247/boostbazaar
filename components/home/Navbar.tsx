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
      <header className="w-11/12 mx-auto md:container bg-white rounded-lg md:rounded-xl py-4 px-2 md:px-11 flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/image/logo.png"}
            alt="logo"
            width={180}
            height={30}
            className="max-sm:w-16 object-cover"
          />
        </Link>
        <div className="flex items-center gap-2 md:gap-9">
          {navLinks.map((nav) => (
            <Link
              key={nav.label}
              onClick={() => setActiveTab(nav.label)}
              href={nav.path}
              className={`block font-light md:font-medium text-[10px] md:text-lg ${
                nav.label === activeTab ? "text-primary" : "text-dark-grey"
              }`}
            >
              {nav.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <AppButton
            className="max-sm:text-[8px] max-sm:leading-[9px] px-1 md:px-12"
            variant="outlined"
            label="Log in"
            href="/auth/sign-in"
          />
          <AppButton
            className="max-sm:text-[8px]  max-sm:leading-[9px] max-sm:px-1"
            label="Create Account"
            icon={<AiOutlineUser />}
            href="/auth/sign-up"
          />
        </div>
      </header>
    </nav>
  );
};

export default Navbar;

"use client";

import Image from "next/image";
import Link from "next/link";
import AppButton from "../ui/AppButton";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaBars } from "react-icons/fa6";
import { Drawer } from "antd";
import Logo from "../ui/Logo";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    { label: "Home", path: "#Home" },
    { label: "Services", path: "#Services" },
    { label: "FAQ", path: "#FAQ" },
    { label: "Contact", path: "#Contact" },
  ];

  return (
    <nav className="fixed top-0 md:top-10 left-0 w-full z-50">
      <header className="w-full md:container bg-white md:rounded-xl py-2.5 md:py-4 px-4 md:px-11 flex items-center justify-between">
        <Logo variant="sm" />
        <div className="max-sm:hidden flex items-center gap-2 md:gap-9">
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
        <div className="max-sm:hidden flex items-center gap-2 md:gap-4">
          <AppButton
            className=" md:px-12"
            variant="outlined"
            label="Log in"
            href="/auth/sign-in"
          />
          <AppButton
            className="px-6"
            label="Create Account"
            icon={<AiOutlineUser />}
            href="/auth/sign-up"
          />
        </div>

        <button
          onClick={() => setMobileMenu(true)}
          className="transition-all ml-auto mr-1 md:hidden flex justify-center items-center border border-black p-1 rounded"
        >
          <FaBars />
        </button>

        <div className="md:hidden">
          <Drawer
            width={300}
            title={<Logo variant="md" />}
            placement={"left"}
            closable={false}
            onClose={() => setMobileMenu(false)}
            open={mobileMenu}
          >
            <div className="space-y-2">
              {navLinks.map((nav) => (
                <Link
                  key={nav.label}
                  onClick={() => setActiveTab(nav.label)}
                  href={nav.path}
                  className={`block font-medium  md:text-lg ${
                    nav.label === activeTab ? "text-primary" : "text-dark-grey"
                  }`}
                >
                  {nav.label}
                </Link>
              ))}
              <AppButton
                className=" md:px-12"
                variant="outlined"
                label="Log in"
                href="/auth/sign-in"
              />
              <AppButton
                className="px-6"
                label="Create Account"
                icon={<AiOutlineUser />}
                href="/auth/sign-up"
              />
            </div>
          </Drawer>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;

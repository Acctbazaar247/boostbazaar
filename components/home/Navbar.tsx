"use client";

import Link from "next/link";
import AppButton from "../ui/AppButton";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaBars } from "react-icons/fa6";
import { Avatar, Drawer } from "antd";
import Logo from "../ui/Logo";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  logOut,
  selectCurrentUser,
  setTheme,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { LuLogOut, LuUser2 } from "react-icons/lu";
import { FiMoon, FiSun } from "react-icons/fi";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const { theme } = useAppSelector((state) => state.auth);

  const navLinks = [
    { label: "Home", path: "#Home" },
    { label: "Services", path: "#Services" },
    { label: "FAQ", path: "#FAQ" },
    { label: "Contact", path: "#Contact" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav className="fixed top-0 md:top-10 left-0 w-full z-50">
      <header className="w-full md:container bg-white md:rounded-xl py-2.5 md:py-4 px-4 md:px-11 flex items-center justify-between">
        <Logo variant="sm" />
        <div className="max-sm:hidden flex items-center gap-2 md:gap-9">
          {navLinks.map((nav) =>
            nav.label === "Dashboard" ? (
              token && (
                <Link
                  key={nav.label}
                  onClick={() => setActiveTab(nav.label)}
                  href={user?.role === "admin" ? "/admin-dashboard" : nav.path}
                  className={`block font-light md:font-medium text-[10px] md:text-lg ${
                    nav.label === activeTab ? "text-primary" : "text-dark-grey"
                  }`}
                >
                  {nav.label}
                </Link>
              )
            ) : (
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
            )
          )}

          <button
            className="bg-grey hover:bg-black/10 size-10 rounded-full flex items-center justify-center"
            onClick={() =>
              dispatch(setTheme(theme === "light" ? "dark" : "light"))
            }
          >
            {theme === "light" ? (
              <FiMoon className="text-xl block" />
            ) : (
              <FiSun className="text-xl block" />
            )}
          </button>
        </div>
        <div className="max-sm:hidden flex items-center gap-2 md:gap-4">
          {token && user ? (
            <div className="flex items-center gap-1">
              <Avatar icon={<LuUser2 />} size={"large"} src={user.profileImg} />
              <p className="text-lg font-medium">{user?.name}</p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* this is for mobile drawaer  */}
        <button
          onClick={() => setMobileMenu(true)}
          className="transition-all ml-auto mr-1 md:hidden flex justify-center items-center border border-black p-1 rounded"
        >
          <FaBars />
        </button>

        <Drawer
          width={300}
          className="md:hidden"
          title={<Logo variant="md" />}
          placement={"left"}
          closable={false}
          onClose={() => setMobileMenu(false)}
          open={mobileMenu}
        >
          <div className="space-y-2">
            {navLinks.map((nav) =>
              nav.label === "Dashboard" ? (
                token && (
                  <Link
                    key={nav.label}
                    onClick={() => setActiveTab(nav.label)}
                    href={
                      user?.role === "admin" ? "/admin-dashboard" : nav.path
                    }
                    className={`block font-medium  md:text-lg ${
                      nav.label === activeTab
                        ? "text-primary"
                        : "text-dark-grey"
                    }`}
                  >
                    {nav.label}
                  </Link>
                )
              ) : (
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
              )
            )}
            {token && user ? (
              <button
                onClick={() => dispatch(logOut())}
                className="flex items-center gap-1 text-red text-lg"
              >
                <LuLogOut />
                Log out
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </Drawer>
      </header>
    </nav>
  );
};

export default Navbar;

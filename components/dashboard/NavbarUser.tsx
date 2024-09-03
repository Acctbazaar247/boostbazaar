"use client";

import {
  logOut,
  selectCurrentUser,
  setTheme
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Avatar, Drawer } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiMessageAltEdit } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import { LuLogOut, LuUser2 } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
import { PiCardholderDuotone, PiUserList } from "react-icons/pi";
import { RiHistoryFill } from "react-icons/ri";
import { SiReverbnation } from "react-icons/si";
import { VscUngroupByRefType } from "react-icons/vsc";
import Logo from "../ui/Logo";
import { FiMoon, FiSun } from "react-icons/fi";

const NavbarUser = () => {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    {
      label: "Order",
      icon: <MdAddShoppingCart />,
      path: "/dashboard"
    },
    {
      label: "Fund",
      icon: <PiCardholderDuotone />,
      path: "/dashboard/fund"
    },
    {
      label: "History",
      icon: <RiHistoryFill />,
      path: "/dashboard/history"
    },
    {
      label: "Profile",
      icon: <PiUserList />,
      path: "/dashboard/profile"
    },
    {
      label: "Complain",
      icon: <BiMessageAltEdit />,
      path: "/dashboard/complain"
    },
    {
      label: "Refer",
      icon: <VscUngroupByRefType />,
      path: "/dashboard/refer"
    },
    {
      label: "Review",
      icon: <SiReverbnation />,
      path: "/dashboard/review"
    }
  ];

  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.auth.theme);

  return (
    <section className="py-4 bg-primary/5 max-md:px-4">
      <div className="md:w-11/12 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar icon={<LuUser2 />} size={"large"} src={user?.profileImg} />
          <span>Hello</span>
          <p className="text-lg font-medium capitalize">{user?.name}</p>
        </div>
        <div className="max-xl:hidden flex items-center gap-5 2xl:gap-5">
          {navLinks.map((nav) => (
            <Link
              href={nav.path}
              key={nav.label}
              className={`flex items-center gap-4 bg-white px-2 py-1 shadow rounded-md cursor-pointer ${
                pathname === nav.path && "text-primary bg-primary/10"
              }`}
            >
              {nav.label}{" "}
              <h1 className="bg-primary rounded p-1 text-white">{nav.icon}</h1>
            </Link>
          ))}
        </div>
        <button
          onClick={() => dispatch(logOut())}
          className="max-xl:hidden flex items-center gap-1 text-red text-lg"
        >
          <LuLogOut />
          Log out
        </button>

        {/* <button
          onClick={() => setMobileMenu(true)}
          className="transition-all ml-auto mr-1 md:hidden flex justify-center items-center border border-black p-1 rounded"
        >
          <FaBars />
        </button> */}
        {/* this is for mobile drawaer  */}
        <div className="xl:hiddden flex items-center gap-3">
          <button
            className="xl:hdidden bg-grey hover:bg-black/10 size-7 rounded-full flex items-center justify-center"
            onClick={() =>
              dispatch(setTheme(theme === "light" ? "dark" : "light"))
            }
          >
            {theme === "light" ? (
              <FiMoon className="text-sm" />
            ) : (
              <FiSun className="text-sm" />
            )}
          </button>

          <button
            onClick={() => setMobileMenu(true)}
            className="transition-all ml-auto mr-1 xl:hidden flex justify-center items-center border border-black p-1 rounded"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* this is for mobile drawaer  */}
      <Drawer
        width={300}
        className="md:hidden"
        // title={<Logo variant="md" />}
        placement={"left"}
        closable={false}
        onClose={() => setMobileMenu(false)}
        open={mobileMenu}
      >
        <div className="space-y-2 max-sm:pt-14">
          <Avatar size={"large"} src={user?.profileImg} />
          <p className="text-lg font-medium capitalize">
            <span className="text-dark-grey">Hello</span> {user?.name} !
          </p>
          <p className="pb-8">{user?.email}</p>
          {navLinks.map((nav) => (
            <Link
              href={nav.path}
              onClick={() => setMobileMenu(false)}
              key={nav.label}
              className={`flex items-center gap-4 md:bg-white md:px-4 py-1.5 md:py-2 md:shadow rounded-md ${
                pathname === nav.path && "text-primary md:bg-primary/10"
              }`}
            >
              <span className="md:bg-primary rounded md:p-1 text-black text-lg">
                {nav.icon}
              </span>{" "}
              {nav.label}
            </Link>
          ))}

          <button
            onClick={() => dispatch(logOut())}
            className="text-red w-full flex items-center gap-4 md:bg-white md:px-4 py-1.5 md:py-2 md:shadow rounded-md"
          >
            <LuLogOut className="text-lg" />
            Log out
          </button>
        </div>
      </Drawer>
    </section>
  );
};

export default NavbarUser;

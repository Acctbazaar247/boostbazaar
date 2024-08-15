"use client";

import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
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

const NavbarUser = () => {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    {
      label: "Order",
      icon: <MdAddShoppingCart />,
      path: "/dashboard",
    },
    {
      label: "Fund",
      icon: <PiCardholderDuotone />,
      path: "/dashboard/fund",
    },
    {
      label: "History",
      icon: <RiHistoryFill />,
      path: "/dashboard/history",
    },
    {
      label: "Profile",
      icon: <PiUserList />,
      path: "/dashboard/profile",
    },
    {
      label: "Complain",
      icon: <BiMessageAltEdit />,
      path: "/dashboard/complain",
    },
    {
      label: "Refer",
      icon: <VscUngroupByRefType />,
      path: "/dashboard/refer",
    },
    {
      label: "Review",
      icon: <SiReverbnation />,
      path: "/dashboard/review",
    },
  ];

  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  return (
    <section className="py-4 bg-primary/5 max-md:px-4">
      <div className="md:w-11/12 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar icon={<LuUser2 />} size={"large"} src={user?.profileImg} />
          <span>Hello</span>
          <p className="text-lg font-medium capitalize">{user?.name}</p>
        </div>
        <div className="max-md:hidden flex items-center gap-8 2xl:gap-10">
          {navLinks.map((nav) => (
            <Link
              href={nav.path}
              key={nav.label}
              className={`flex items-center gap-4 bg-white px-4 py-2 shadow rounded-md ${
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
          className="max-md:hidden flex items-center gap-1 text-red text-lg"
        >
          <LuLogOut />
          Log out
        </button>

        <button
          onClick={() => setMobileMenu(true)}
          className="transition-all ml-auto mr-1 md:hidden flex justify-center items-center border border-black p-1 rounded"
        >
          <FaBars />
        </button>
      </div>

      {/* this is for mobile drawaer  */}
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
          {navLinks.map((nav) => (
            <Link
              href={nav.path}
              onClick={() => setMobileMenu(false)}
              key={nav.label}
              className={`flex items-center gap-4 bg-white px-4 py-2 shadow rounded-md ${
                pathname === nav.path && "text-primary bg-primary/10"
              }`}
            >
              <span className="bg-primary rounded p-1 text-white">
                {nav.icon}
              </span>{" "}
              {nav.label}
            </Link>
          ))}

          <button
            onClick={() => dispatch(logOut())}
            className="text-red w-full flex items-center gap-4 bg-white px-4 py-2 shadow rounded-md"
          >
            <LuLogOut />
            Log out
          </button>
        </div>
      </Drawer>
    </section>
  );
};

export default NavbarUser;

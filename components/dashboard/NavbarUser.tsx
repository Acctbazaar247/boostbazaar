"use client";

import { Avatar } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
import { PiCardholderDuotone, PiUserList } from "react-icons/pi";
import { RiHistoryFill } from "react-icons/ri";
import { SiReverbnation } from "react-icons/si";
import { VscUngroupByRefType } from "react-icons/vsc";

const NavbarUser = () => {
  const pathname = usePathname();

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

  return (
    <section className="py-4 bg-primary/5">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar size={"large"} src="/image/ai1.png" />
          <span>Hello</span>
          <p className="text-lg font-medium">Rakibul Hasan!</p>
        </div>
        <div className="flex items-center gap-8 2xl:gap-10">
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
        <button className="flex items-center gap-1 text-red text-lg">
          <LuLogOut />
          Log out
        </button>
      </div>
    </section>
  );
};

export default NavbarUser;

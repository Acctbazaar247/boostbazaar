"use client";

import { TbMessage } from "react-icons/tb";
import Logo from "../ui/Logo";
import { Avatar, Drawer } from "antd";
import { LuUser2 } from "react-icons/lu";
import { VscBell } from "react-icons/vsc";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import Sidebar from "./Sidebar";

const NavbarDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <section className="bg-white drop-shadow py-3 max-md:px-4">
      <div className="md:w-11/12 mx-auto flex items-center justify-between">
        <Logo variant="md" />
        <div className="hidden">
          <input type="text" />
        </div>
        <div className="flex items-center gap-8 max-md:hidden">
          <TbMessage className="text-2xl text-black/80 cursor-pointer" />
          <VscBell className="text-2xl text-black/80 cursor-pointer" />
          <Avatar icon={<LuUser2 />} size={"large"} />
        </div>

        <button
          onClick={() => setMobileMenu(true)}
          className="transition-all ml-auto mr-1 md:hidden flex justify-center items-center border border-black p-1 rounded"
        >
          <FaBars />
        </button>
      </div>

      {/* this is for mobile devices */}
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
          <div className="flex items-center gap-2">
            <Avatar size={"small"} src={user?.profileImg} />
            <p className="text-lg font-medium capitalize">{user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <TbMessage className="text-2xl text-black/80 cursor-pointer" />
            <p className="text-lg font-medium capitalize">Message</p>
          </div>
          <div className="flex items-center gap-2">
            <VscBell className="text-2xl text-black/80 cursor-pointer" />
            <p className="text-lg font-medium capitalize">Notifications</p>
          </div>
          <Sidebar className="shadow-none px-1 py-0 text-lg font-medium" />
        </div>
      </Drawer>
    </section>
  );
};

export default NavbarDashboard;

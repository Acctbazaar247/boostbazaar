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
import AppButton from "../ui/AppButton";

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
          <Avatar src={user?.profileImg} icon={<LuUser2 />} size={"large"} />
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

          <Sidebar className="shadow-none md:px-1 py-0 text-base md:text-lg md:font-medium" />
        </div>
      </Drawer>
    </section>
  );
};

export default NavbarDashboard;

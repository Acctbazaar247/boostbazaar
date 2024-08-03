import { TbMessage } from "react-icons/tb";
import Logo from "../ui/Logo";
import { HiOutlineBell } from "react-icons/hi";
import { Avatar } from "antd";
import { LuUser2 } from "react-icons/lu";
import { VscBell } from "react-icons/vsc";

const NavbarDashboard = () => {
  return (
    <section className="bg-white drop-shadow py-3">
      <div className=" w-11/12 mx-auto flex items-center justify-between">
        <Logo variant="md" />
        <div className="">
          <input type="text" />
        </div>
        <div className="flex items-center gap-8">
          <TbMessage className="text-2xl text-black/80 cursor-pointer" />
          <VscBell className="text-2xl text-black/80 cursor-pointer" />
          <Avatar icon={<LuUser2 />} size={"large"} />
        </div>
      </div>
    </section>
  );
};

export default NavbarDashboard;

"use client";

import ProfileForm from "@/components/dashboard/ProfileForm";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";

const Page = () => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <AnimationWrapper className="py-12 container">
      <h1 className="heading">Profile</h1>
      <div className="flex gap-10 justify-between py-6">
        <div className="w-fit border border-primary rounded-2xl p-5">
          <Image
            src={"/image/camera.png"}
            alt="camera icon"
            width={120}
            height={120}
            className="size-40 bg-cover rounded-full cursor-pointer"
          />
        </div>
        <div className="w-10/12 border border-primary flex flex-col justify-evenly p-5 rounded-2xl">
          <p className="text-lg">
            <span className="text-2xl font-medium">Name: </span>
            {user?.name}
          </p>
          <p className="text-lg">
            <span className="text-2xl font-medium">Email: </span>
            {user?.email}
          </p>
          <p className="text-lg">
            <span className="text-2xl font-medium">Status: </span>Online
          </p>
        </div>
      </div>
      <ProfileForm />
    </AnimationWrapper>
  );
};

export default Page;

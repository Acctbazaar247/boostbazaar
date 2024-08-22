"use client";

import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { useSendInvitationMutation } from "@/redux/features/dashboard/dashboardApi";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [sendTo, setSendTo] = useState("");
  const [sendInvitation, { isLoading, isSuccess }] =
    useSendInvitationMutation();

  const handleSendToChange = async () => {
    if (!sendTo) {
      toast.error("Please enter your friend email address", { toastId: 1 });
    }
    await sendInvitation({ sendTo })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((res) => {
        toast.error(res?.data?.message);
      });
  };

  useEffect(() => {
    if (isSuccess) {
      setSendTo("");
    }
  }, [isSuccess]);

  return (
    <AnimationWrapper className="container py-20">
      <h1 className="heading text-center">Referrals</h1>

      <p className="text-xl text-dark-grey/80 text-center">
        Love in sharing, refer your friends.
      </p>

      <div className="my-12 rounded-2xl border border-primary p-4 md:p-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Friends e-mail</h3>
          <div className="grid grid-cols-12">
            <input
              onChange={(e) => setSendTo(e.target.value)}
              type="text"
              placeholder="Enter your friend email address"
              className={cn("block col-span-10 input-box rounded-r-none pl-4")}
            />
            <button
              disabled={isLoading}
              onClick={handleSendToChange}
              className="w-full bg-primary hover:bg-primary/90 md:text-xl col-span-2 text-white rounded-r-lg"
            >
              Send
            </button>
          </div>
        </div>

        <hr className="border-primary/50 my-12" />
        <div className="flex items-center justify-between">
          <button className="flex gap-1 items-center justify-center flex-col">
            <Image width={40} height={40} src={"/image/copy.png"} alt="image" />
            <p className="md:text-lg font-medium">copy</p>
          </button>
          <button className="flex gap-1 items-center justify-center flex-col">
            <Image width={40} height={40} src={"/image/s2.png"} alt="image" />
            <p className="md:text-lg font-medium">Share</p>
          </button>
          <button className="flex gap-1 items-center justify-center flex-col">
            <Image width={40} height={40} src={"/image/s3.png"} alt="image" />
            <p className="md:text-lg font-medium">Tweet</p>
          </button>
          <button className="flex gap-1 items-center justify-center flex-col">
            <Image width={40} height={40} src={"/image/s4.png"} alt="image" />
            <p className="md:text-lg font-medium">Post</p>
          </button>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default Page;

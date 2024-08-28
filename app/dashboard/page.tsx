"use client";

import {
  servicesCategory,
  servicesData
} from "@/components/dashboard/dashboardData";
import NewOrderForm from "@/components/dashboard/NewOrderForm";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import {
  useGetMainBalanceQuery,
  useGetServicesQuery,
  useGetSpendHistoryQuery
} from "@/redux/features/dashboard/dashboardApi";
import {
  setCategorizedService,
  setCategory,
  setService
} from "@/redux/features/dashboard/serviceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { CategorizedService } from "@/types";
import { categorizeServices } from "@/utils/categorizedArray";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { FaNairaSign } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

const Page = () => {
  const dispatch = useAppDispatch();
  const marqueTexts = [
    "We are thrilled to announce to our july customers who purchased our service above ",
    "We are thrilled to announce to our july customers who purchased our service above ",
    "We are thrilled to announce to our july customers who purchased our service above "
  ];

  const { data: balance } = useGetMainBalanceQuery("");
  const { data: spendData } = useGetSpendHistoryQuery("");

  const { services } = useAppSelector((store) => store.service);
  const { data, isSuccess, refetch } = useGetServicesQuery("", {
    skip: services.length > 0
  });

  useEffect(() => {
    if (data) {
      console.log("set again");
      dispatch(setService(data?.data));
    }
    if (services?.length === 0) {
      refetch();
      console.log("refetch now");
    }
  }, [isSuccess, data]);

  return (
    <AnimationWrapper>
      <Marquee
        speed={40}
        direction="right"
        className="w-fit bg-primary/5 my-10 md:my-16 py-3 text-sm"
        autoFill={true}
      >
        {marqueTexts.map((text, i) => (
          <p key={text + i} className=" flex items-center gap-1 pl-12">
            <GoDotFill />
            {text}
          </p>
        ))}
      </Marquee>

      <div className="container">
        <div className="grid md:grid-cols-2 gap-5 md:gap-20">
          <div className="border border-primary/50 bg-primary/10 p-5 space-y-5 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-dark-grey">Main balance</h3>
              <Link
                href={"/dashboard/fund"}
                className="bg-white text-primary font-light rounded px-2 py-1"
              >
                Add funds
              </Link>
            </div>
            <h1 className="text-2xl text-black/80 font-bold flex items-center gap-1">
              <FaNairaSign />
              {balance?.data?.amount.toFixed(2)}
            </h1>
          </div>

          {/* fund 2 */}
          <div className="border border-primary/50 bg-primary/10 p-5 space-y-5 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-dark-grey">Spend</h3>
              <Link
                href={"/dashboard/history"}
                className="bg-white text-primary font-light rounded px-2 py-1"
              >
                History
              </Link>
            </div>
            <h1 className="text-2xl text-black/80 font-bold flex items-center gap-1">
              <FaNairaSign />
              {spendData?.data?.spend}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-10 pt-10 md:pt-20">
          {servicesData.map((service, i) => (
            <Link
              key={i}
              href={"/dashboard/#new-order-form"}
              onClick={() => dispatch(setCategory(service.title))}
              className="bg-white flex justify-center p-5 items-center gap-3 hover:bg-primary/10 cursor-pointer drop-shadow-md border border-primary/50 rounded-lg text-center"
            >
              {/* <div className="relative">
                <Image
                  src={service.image}
                  width={400}
                  height={180}
                  alt="logo"
                  className="w-full h-auto"
                />
              </div> */}
              {<service.icon className="text-3xl"></service.icon>}
              <h3 className="text-base md:text-2xl  ">{service.title}</h3>
            </Link>
          ))}
        </div>

        <NewOrderForm />
      </div>
    </AnimationWrapper>
  );
};

export default Page;

"use client";

import AnimationWrapper from "@/components/ui/AnimationWrapper";
import AppModal from "@/components/ui/AppModal";
import AppTable from "@/components/ui/AppTable";
import AppTabs from "@/components/ui/AppTabs";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetCurrencyRequestQuery,
  useGetDepositHistoryQuery,
  useGetOrdersQuery,
  useGetTicketsQuery,
} from "@/redux/features/dashboard/dashboardApi";
import { useAppSelector } from "@/redux/hook";
import { cn } from "@/utils/cn";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { useState } from "react";

const Page = () => {
  const user = useAppSelector(selectCurrentUser);
  const tabs = [
    { label: "Order", value: "order" },
    { label: "Deposit", value: "deposit" },
  ];
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const orderQuery = useGetOrdersQuery(user?.id);
  const depositQuery = useGetCurrencyRequestQuery(user?.id);

  const orderColumns = [
    {
      title: "Id",
      dataIndex: "id",
      className: "md:min-w-[150px]",
      render: (id: any, record: any) => {
        return <p>{id}</p>;
      },
    },
    {
      title: "Category",
      dataIndex: "accountCategory",
      className: "min-w-[130px] md:min-w-[150px]",
    },
    {
      title: "Link",
      dataIndex: "link",
      className: "min-w-[120px] md:min-w-[145px]",
    },
    {
      title: "Service ID",
      dataIndex: "japServiceId",
      className: "min-w-[120px] md:min-w-[145px]",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      className: "min-w-[120px] md:min-w-[145px]",
    },
    {
      title: "Charge",
      dataIndex: "charge",
      className: "min-w-[120px] md:min-w-[145px]",
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[120px] md:min-w-[145px]",
    },
  ];

  const depositColumns = [
    {
      title: "Id",
      dataIndex: "id",
      className: "md:min-w-[150px]",
      render: (id: any, record: any) => {
        return <p>{id}</p>;
      },
    },
    {
      title: "Own By Id",
      dataIndex: "ownById",
      className: "min-w-[130px] md:min-w-[150px]",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      className: "min-w-[120px] md:min-w-[145px]",
      render: (id: any, record: any) => {
        return <p className="text-center">{id?.toFixed(2)}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[120px] md:min-w-[145px] text-center",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   className: "md:min-w-[150px]",
    //   render: (status: string) => {
    //     return (
    //       <div className={`flex items-center gap-1`}>
    //         <span
    //           className={cn(
    //             "text-white rounded-full px-3",
    //             status === "open" && "bg-primary",
    //             status === "closed" && "bg-[#71717A80]",
    //             status === "solved" && "bg-[#058803]"
    //           )}
    //         >
    //           {status}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <AnimationWrapper className="container py-12">
      <h1 className="heading pb-4 md:pb-10">History</h1>
      <AppTabs
        className="!text-xl"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <span className="block pt-5"></span>
      <AppTable
        setPage={setPage}
        columns={activeTab === "deposit" ? depositColumns : orderColumns}
        infoQuery={activeTab === "deposit" ? depositQuery : orderQuery}
      />
    </AnimationWrapper>
  );
};

export default Page;

"use client";

import AppModal from "@/components/ui/AppModal";
import AppTable from "@/components/ui/AppTable";
import AppTabs from "@/components/ui/AppTabs";
import { useGetTicketsQuery } from "@/redux/features/dashboard/dashboardApi";
import { cn } from "@/utils/cn";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { useState } from "react";

const Page = () => {
  const tabs = [
    { label: "Tickets", value: "tickets" },
    { label: "Opened", value: "opened" },
    { label: "Solved", value: "solved" },
    { label: "Closed", value: "closed" },
  ];
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const ticketQuery = useGetTicketsQuery("");

  const columns = [
    {
      title: "Complaint",
      dataIndex: "ownBy",
      className: "md:min-w-[150px]",
      render: (ownBy: any, record: any) => {
        return (
          <div className="flex items-center gap-1">
            <img
              src={ownBy?.profileImg}
              alt=""
              className="rounded-full w-10 h-10"
            />
            <div className="text-dark-grey">
              <h3 className=" text-lg">{ownBy?.name}</h3>
              <p>{ownBy?.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Subject",
      dataIndex: "subject",
      className: "min-w-[130px] md:min-w-[150px]",
    },
    {
      title: "Details",
      dataIndex: "message",
      className: "min-w-[120px] md:min-w-[145px]",
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "md:min-w-[150px]",
      render: (status: string) => {
        return (
          <div className={`flex items-center gap-1`}>
            <span
              className={cn(
                "text-white rounded-full px-3",
                status === "open" && "bg-primary",
                status === "closed" && "bg-[#71717A80]",
                status === "solved" && "bg-[#058803]"
              )}
            >
              {status}
            </span>
          </div>
        );
      },
    },
    {
      title: "Last Message",
      dataIndex: "createdAt",
      className: "min-w-[120px] md:min-w-[100px]",
      render: (createdAt: string) => {
        return (
          <div className={`flex items-center gap-1 justify-center`}>
            {getTimeAgo(createdAt)} ago
          </div>
        );
      },
    },
  ];

  return (
    <div className="">
      <h1 className="heading pb-4 md:pb-10">Tickets</h1>
      <AppTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <AppTable setPage={setPage} columns={columns} infoQuery={ticketQuery} />
    </div>
  );
};

export default Page;

"use client";

import AppTable from "@/components/ui/AppTable";
import { useGetTicketsQuery } from "@/redux/features/dashboard/dashboardApi";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: "Complaint",
      dataIndex: "ownBy",
      className: "min-w-[150px]",
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
      className: "min-w-[150px]",
    },
    {
      title: "Details",
      dataIndex: "message",
      className: "min-w-[145px]",
    },
  ];

  const ticketQuery = useGetTicketsQuery("");

  return (
    <div className="">
      <h1 className="heading pb-10">Customers</h1>
      <AppTable setPage={setPage} columns={columns} infoQuery={ticketQuery} />
    </div>
  );
};

export default Page;

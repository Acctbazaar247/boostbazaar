"use client";

import AppTable from "@/components/ui/AppTable";
import { useGetUsersQuery } from "@/redux/features/auth/authApi";
import { useGetTicketsQuery } from "@/redux/features/dashboard/dashboardApi";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "min-w-[150px]",
      render: (name: any, record: any) => {
        return (
          <div className="flex items-center gap-1">
            <img
              src={record?.profileImg}
              alt=""
              className="rounded-full w-10 h-10"
            />
            <div className="text-dark-grey">
              <h3 className=" text-lg">{name}</h3>
              <p>{record?.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      className: "min-w-[150px]",
    },
    {
      title: "Amount",
      dataIndex: "Currency",
      className: "min-w-[145px]",
      render: (Currency: any) => (
        <div className="flex items-center gap-1 justify-center">
          {Currency?.amount}
        </div>
      ),
    },
  ];

  const userQuery = useGetUsersQuery("");

  return (
    <div className="">
      <h1 className="heading pb-10">Customers</h1>
      <AppTable setPage={setPage} columns={columns} infoQuery={userQuery} />
    </div>
  );
};

export default Page;

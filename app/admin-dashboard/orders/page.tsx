"use client";

import AppTable from "@/components/ui/AppTable";
import { useGetOrdersQuery } from "@/redux/features/dashboard/dashboardApi";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: "jap OrderId",
      dataIndex: "japOrderId",
      className: "min-w-[150px]",
    },
    {
      title: "orderBy",
      dataIndex: "orderBy",
      className: "min-w-[150px]",
      render: (orderBy: any, record: any) => {
        return (
          <div className="flex items-center gap-1">
            <img
              src={orderBy?.profileImg}
              alt=""
              className="rounded-full w-10 h-10"
            />
            <div className="text-dark-grey">
              <h3 className=" text-lg">{orderBy?.name}</h3>
            </div>
          </div>
        );
      },
    },
    {
      title: "Charge",
      dataIndex: "charge",
      className: "min-w-[150px]",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      className: "min-w-[150px]",
    },
    {
      title: "Link",
      dataIndex: "link",
      className: "min-w-[150px]",
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[150px]",
    },
    // {
    //   title: "Amount",
    //   dataIndex: "Currency",
    //   className: "min-w-[145px]",
    //   render: (Currency: any) => (
    //     <div className="flex items-center gap-1 justify-center">
    //       {Currency?.amount}
    //     </div>
    //   ),
    // },
  ];

  const userQuery = useGetOrdersQuery("");

  return (
    <div className="">
      <h1 className="heading pb-10">Orders</h1>
      <AppTable setPage={setPage} columns={columns} infoQuery={userQuery} />
    </div>
  );
};

export default Page;

"use client";

import AppTable from "@/components/ui/AppTable";
import { useGetableOrdersQuery } from "@/redux/features/dashboard/dashboardApi";
import Image from "next/image";
import { useMemo, useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);

  const queryString = useMemo(() => {
    const info = {
      page
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page]);

  const columns = [
    {
      title: "OrderId",
      dataIndex: "japOrderId",
      className: "min-w-[120px]"
    },
    {
      title: "Service Id",
      dataIndex: "japServiceId",
      className: "min-w-[120px]"
    },
    {
      title: "orderBy",
      dataIndex: "orderBy",
      className: "min-w-[180px]",
      render: (orderBy: any, record: any) => {
        return (
          <div className="flex items-center gap-1">
            <Image
              src={orderBy?.profileImg}
              alt=""
              width={40}
              height={40}
              className="rounded-full size-8"
            />
            <div className="text-dark-grey">
              <h3 className="">{orderBy?.name}</h3>
              <h3 className="">{orderBy?.email}</h3>
            </div>
          </div>
        );
      }
    },
    {
      title: "Charge",
      dataIndex: "charge",
      className: "min-w-[90px]"
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      className: "min-w-[90px]"
    },
    {
      title: "Link",
      dataIndex: "link",
      className: "min-w-[100px]"
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[100px]"
    }
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

  const userQuery = useGetableOrdersQuery(queryString);

  return (
    <div className="">
      <h1 className="heading pb-10">Orders</h1>
      <AppTable setPage={setPage} columns={columns} infoQuery={userQuery} />
    </div>
  );
};

export default Page;

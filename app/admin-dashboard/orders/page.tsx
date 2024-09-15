"use client";

import AppInput from "@/components/ui/AppInput";
import AppTable from "@/components/ui/AppTable";
import { useGetableOrdersQuery } from "@/redux/features/dashboard/dashboardApi";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Page = () => {
  const [page, setPage] = useState(1);
  const [orderById, setOrderById] = useState("");
  const [email, setEmail] = useState("");
  const [japServiceId, setJapServiceId] = useState("");
  const [japOrderId, setJapOrderId] = useState("");

  const queryString = useMemo(() => {
    const info = {
      page,
      orderById: orderById.length ? orderById : undefined,
      email: email.length ? email : undefined,
      japServiceId: japServiceId.length ? japServiceId : undefined,
      japOrderId: japOrderId.length ? japOrderId : undefined,
    };

    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [email, japOrderId, japServiceId, orderById, page]);

  const columns = [
    {
      title: "jap OrderId",
      dataIndex: "japOrderId",
      className: "min-w-[120px]",
    },
    {
      title: "jap Service Id",
      dataIndex: "japServiceId",
      className: "min-w-[120px]",
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
      },
    },
    {
      title: "Charge",
      dataIndex: "charge",
      className: "min-w-[90px]",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      className: "min-w-[90px]",
    },
    {
      title: "Link",
      dataIndex: "link",
      className: "min-w-[100px]",
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[100px]",
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

  const userQuery = useGetableOrdersQuery(queryString);

  return (
    <div className="">
      <h1 className="heading pb-10">Orders</h1>
      <div className="grid  md:grid-cols-4 gap-1 md:gap-5">
        <AppInput
          placeholder="Search By JAP Service ID"
          type="text"
          icon={<IoSearch />}
          setValue={(e) => setJapServiceId(e?.target?.value)}
        />
        <AppInput
          placeholder="Search By JAP Order ID"
          type="text"
          icon={<IoSearch />}
          setValue={(e) => setJapOrderId(e?.target?.value)}
        />
        <AppInput
          placeholder="Search By Email"
          type="text"
          icon={<IoSearch />}
          setValue={(e) => setEmail(e?.target?.value)}
        />
        <AppInput
          placeholder="Search By Order ID"
          type="text"
          icon={<IoSearch />}
          setValue={(e) => setOrderById(e?.target?.value)}
        />
      </div>
      <AppTable setPage={setPage} columns={columns} infoQuery={userQuery} />
    </div>
  );
};

export default Page;

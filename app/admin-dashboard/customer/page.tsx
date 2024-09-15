"use client";

import AppInput from "@/components/ui/AppInput";
import AppTable from "@/components/ui/AppTable";
import { useGetUsersQuery } from "@/redux/features/auth/authApi";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const Page = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const queryString = useMemo(() => {
    const info = {
      page,
      searchTerm: search.length ? search : undefined
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page, search]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "min-w-[150px]",
      render: (name: any, record: any) => {
        return (
          <div className="flex items-center gap-1">
            <Image
              src={record?.profileImg}
              alt=""
              width={40}
              height={40}
              className="rounded-full w-10 h-10"
            />
            <div className="text-dark-grey">
              <h3 className=" text-lg">{name}</h3>
              <p>{record?.email}</p>
            </div>
          </div>
        );
      }
    },
    {
      title: "Role",
      dataIndex: "role",
      className: "min-w-[150px]"
    },
    {
      title: "Amount",
      dataIndex: "Currency",
      className: "min-w-[145px]",
      render: (Currency: any) => (
        <div className="flex items-center gap-1 justify-center">
          <FaDollarSign></FaDollarSign> {Currency?.amount?.toFixed(2)}
        </div>
      )
    }
  ];

  const userQuery = useGetUsersQuery(queryString);

  return (
    <div className="">
      <h1 className="heading pb-10">Customers</h1>

      <AppInput
        className="lg:w-1/3"
        placeholder="Search By Email or name"
        type="text"
        icon={<IoSearch />}
        setValue={(e) => setSearch(e?.target?.value)}
      />

      <AppTable setPage={setPage} columns={columns} infoQuery={userQuery} />
    </div>
  );
};

export default Page;

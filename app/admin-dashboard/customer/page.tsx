"use client";

import AppInput from "@/components/ui/AppInput";
import AppModal from "@/components/ui/AppModal";
import AppTable from "@/components/ui/AppTable";
import { useGetUsersQuery } from "@/redux/features/auth/authApi";
import {
  useDeleteUserMutation,
  useEditUserMutation
} from "@/redux/features/user/userApi";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const Page = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editUser, { isLoading, isError, isSuccess, error }] =
    useEditUserMutation();
  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();
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
  const handleBlockUser = (id: string, isBlocked: boolean) => {
    editUser({ id, isBlocked });
  };

  const columns = [
    {
      title: "Own By Id",
      dataIndex: "id"
    },
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
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "min-w-[145px]",
      render: (text: string, record: any) => {
        return (
          <div className="flex items-center justify-evenly gap-1">
            <AppModal
              button={
                <button className="appOutlineBtnSmDelete">
                  {record?.isBlocked ? "UnBlock" : "Block"}
                </button>
              }
              cancelButtonTitle="No, Don’t"
              primaryButtonTitle={`Yes. ${
                record?.isBlocked ? "UnBlock" : "Block"
              }`}
              primaryButtonAction={() =>
                handleBlockUser(record?.id, record?.isBlocked ? false : true)
              }
            >
              <div className="max-w-80">
                <p className="text-center text-[#828282] pt-4 text-lg">
                  Are you sure {record?.isBlocked ? "UnBlock" : "Block"}{" "}
                  <span className="text-textDark font-medium">
                    {record?.name}
                  </span>{" "}
                  from the users list?
                </p>
              </div>
            </AppModal>

            <AppModal
              button={<button className="appBtnSm">Delete</button>}
              cancelButtonTitle="No, Don’t"
              primaryButtonTitle="Yes. Remove"
              primaryButtonAction={() => deleteUser(record?.id)}
            >
              <div className="max-w-80">
                <p className="text-center text-[#828282] pt-4 text-lg">
                  Are you sure Remove{" "}
                  <span className="text-textDark font-medium">
                    {record?.name}
                  </span>{" "}
                  from the user list?
                </p>
              </div>
            </AppModal>
          </div>
        );
      }
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

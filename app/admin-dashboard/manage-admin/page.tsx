'use client';
import {
  useEditUserMutation,
  useGetUsersQuery,
} from '@/redux/features/user/userApi';
import React, { useMemo, useState } from 'react';
import AppTable from '@/components/ui/AppTable';
import useDebounce from '@/hooks/useDebounce';
import AppInput from '@/components/ui/AppInput';
import AppModal from '@/components/ui/AppModal';
import { toast } from 'react-toastify';
import PrivateLayout from '@/components/shared/PrivetLayout';
import { Select } from 'antd';
import { SelectOptions } from '@/components/ui/AppFormSelect';
import { UserRole } from '@/types';
import { IUser } from '@/types';
import { IoSearch } from 'react-icons/io5';

function ManageAdmin() {
  const defaultValue = { value: 'user', label: 'User' };
  const [role, setRole] = useState<SelectOptions>(defaultValue);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const queryInfo = useGetUsersQuery({
    page,
    role: role.value,
    searchTerm: useDebounce(search, 500),
  });

  const [editUser, { isLoading }] = useEditUserMutation();

  const handleMakeAdmin = (id: string, role: UserRole) => {
    editUser({ id, role })
      .unwrap()
      .then((res: any) => {
        toast.success(`Remove From admin list successful.`);
      })
      .catch(() => {
        toast.error(`Remove From admin list  unsuccessful!`);
      });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'min-w-[150px]',
      render: (name: string, record: IUser) => {
        return (
          <div className="flex items-center gap-1">
            <img
              src={record?.profileImg as string}
              alt=""
              className="rounded-full w-10 h-10"
            />
            <p className="cursor-pointer">{name}</p>
          </div>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      className: 'min-w-[150px]',
    },
    {
      title: 'Money',
      dataIndex: 'Currency',
      className: 'min-w-[150px]',
      render: (Currency: any) => {
        return <p className="font-medium">${Currency?.amount.toFixed(2)}</p>;
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      className: 'min-w-[145px]',
      render: (role: any) => {
        return <p className="text-base font-medium uppercase">{role}</p>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'role',
      className: 'min-w-[145px]',
      render: (role: UserRole, record: IUser) => {
        if (role === UserRole.User) {
          return (
            <div className="flex  justify-evenly gap-1">
              <AppModal
                button={
                  <button
                    disabled={isLoading}
                    className="bg-primary text-[#fff] px-4 py-2 rounded-md"
                  >
                    Make Finance Admin
                  </button>
                }
                cancelButtonTitle="No, Don’t"
                primaryButtonTitle="Yes. Make Finance Admin"
                primaryButtonAction={() =>
                  handleMakeAdmin(record?.id, UserRole.FinanceAdmin)
                }
              >
                <div className="max-w-80">
                  <p className="text-center text-darkishGrey pt-4 text-lg">
                    Are you sure you want to make{' '}
                    <span className="text-textDark font-medium">
                      {record?.name}
                    </span>{' '}
                    a Finance Admin?
                  </p>
                </div>
              </AppModal>
              <AppModal
                button={
                  <button
                    disabled={isLoading}
                    className="bg-primary text-[#fff] px-4 py-2 rounded-md"
                  >
                    Make Customer Care Admin
                  </button>
                }
                cancelButtonTitle="No, Don’t"
                primaryButtonTitle="Yes. Make Customer Care Admin"
                primaryButtonAction={() =>
                  handleMakeAdmin(record?.id, UserRole.CustomerCare)
                }
              >
                <div className="max-w-80">
                  <p className="text-center text-darkishGrey pt-4 text-lg">
                    Are you sure you want to make{' '}
                    <span className="text-textDark font-medium">
                      {record?.name}
                    </span>{' '}
                    a Customer Care Admin?
                  </p>
                </div>
              </AppModal>
            </div>
          );
        } else {
          return (
            <div className="">
              <AppModal
                button={
                  <button
                    disabled={isLoading}
                    className="bg-primary text-[#fff] px-4 py-2 rounded-md"
                  >
                    Remove
                  </button>
                }
                cancelButtonTitle="No, Don’t"
                primaryButtonTitle="Yes. Remove"
                primaryButtonAction={() =>
                  handleMakeAdmin(record?.id, UserRole.User)
                }
              >
                <div className="max-w-80">
                  <p className="text-center text-darkishGrey pt-4 text-lg">
                    Are you sure Remove{' '}
                    <span className="text-textDark font-medium">
                      {record?.name}
                    </span>{' '}
                    from the Admins list?
                  </p>
                </div>
              </AppModal>
            </div>
          );
        }
      },
    },
  ];

  const roleOption = [
    { value: UserRole.User, label: 'User' },
    { value: UserRole.FinanceAdmin, label: 'Finance Admin' },
    { value: UserRole.CustomerCare, label: 'Customer Care' },
  ];

  const handleRoleChange = (el: string) => {
    // find in role option
    const findRole = roleOption.find(option => option.value === el);
    if (findRole) {
      setRole(findRole);
    }
  };

  return (
    <PrivateLayout roles={[UserRole.Admin]}>
      <h2 className="title text-center mb-5">All Admin</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 my-5 md:my-6 2xl:my-10 justify-between">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 md:gap-5">
          <Select
            className="min-w-44"
            onChange={handleRoleChange}
            placeholder="Filter By Role"
            options={roleOption}
            value={role.value}
          ></Select>
        </div>
        <AppInput
          className="lg:w-1/3 h-full"
          wrapperClassName="mb-0 "
          placeholder="Search By Email or name"
          type="text"
          icon={<IoSearch />}
          setValue={e => setSearch(e?.target?.value)}
        />
        <button
          className="appBtn"
          onClick={() => {
            setRole(defaultValue);
          }}
        >
          Reset
        </button>
      </div>

      <div className="h-[65dvh] overflow-auto">
        <AppTable infoQuery={queryInfo} columns={columns} setPage={setPage} />
      </div>
    </PrivateLayout>
  );
}

export default ManageAdmin;

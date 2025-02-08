'use client';
import MyNumberDetails from '@/components/dashboard/MyNumberDetails';
import AppFormSelect from '@/components/ui/AppFormSelect';
import AppInput from '@/components/ui/AppInput';
import AppModal from '@/components/ui/AppModal';
import AppTable from '@/components/ui/AppTable';
import useDebounce from '@/hooks/useDebounce';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetSmsPoolOrderQuery } from '@/redux/features/smsPoolOrder/smsPoolOrderApi';
import { useAppSelector } from '@/redux/hook';
import { IUser } from '@/types';
import { Select } from 'antd';
import React, { useState } from 'react';

type Props = {};

const ManageNumber = (props: Props) => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('all');
  const debouncedId = useDebounce(id, 500);
  const debouncedOrderId = useDebounce(orderId, 500);
  const query = useGetSmsPoolOrderQuery(
    {
      page: page,
      id: debouncedId.length ? debouncedId : undefined,
      orderId: debouncedOrderId?.length ? debouncedOrderId : undefined,
      status: status === 'all' ? undefined : status,
    },
    { refetchOnMountOrArgChange: true },
  );
  console.log(query);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: any, record: any) => (
        <div>
          <p>{text}</p>
        </div>
      ),
    },

    {
      title: 'Number Id',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    // {
    //   title: 'Phone Number',
    //   dataIndex: 'phoneNumber',
    //   key: 'phoneNumber',
    // },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (text: any, record: any) => (
        <div>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: (text: any, record: any) => (
        <div>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (text: any, record: any) => (
        <div>
          <p>{text.toFixed(4)}</p>
        </div>
      ),
    },
    {
      title: 'OrderBy',
      dataIndex: 'orderBy',
      key: 'id',
      render: (text: IUser, record: any) => (
        <div>
          <p>{text?.name}</p>
          <p>{text?.email}</p>
          <p>{text?.id}</p>
        </div>
      ),
    },
    // createdAt
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any, record: any) => (
        <div>
          <p>
            {new Date(text).toLocaleDateString()}{' '}
            {new Date(text).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
        </div>
      ),
    },
    {
      title: 'Own Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: any, record: any) => (
        <div>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: 'View',
      key: 'view',
      render: (text: any, record: any) => (
        <AppModal
          title="Order Details"
          button={
            <button className="btn bg-primary text-[#fff] px-2 py-2 rounded hover:opacity-80">
              View
            </button>
          }
        >
          <MyNumberDetails isAdmin={true} id={record.id} />
        </AppModal>
      ),
    },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Order Numbers</h2>
      <div className="flex gap-4">
        {/*  */}
        <AppInput
          placeholder="Search By Id"
          value={id}
          setValue={e => setId(e.target.value)}
          type="text"
        ></AppInput>
        <AppInput
          placeholder="Search By Order Id"
          value={orderId}
          setValue={e => setOrderId(e.target.value)}
          type="text"
        ></AppInput>

        <Select
          className="min-w-[150px]"
          placeholder="Select Status"
          options={[
            {
              label: 'All',
              value: 'all',
            },
            {
              label: 'Pending',
              value: 'pending',
            },
            {
              label: 'Completed',
              value: 'completed',
            },
            {
              label: 'Refunded',
              value: 'refunded',
            },
          ]}
          value={status}
          onChange={e => setStatus(e)}
        ></Select>
      </div>
      <AppTable columns={columns} infoQuery={query}></AppTable>
    </div>
  );
};

export default ManageNumber;

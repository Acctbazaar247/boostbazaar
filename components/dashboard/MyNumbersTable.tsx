'use client';

import { useGetSmsPoolOrderQuery } from '@/redux/features/smsPoolOrder/smsPoolOrderApi';
import AppTable from '../ui/AppTable';
import { useState } from 'react';
import AppModal from '../ui/AppModal';
import { useAppSelector } from '@/redux/hook';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import MyNumberDetails from './MyNumberDetails';

export interface IMyNumbersTableProps {}

export default function MyNumbersTable(props: IMyNumbersTableProps) {
  const [page, setPage] = useState(1);
  const user = useAppSelector(selectCurrentUser);
  const query = useGetSmsPoolOrderQuery(
    {
      page: page,
      ownById: user?.id,
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
          <MyNumberDetails id={record.id} />
        </AppModal>
      ),
    },
  ];
  return (
    <div>
      <AppTable columns={columns} infoQuery={query}></AppTable>
    </div>
  );
}

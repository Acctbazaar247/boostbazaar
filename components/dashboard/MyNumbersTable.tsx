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
      orderById: user?.id,
    },
    { refetchOnMountOrArgChange: true },
  );
  console.log(query);
  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    //   render: (text: any, record: any) => (
    //     <div>
    //       <p>{text}</p>
    //     </div>
    //   ),
    // },

    {
      title: 'Action',
      key: 'view',
      align: 'center',
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
    {
      title: 'Number Id',
      dataIndex: 'orderId',
      align: 'center',
      key: 'orderId',
      render: (text: any, record: any) => (
        <div>
          <p className="text-xs md:text-sm">{text}</p>
        </div>
      ),
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
      align: 'center',
      render: (text: any, record: any) => (
        <div>
          <p className="text-xs md:text-sm">{text}</p>
        </div>
      ),
    },
    {
      title: 'Service',
      width: 10,
      dataIndex: 'service',
      align: 'center',
      key: 'service',
      render: (text: any, record: any) => (
        <div>
          <p className="text-xs md:text-sm">{text}</p>
        </div>
      ),
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      align: 'center',
      render: (text: any, record: any) => (
        <div>
          <p className="text-xs md:text-sm">{text.toFixed(3)}</p>
        </div>
      ),
    },
    // createdAt
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (text: any, record: any) => (
        <div>
          <p className="text-xs md:text-sm">
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
  ];
  return (
    <div className=" ">
      <AppTable scroll={true} columns={columns} infoQuery={query}></AppTable>
    </div>
  );
}

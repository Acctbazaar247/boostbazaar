'use client';
import AppTable from '@/components/ui/AppTable';
import { useGetManualCurrencyRequestsQuery } from '@/redux/features/manualCurrencyRequest/manualCurrencyRequestApi';
import appDateFormate from '@/utils/appDateFormate';
import React, { useMemo, useState } from 'react';
import dateFormat from 'dateformat';
import { Avatar } from 'antd';
import { FaEye, FaNairaSign } from 'react-icons/fa6';
import AppButton from '@/components/ui/AppButton';
import AppModal from '@/components/ui/AppModal';
import AppInput from '@/components/ui/AppInput';
import { FaDollarSign } from 'react-icons/fa';
import { ManualCurrencyRequest } from '@/types';
import ManualPaymentViewModal from '@/components/admin-dashboard/ManualPaymentViewModal';
type Props = {};

const ManageManualPayment = (props: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const requestQuery = useGetManualCurrencyRequestsQuery({
    page,
    searchTerm: search,
    limit: 20,
  });
  const columns = useMemo(
    () => [
      {
        title: 'Request ID',
        dataIndex: 'id',
        className: 'min-w-[150px]',
      },
      {
        title: 'User',
        dataIndex: 'id',
        className: 'min-w-[150px]',
        render: (id: string, record: ManualCurrencyRequest) => {
          return (
            <div className="flex items-center gap-2">
              <Avatar src={record?.ownBy?.profileImg} size={20}></Avatar>
              <div className="text-xs">
                <p className="line-clamp-1  ">{record?.ownBy?.name}</p>
                <p className="line-clamp-1  ">{record?.ownBy?.email}</p>
                <p className="line-clamp-1  ">{record?.ownBy?.id}</p>
              </div>
            </div>
          );
        },
      },
      {
        title: 'Request Amount',
        dataIndex: 'requestedAmount',
        className: 'min-w-[150px]',
        render: (requestedAmount: number, record: ManualCurrencyRequest) => {
          return (
            <p className="line-clamp-1 flex items-center gap-1 text-base">
              <FaDollarSign />
              <span>{requestedAmount}</span>
            </p>
          );
        },
      },
      {
        title: 'Received Amount ',
        dataIndex: 'receivedAmount',
        render: (receivedAmount: number, record: ManualCurrencyRequest) => {
          return (
            <p className="line-clamp-1 flex items-center gap-1 text-base">
              <FaDollarSign />
              <span>{receivedAmount || 'Not Added'}</span>
            </p>
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        className: 'min-w-[150px]',
        render: (status: string, record: ManualCurrencyRequest) => {
          return (
            <p
              className={`line-clamp-1 capitalize text-base ${status === 'pending' ? 'text-yellow-500' : status === 'approved' ? 'text-green-500' : 'text-orange-500'}`}
            >
              {status}
            </p>
          );
        },
      },
      {
        title: 'Request Date',
        dataIndex: 'createdAt',
        className: 'min-w-[150px]',
        render: (createdAt: string, record: any) => {
          return (
            <p className="   text-xs">
              {dateFormat(createdAt, appDateFormate)}
            </p>
          );
        },
      },
      {
        title: 'Action',
        dataIndex: 'id',
        className: 'min-w-[150px]',
        render: (id: string, record: ManualCurrencyRequest) => {
          return (
            <p className="line-clamp-1  text-base">
              <AppModal
                title="View Request"
                subTitle="View the request details"
                button={
                  <div>
                    <button className="bg-primary text-white px-2 py-1 rounded-md">
                      View
                    </button>
                  </div>
                }
              >
                <div className="md:w-[500px]">
                  <ManualPaymentViewModal data={record} />
                </div>
              </AppModal>
            </p>
          );
        },
      },
    ],
    [],
  );
  return (
    <div>
      <div className="mb-2">
        <AppInput
          placeholder="Search by id"
          type="text"
          value={search}
          setValue={e => setSearch(e.target.value)}
        ></AppInput>
      </div>

      <div className="h-[65dvh] overflow-auto">
        <AppTable
          setPage={setPage}
          columns={columns}
          infoQuery={requestQuery}
        />
      </div>
    </div>
  );
};

export default ManageManualPayment;

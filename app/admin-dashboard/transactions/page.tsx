'use client';

import PrivetLayout from '@/components/shared/PrivetLayout';
import AppInput from '@/components/ui/AppInput';
import AppTable from '@/components/ui/AppTable';
import { useGetTableCurrencyRequestQuery } from '@/redux/features/dashboard/dashboardApi';
import { UserRole } from '@/types';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/formateDate';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { FaNairaSign } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import { IoSearch } from 'react-icons/io5';

const Page = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const queryString = useMemo(() => {
    const info = {
      page,
      searchTerm,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? '&' : ''}${key}=${value}`;
      }
      return pre;
    }, '');
    return queryString;
  }, [page, searchTerm]);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'orderBy',
      dataIndex: 'ownBy',
      className: 'min-w-[150px]',
      render: (ownBy: any, record: any) => {
        return (
          <div className="flex items-center gap-1">
            <Image
              src={ownBy?.profileImg}
              alt=""
              width={40}
              height={40}
              className="rounded-full size-8"
            />
            <div className="text-dark-grey">
              <h3 className="">{ownBy?.name}</h3>
              <h3 className="">{ownBy?.email}</h3>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      className: 'min-w-[145px]',
      render: (amount: string) => (
        <div className="pl-4 flex items-center gap-1">
          <FaDollarSign />
          {amount}
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      className: 'min-w-[100px]',
      render: (createdAt: string) => (
        <div className="pl-4 flex items-center gap-1">
          {formatDate(createdAt)}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      className: 'min-w-[100px]',
      render: (status: string) => (
        <p
          className={cn(
            'flex items-center w-fit text-sm gap-1 px-3 py-1 rounded-full',
            status === 'pending' && 'bg-[#FEF9C3] text-[#713F12]',
            status === 'approved' && 'bg-[#DCFCE7] text-[#14532D]',
            status === 'denied' && 'bg-[#FEE2E2] text-[#7F1D1D]',
          )}
        >
          <GoDotFill
            className={cn(
              status === 'pending' && 'text-[#FACC15]',
              status === 'approved' && 'text-[#22C55E]',
              status === 'denied' && 'text-[#EF4444]',
            )}
          />
          {status}
        </p>
      ),
    },
  ];

  const transactionsQuery = useGetTableCurrencyRequestQuery(queryString);

  return (
    <PrivetLayout
      roles={[UserRole.Admin, UserRole.FinanceAdmin, UserRole.CustomerCare]}
    >
      <h1 className="heading pb-10">Transactions</h1>
      <AppInput
        placeholder="Search By ID"
        type="text"
        icon={<IoSearch />}
        setValue={e => setSearchTerm(e?.target?.value)}
      />
      <AppTable
        setPage={setPage}
        columns={columns}
        infoQuery={transactionsQuery}
      />
    </PrivetLayout>
  );
};

export default Page;

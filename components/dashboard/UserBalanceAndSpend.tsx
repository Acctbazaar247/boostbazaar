'use client';
import {
  useGetMainBalanceQuery,
  useGetSpendHistoryQuery,
} from '@/redux/features/dashboard/dashboardApi';
import { useAppSelector } from '@/redux/hook';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import React from 'react';
import { FaDollarSign } from 'react-icons/fa';

type Props = {};

const UserBalanceAndSpend = (props: Props) => {
  const { data: balance } = useGetMainBalanceQuery('');
  const { data: spendData } = useGetSpendHistoryQuery('');
  const theme = useAppSelector(state => state.auth.theme);
  return (
    <div className="grid md:grid-cols-2 gap-5 md:gap-20">
      <div className="border border-primary/50 bg-primary/10 p-5 space-y-5 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-dark-grey">Main balance</h3>
          <Link
            href={'/dashboard/fund'}
            className={cn(
              'bg-white font-light rounded px-2 py-1',
              theme === 'light' ? 'text-primary' : 'text-[#fff]',
            )}
          >
            Add funds
          </Link>
        </div>
        <h1 className="text-2xl text-black/80 font-bold flex items-center gap-1">
          <FaDollarSign />
          {balance?.data?.amount.toFixed(2)}
        </h1>
      </div>

      {/* fund 2 */}
      <div className="border border-primary/50 bg-primary/10 p-5 space-y-5 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-dark-grey">Spend</h3>
          <Link
            href={'/dashboard/history'}
            className={cn(
              'bg-white font-light rounded px-2 py-1',
              theme === 'light' ? 'text-primary' : 'text-[#fff]',
            )}
          >
            History
          </Link>
        </div>
        <h1 className="text-2xl text-black/80 font-bold flex items-center gap-1">
          <FaDollarSign />
          {spendData?.data?.spend}
        </h1>
      </div>
    </div>
  );
};

export default UserBalanceAndSpend;

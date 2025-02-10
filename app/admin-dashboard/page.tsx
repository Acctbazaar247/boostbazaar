'use client';

import Link from 'next/link';
import { FaNairaSign } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import {
  useGetAdminOverviewQuery,
  useGetCurrencyRequestQuery,
} from '@/redux/features/dashboard/dashboardApi';
import { BsThreeDots } from 'react-icons/bs';
import { cn } from '@/utils/cn';
import { GoDotFill } from 'react-icons/go';
import { formatDate } from '@/utils/formateDate';
import { ApexOptions } from 'apexcharts';
import { useGetUsersQuery } from '@/redux/features/auth/authApi';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Progress } from 'antd';
import Loading from '@/components/ui/Loading';
import { useMemo } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import PrivetLayout from '@/components/shared/PrivetLayout';
import { UserRole } from '@/types';

enum EAccountCategory {
  YOUTUBE = 'Youtube',
  FACEBOOK = 'Facebook',
  INSTAGRAM = 'Instagram',
  TWITTER = 'Twitter',
}

type TTrafic = {
  accountCategory: EAccountCategory;
  count: number;
};

const Page = () => {
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false, // This ensures the component is only rendered on the client side
  });

  const { data: transactions } = useGetCurrencyRequestQuery('', {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { data: adminOverview, isLoading } = useGetAdminOverviewQuery('', {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { data: usersData } = useGetUsersQuery('', {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const maxValue = useMemo(() => {
    if (!adminOverview?.data?.trafic?.length) return 0;
    return Math.max(
      ...adminOverview.data.trafic.map((single: any) => single.count),
    );
  }, [adminOverview]);

  type OriginalData = {
    totalOrder: number;
    totalSale: number;
    totalTodaySale: number;
    totalUser: number;
  };

  type Stat = {
    label: string;
    value: string;
    isNiger: boolean;
  };

  const transformData = (data: OriginalData): Stat[] => {
    return [
      {
        label: 'Today’s Sale',
        value: data?.totalTodaySale.toLocaleString(), // Format number with commas
        isNiger: true,
      },
      {
        label: 'Total Sales',
        value: data?.totalSale.toLocaleString(), // Format number with commas
        isNiger: true,
      },
      {
        label: 'Total Orders',
        value: data?.totalOrder.toLocaleString(), // Format number with commas
        isNiger: false,
      },
      {
        label: 'Total Customers',
        value: data?.totalUser.toLocaleString(), // Format number with commas
        isNiger: false,
      },
    ];
  };

  const stats = transformData(adminOverview?.data);

  const series = (adminOverview?.data?.trafic || []).map(
    (data: TTrafic) => data.count,
  );

  const labels = (adminOverview?.data?.trafic || []).map(
    (data: TTrafic) => data.accountCategory,
  );

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: labels,
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  const roundedMaxCount = Math.ceil(maxValue / 10) * 10;
  return (
    <PrivetLayout
      roles={[UserRole.Admin, UserRole.CustomerCare, UserRole.FinanceAdmin]}
    >
      <div className="space-y-6 pb-10">
        <h2 className="text-dark-grey">
          <span className="font-bold text-black pr-2"> Hey CEO</span>here’s
          what’s happening with your store today
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="bg-white border border-dark-grey/20 rounded-md p-3 space-y-4"
            >
              <p className="text-dark-grey uppercase text-xs">{stat.label}</p>
              <h2 className="font-bold text-xl flex items-center gap-1">
                {stat.isNiger && <FaDollarSign className="text-black/70" />}
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8 ">
          <div className="md:col-span-8 col-span-12 relative border border-dark-grey/20 bg-white p-4 rounded-lg flex items-center justify-center">
            <span className="absolute font-bold left-5 top-5 text-black">
              Sales Report
            </span>

            {/* chart here  */}
            <ReactApexChart
              options={options}
              series={series}
              type="pie"
              width={380}
            />
          </div>

          <div className="col-span-12 md:col-span-4 border border-dark-grey/20 bg-white p-4 rounded-lg">
            <p className="font-bold text-black pb-2">Sales Report</p>
            <div className="space-y-1">
              {(adminOverview?.data?.trafic.slice(0, 4) || []).map(
                (traffic: TTrafic) => (
                  <div key={traffic.accountCategory} className="space-y-2">
                    <p className="flex items-center justify-between font-medium text-sm">
                      <span>{traffic.accountCategory}</span>
                      <span>{traffic.count}</span>
                    </p>
                    {/* <Progress
                  percent={traffic.count}
                  success={{ percent: maxValue }}
                ></Progress> */}
                    <Progress
                      percent={(traffic.count / roundedMaxCount) * 100}
                      showInfo={false}
                      // success={{ percent: traffic.count }}
                      // strokeColor="#5D5FDF"
                      strokeWidth={10} // Set a fixed height for all progress bars
                    />
                    {/* <input
                    type="range"
                    value={traffic.count}
                    readOnly
                    className="w-full"
                  /> */}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8  ">
          <div className="col-span-12 2xl:col-span-8 border border-dark-grey/20 bg-white p-4 rounded-lg">
            <h2 className="flex items-center justify-between">
              <span className="font-bold text-black">Transactions</span>
              <Link
                href={'/admin-dashboard/transactions'}
                className="text-primary flex items-center gap-1"
              >
                See All Transactions <IoIosArrowForward />
              </Link>
            </h2>
            <p className="text-dark-grey text-sm pb-4">
              View all transactions that was made,
            </p>
            {(transactions?.data?.length > 4
              ? transactions?.data?.slice(0, 4)
              : transactions?.data
            )?.map((trans: any) => (
              <div
                key={trans}
                className="flex items-center justify-between px-4 py-4 last:border-none border-b border-dark-grey/20"
              >
                <p
                  className={cn(
                    'flex items-center w-fit text-sm gap-1 px-3 py-1 rounded-full',
                    trans?.status === 'pending' &&
                      'bg-[#FEF9C3] text-[#713F12]',
                    trans?.status === 'approved' &&
                      'bg-[#DCFCE7] text-[#14532D]',
                    trans?.status === 'denied' && 'bg-[#FEE2E2] text-[#7F1D1D]',
                  )}
                >
                  <GoDotFill
                    className={cn(
                      trans?.status === 'pending' && 'text-[#FACC15]',
                      trans?.status === 'approved' && 'text-[#22C55E]',
                      trans?.status === 'denied' && 'text-[#EF4444]',
                    )}
                  />
                  {trans?.status}
                </p>
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1">
                    <FaDollarSign />
                    {trans?.amount}
                  </span>
                  <span className="text-dark-grey text-sm">
                    {formatDate(trans?.createdAt)}
                  </span>
                </div>
                <div className=""></div>
                <p></p>
                <BsThreeDots className="text-dark-grey text-lg" />
              </div>
            ))}
          </div>
          <div className=" col-span-12 2xl:col-span-4 border border-dark-grey/20 bg-white p-4 rounded-lg">
            <h2 className="font-bold text-black">Recent Customers</h2>
            <p className="text-dark-grey text-sm pb-4">View recent customers</p>
            <div className="flex flex-col gap-3">
              {(usersData?.data?.length > 4
                ? usersData?.data?.slice(0, 4)
                : usersData?.data
              )?.map((user: any) => (
                <div key={user} className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <Image
                      src={user?.profileImg}
                      width={32}
                      height={32}
                      alt="Avatar"
                      className="size-6 md:size-8 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-black">{user?.name}</span>
                      <span className="text-dark-grey text-xs">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-black flex items-center gap-1">
                      {' '}
                      <FaDollarSign />
                      {user?.Currency?.amount.toFixed(2)}
                    </p>
                    {/* <p className="text-[#8DD56C] text-sm">Online</p> */}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={'admin-dashboard/customer'}
              className="text-dark-grey uppercase flex items-center mt-3 gap-1"
            >
              See All customers <IoIosArrowForward />
            </Link>
          </div>
        </div>
      </div>
    </PrivetLayout>
  );
};

export default Page;

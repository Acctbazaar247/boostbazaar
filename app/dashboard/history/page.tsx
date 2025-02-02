'use client';

import AnimationWrapper from '@/components/ui/AnimationWrapper';
import AppInfo from '@/components/ui/AppInfo';
import AppTable from '@/components/ui/AppTable';
import AppTabs from '@/components/ui/AppTabs';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import {
  useGetCurrencyRequestQuery,
  useGetOrdersQuery,
} from '@/redux/features/dashboard/dashboardApi';
import { useGetManualCurrencyRequestsQuery } from '@/redux/features/manualCurrencyRequest/manualCurrencyRequestApi';
import { useAppSelector } from '@/redux/hook';
import appDateFormate from '@/utils/appDateFormate';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import dateFormat from 'dateformat';
import { ManualCurrencyRequest } from '@/types';
const Page = () => {
  const user = useAppSelector(selectCurrentUser);
  const tabs = [
    { label: 'Order', value: 'order' },
    { label: 'Deposit', value: 'deposit' },
    { label: 'Manual Payment', value: 'manual' },
  ];
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'order' | 'deposit' | 'manual'>(
    'order',
  );

  const orderQueryString = useMemo(() => {
    const info = {
      page,
      orderById: user?.id,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? '&' : ''}${key}=${value}`;
      }
      return pre;
    }, '');
    return queryString;
  }, [page, user]);

  const currencyQueryString = useMemo(() => {
    const info = {
      page,
      ownById: user?.id,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? '&' : ''}${key}=${value}`;
      }
      return pre;
    }, '');
    return queryString;
  }, [page, user]);

  const orderQuery = useGetOrdersQuery(orderQueryString);
  const depositQuery = useGetCurrencyRequestQuery(currencyQueryString);
  const manualQuery = useGetManualCurrencyRequestsQuery({
    page: page,
    limit: 10,
    ownById: user?.id,
  });
  const orderColumns = [
    {
      title: 'Order ID',
      dataIndex: 'japOrderId',
      className: 'min-w-[120px] md:min-w-[145px]',
    },
    {
      title: 'Category',
      dataIndex: 'accountCategory',
      className: 'min-w-[130px] md:min-w-[150px]',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      className: 'min-w-[120px] md:min-w-[145px]',
    },
    {
      title: 'Service ID',
      dataIndex: 'japServiceId',
      className: 'min-w-[120px] md:min-w-[145px]',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      className: 'min-w-[120px] md:min-w-[145px]',
    },
    {
      title: 'Charge',
      dataIndex: 'charge',
      className: 'min-w-[120px] md:min-w-[145px]',
      render: (charge: number) => {
        return (
          <p className="pl-2 flex  items-center gap-1">
            <FaDollarSign></FaDollarSign> {charge?.toFixed(2)}
          </p>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      className: 'min-w-[120px] md:min-w-[145px]',
    },
  ];

  const depositColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      className: 'md:min-w-[150px]',
      render: (id: any, record: any) => {
        return <p>{id}</p>;
      },
    },

    {
      title: 'Amount',
      dataIndex: 'amount',
      className: 'min-w-[120px] md:min-w-[145px]',
      render: (id: any, record: any) => {
        return (
          <p className="pl-2 flex  items-center gap-1">
            <FaDollarSign></FaDollarSign> {id?.toFixed(2)}
          </p>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      className: 'min-w-[120px] md:min-w-[145px] text-center',
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   className: "md:min-w-[150px]",
    //   render: (status: string) => {
    //     return (
    //       <div className={`flex items-center gap-1`}>
    //         <span
    //           className={cn(
    //             "text-white rounded-full px-3",
    //             status === "open" && "bg-primary",
    //             status === "closed" && "bg-[#71717A80]",
    //             status === "solved" && "bg-[#058803]"
    //           )}
    //         >
    //           {status}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
  ];
  const manualColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'max-w-[150px]',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      className: 'min-w-[150px]',
      render: (createdAt: string, record: any) => {
        return (
          <div className="flex items-center gap-1">
            {dateFormat(createdAt, appDateFormate)}
          </div>
        );
      },
    },
    {
      title: 'Requested  Amount',
      dataIndex: 'requestedAmount',
      className: 'min-w-[150px]',
    },
    {
      title: 'Type',
      dataIndex: 'id',
      render: (text: string, record: ManualCurrencyRequest) => {
        return <div>{record.bankId ? 'Bank' : 'Crypto'}</div>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text: string, record: any) => {
        return (
          <div className="flex items-center justify-start">
            <p
              className={`py-1 px-2 rounded-full w-fit text-sm flex items-center gap-2 ${
                (text === 'pending' && 'text-brown bg-yellowShadow') ||
                (text === 'failed' && 'text-red bg-red/10') ||
                (text === 'success' && 'text-success bg-success/10')
              }`}
            >
              <GoDotFill />
              {text}
            </p>
          </div>
        );
      },
    },
  ];
  return (
    <AnimationWrapper className="container py-12">
      <h1 className="heading ">History</h1>

      <AppTabs
        className="!text-xl"
        activeTab={activeTab}
        setActiveTab={setActiveTab as Dispatch<SetStateAction<string>>}
        tabs={tabs}
      />

      {activeTab === 'order' ? (
        <div className="  pb-4  ">
          <AppInfo>
            <p>
              {' '}
              Orders are processed within 0 seconds to 24 hours, though some may
              take 0–7 days or up to 30 days, depending on complexity. If your
              order does not begin within 24 hours, please contact us via
              Telegram @acctpanel or email{' '}
              <a href="mailto:support@acctpanel.com">
                support@acctpanel.com
              </a>.{' '}
              <a
                className="text-primary underline cursor-pointer"
                href="mailto:support@acctpanel.com "
              >
                support@acctpanel.com
              </a>{' '}
              for assistance.
            </p>
          </AppInfo>
        </div>
      ) : null}

      <AppTable
        setPage={setPage}
        columns={
          activeTab === 'deposit'
            ? depositColumns
            : activeTab === 'manual'
              ? manualColumns
              : orderColumns
        }
        infoQuery={
          activeTab === 'deposit'
            ? depositQuery
            : activeTab === 'manual'
              ? manualQuery
              : orderQuery
        }
      />
    </AnimationWrapper>
  );
};

export default Page;

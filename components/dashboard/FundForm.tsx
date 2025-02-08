'use client';

import { useState } from 'react';
import OnlinePayment from './OnlinePayment';
import ManualPayment from './ManualPayment';
import { BsBank2 } from 'react-icons/bs';
import { BsCashCoin } from 'react-icons/bs';
import { config } from '@/config';
import Link from 'next/link';

const FundForm = () => {
  const [paymentType, setPaymentType] = useState<'online' | 'manual' | null>(
    null,
  );
  if (paymentType === 'online')
    return <OnlinePayment setPaymentType={setPaymentType} />;
  if (paymentType === 'manual')
    return <ManualPayment setPaymentType={setPaymentType} />;
  return (
    <div className="mt-10">
      <h2 className="text-2xl md:text-3xl text-primary  ">
        Choose a Payment Type
      </h2>

      {/* two option online or manual */}
      <div className="grid gap-6 md:grid-cols-2 pt-5">
        {/* Automatic Deposit Card */}
        <div
          // onClick={() => setPaymentType('online')}
          className={`
            cursor-pointer rounded-xl border p-6 transition-all duration-300
            ${'light:border-[#e2e1e1] dark:border-[#555454] light:bg-white dark:bg-[#282626] '}
          `}
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/20">
            <svg
              className="h-7 w-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div className="mb-8">
            <h2 className="mb-2 text-xl font-semibold light:text-[#000] dark:text-[#fff]">
              Automatic Deposit
            </h2>
            <p className="text-gray-400">
              Instant deposit via Bank, Card, or Crypto.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              className={`
              rounded-lg px-4 disabled:cursor-not-allowed disabled:opacity-60 py-2.5 text-sm font-medium transition-colors
             ${'bg-primary text-[#fff] hover:bg-gray-700'}
           `}
              onClick={() => setPaymentType('online')}
              disabled={!config.isAutomaticDepositActive}
            >
              Proceed
            </button>
            <Link
              href="/dashboard/deposit-history?tab=deposit"
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              View Previous Transactions
            </Link>
          </div>
        </div>

        {/* Manual Deposit Card */}
        <div
          // onClick={() => setPaymentType('manual')}
          className={`
              cursor-pointer rounded-xl border p-6 transition-all duration-300
              ${'light:border-[#e2e1e1] dark:border-[#555454] light:bg-white dark:bg-[#282626] '}
            `}
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/20">
            <svg
              className="h-7 w-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>

          <div className="mb-8">
            <h2 className="mb-2 text-xl font-semibold light:text-[#000] dark:text-[#fff]">
              Manual Deposit
            </h2>
            <p className="text-gray-400">
              Processed in 3-5 minutes via bank transfer or crypto. Best for
              crypto payments.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setPaymentType('manual')}
              disabled={!config.isManualDepositActive}
              className={`
                 rounded-lg px-4 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60 transition-colors
                ${'bg-primary text-[#fff] hover:bg-gray-700'}
              `}
            >
              Proceed
            </button>
            <Link
              href="/dashboard/deposit-history?tab=manual"
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              View Previous Transactions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundForm;

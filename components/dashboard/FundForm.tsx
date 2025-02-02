'use client';

import { useState } from 'react';
import OnlinePayment from './OnlinePayment';
import ManualPayment from './ManualPayment';
import { BsBank2 } from 'react-icons/bs';
import { BsCashCoin } from 'react-icons/bs';
import { config } from '@/config';

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
      <div className=" grid grid-cols-1 md:grid-cols-2  w-full mt-5   gap-5 md:gap-5">
        <button
          className="p-2 py-4 md:p-4 border  rounded-lg transition-all border-borderColor w-full   text-left group hover:border-primary "
          onClick={() => setPaymentType('online')}
        >
          <div>
            <div className="flex justify-center items-center">
              <BsCashCoin className="size-10 group-hover:text-primary  transition-all"></BsCashCoin>
            </div>
            <div>
              <h3 className="text-center text-textBlack mt-2 group-hover:text-primary font-bold transition-all">
                Automatic Deposit
              </h3>
              <p className="text-xs md:text-sm text-center text-textGrey">
                Instant deposit via Bank, Card, or Crypto.
              </p>
            </div>
          </div>
        </button>
        <button
          disabled={!config.isManualDepositActive}
          className="gap-5 p-2 py-4 md:p-4 border  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-borderColor disabled:hover:text-textGrey rounded-lg transition-all w-full  text-left group hover:border-primary border-borderColor"
          onClick={() => setPaymentType('manual')}
        >
          <div className="w-full">
            <div className="flex justify-center items-center">
              <BsBank2 className="size-10 group-hover:text-primary transition-all"></BsBank2>
            </div>
            <div>
              <h3 className="text-textBlack  text-center mt-2 group-hover:text-primary font-bold transition-all">
                Manual Deposit
              </h3>
              <p className="text-xs text-center md:text-sm text-textGrey">
                Processed in 3-5 minutes via bank transfer or crypto. Best for
                crypto payments.
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FundForm;

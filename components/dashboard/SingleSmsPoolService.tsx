import { config } from '@/config';
import { TSmsPoolServiceCountry } from '@/types';
import Image from 'next/image';
import React from 'react';
import { FaRocket, FaShoppingCart } from 'react-icons/fa';

type Props = {
  data: TSmsPoolServiceCountry;
};

const SingleSmsPoolService = (props: Props) => {
  const { data } = props;
  const { smsPoolServiceChargeInPercentage } = config;
  const serviceCharge =
    (parseFloat(data.price) * smsPoolServiceChargeInPercentage) / 100;
  console.log({ serviceCharge, smsPoolServiceChargeInPercentage });
  return (
    <div className="bg-white p-4 space-y-4 rounded-lg">
      <div className="flex gap-2  justify-between items-center">
        <div>
          <h6 className="text font-bold text-black">Country</h6>
          <div className="flex items-center mt-2 border light:border-gray-300 dark:border-gray-500 rounded-md p-2 gap-2">
            <Image
              src={`/assets/country/${data.short_name.toLocaleLowerCase()}.svg`}
              alt={data.name}
              width={20}
              height={20}
            />
            <p>{data.name}</p>
          </div>
        </div>
        <div>
          <h6 className=" font-bold text-black">Success Rate</h6>
          <div className="text-right items-center mt-2 bordder light:bdorder-gray-300 dark:bddorder-gray-500 rounded-md p-2 gap-2">
            <p>{data.success_rate}%</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2  justify-between items-center">
        <div>
          <h6 className="text-sm font-bold text-black">Lowest Price</h6>
          <div className="flex items-center mt-2 border light:border-gray-300 dark:border-gray-500 rounded-md p-2 gap-2">
            <p>${(parseFloat(data.low_price) + serviceCharge).toFixed(2)}</p>
          </div>
        </div>
        <div>
          <h6 className="text-sm font-bold text-black">Highest Price</h6>
          <div className="flex items-center mt-2 border light:border-gray-300 dark:border-gray-500 rounded-md p-2 gap-2">
            <p>${(parseFloat(data.price) + serviceCharge).toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2  justify-between items-end">
        <div>
          <h6 className="text-sm font-bold text-black">Stock</h6>
          <div
            className={`flex items-center mt-2 border light:border-gray-300 dark:border-gray-500 rounded-md p-2 gap-2 `}
          >
            <p>{data.stock}</p>
          </div>
        </div>
        <div>
          <button
            disabled={data.stock == 0}
            className="bg-primary disabled:opacity-70 disabled:cursor-not-allowed flex gap-4 items-center text-[#fff] px-4 py-2 rounded-md"
          >
            <FaRocket /> <span>Purchase</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleSmsPoolService;

import { config } from '@/config';
import { TSmsPoolServiceCountry } from '@/types';
import Image from 'next/image';
import React from 'react';
import { FaRocket, FaShoppingCart } from 'react-icons/fa';
import AppPopover from '../ui/AppPopover';
import AppModal from '../ui/AppModal';
import { useBuySmsPoolMutation } from '@/redux/features/smsPool/smsPoolApi';
import { toast } from 'react-toastify';

type Props = {
  data: TSmsPoolServiceCountry;
  selectedService: string;
};

const SingleSmsPoolService = (props: Props) => {
  const { data } = props;
  const { smsPoolServiceChargeInPercentage } = config;
  const [buySmsPool, { isLoading, isSuccess }] = useBuySmsPoolMutation();
  const serviceCharge =
    (parseFloat(data.price) * smsPoolServiceChargeInPercentage) / 100;

  const handleOrder = () => {
    buySmsPool({
      serviceId: props.selectedService.toString(),
      countryId: data.short_name,
    })
      .unwrap()
      .then(res => {
        toast.success('SMS pool purchased successfully');
      })
      .catch(err => {
        toast.error(err.data?.message || 'Something went wrong');
      });
    console.log(data, { selectedService: props.selectedService });
  };
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
          <AppModal
            // title="Buy SMS"
            // closeable={<div>dfd</div>}
            button={
              <button
                disabled={data.stock == 0}
                className="bg-primary disabled:opacity-70 disabled:cursor-not-allowed flex gap-4 items-center text-[#fff] px-4 py-2 rounded-md"
              >
                <FaRocket /> <span>Purchase</span>
              </button>
            }
          >
            <div className="w-[400px] p-4">
              {isSuccess ? (
                <div>
                  <h2 className="text-xl font-semibold text-light  mb-3">
                    Purchase Successful
                  </h2>
                  <p className="text-light mb-6">
                    You have successfully purchased the service.
                  </p>
                  <button
                    onClick={handleOrder}
                    className="bg-primary disabled:opacity-30 transition-all hover:opacity-90 text-white font-bold py-2 px-4 rounded"
                  >
                    Ok
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-light  mb-3">
                    Confirm Purchase
                  </h2>
                  <p className="text-light mb-6">
                    Are you sure you want to purchase this SMS service? It will
                    cost you between{' '}
                    <span className="text-primary font-bold ml-1">
                      ${(parseFloat(data.price) + serviceCharge).toFixed(2)}
                    </span>{' '}
                    to
                    <span className="text-primary font-bold ml-1">
                      ${(parseFloat(data.price) + serviceCharge).toFixed(2)}
                    </span>
                    .
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={handleOrder}
                      disabled={isLoading}
                      className="bg-primary disabled:opacity-30 transition-all hover:opacity-90 text-white font-bold py-2 px-4 rounded"
                    >
                      Confirm Purchase
                    </button>
                  </div>
                </div>
              )}
            </div>
          </AppModal>
        </div>
      </div>
    </div>
  );
};

export default SingleSmsPoolService;

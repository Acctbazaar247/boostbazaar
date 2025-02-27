import React from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AppButton from '../ui/AppButton';
import AppFormInput from '../ui/AppFormInput';
import AppFormSelect from '../ui/AppFormSelect';
import { useCurrencyRequestMutation } from '@/redux/features/dashboard/dashboardApi';
import { toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation';
import PaySelection from '../ui/PaySelection';
import AppInfo from '../ui/AppInfo';
import { FaDollarSign } from 'react-icons/fa';
import { config } from '@/config';
type Props = {
  setPaymentType: (state: 'online' | 'manual' | null) => void;
};

interface FormData {
  amount: number;
  method: 'korapay' | 'nowpayment';
}
const OnlinePayment = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();
  const router = useRouter();
  const [createCurrencyRequest, { isLoading }] = useCurrencyRequestMutation();

  const onSubmit: SubmitHandler<FormData> = async data => {
    if (!data.method) {
      toast.error('Please select a payment method below', { toastId: 1 });
      return;
    }
    if (data.method === 'korapay') {
      if (config.minAddFund > data.amount) {
        toast.error(`Minimum fun is $${config.minAddFund}`, { toastId: 1 });
        return;
      }
    } else {
      if (config.minAddFundCrypto > data.amount) {
        toast.error(`Minimum fun is $${config.minAddFundCrypto}`, {
          toastId: 1,
        });
        return;
      }
    }

    const submittedData = {
      data: { amount: data.amount },
      method: data.method,
    };
    await createCurrencyRequest(submittedData)
      .unwrap()
      .then(res => {
        // toast.success(res?.message);
        if (res?.data?.url) {
          router.replace(res?.data?.url);
          // redirect(res.data.url);
          // return { props: {} };
        }
        reset();
      })
      .catch(res => {
        toast.error(res?.data?.message);
      });
  };

  return (
    <div className="py-10 md:py-20">
      <h1 className="heading pb-4">Fund account</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-primary/80 rounded-lg p-4 md:p-8 space-y-4 md:space-y-8"
      >
        <div>
          <AppFormInput
            name="amount"
            type="number"
            label="Amount in USD"
            className="pl-10"
            register={register}
            required
            icon={<FaDollarSign></FaDollarSign>}
            placeholder="Enter amount "
            error={errors.amount}
            min={
              watch('method') === 'korapay'
                ? config.minAddFund
                : config.minAddFundCrypto
            }
          />
          {/* <p className="mt-2 text-sm text-primary">
            * Minimum funding amount is ${config.minAddFund}
          </p> */}
        </div>

        {/* <AppFormSelect
              name="method"
              label="Deposit Method"
              required
              placeholder="Enter method"
              options={options}
              control={control}
            /> */}
        <Controller
          name="method"
          control={control}
          render={({ fieldState, field }) => {
            return <PaySelection onChange={field.onChange}></PaySelection>;
          }}
        ></Controller>
        <div className="flex gap-3">
          <button
            onClick={() => props.setPaymentType(null)}
            className="text-primary border border-gray-500 px-4 py-2 rounded-lg"
          >
            Back
          </button>
          <AppButton
            disabled={isLoading}
            type="submit"
            className="  py-3"
            label="Confirm"
          />
        </div>
      </form>
      <AppInfo>
        <>
          <p>
            <b className="">Funding Your Account via Bank/Card Payment:</b> When
            funding your account using Bank/Card payment, the amount will be
            charged in Naira and automatically converted to USD in your account
            balance after a successful deposit. The Bank and Card feature allows
            you to fund your account via bank transfer, USSD, Apple Pay, Google
            Pay, and debit/credit card payments—all in Naira. No additional fees
            are charged for funding your account.
            <br />
            <b className="mt-2 inline-block">
              Funding Your Account with Cryptocurrencies:
            </b>{' '}
            When funding with cryptocurrencies, ensure you copy the exact
            transaction amount displayed and select the same network that you
            are sending from. You can fund your account using USDT, Solana, LTC,
            Tron, BNB, and more. If you encounter any issues with the payment
            system, please contact us at{' '}
            <a
              className="text-primary underline "
              href="mailto:support@acctpanel.com"
            >
              support@acctpanel.com
            </a>
          </p>
        </>
      </AppInfo>
    </div>
  );
};

export default OnlinePayment;

"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AppButton from "../ui/AppButton";
import AppFormInput from "../ui/AppFormInput";
import AppFormSelect from "../ui/AppFormSelect";
import { useCurrencyRequestMutation } from "@/redux/features/dashboard/dashboardApi";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import PaySelection from "../ui/PaySelection";
import AppInfo from "../ui/AppInfo";
import { FaDollarSign } from "react-icons/fa";

interface FormData {
  amount: number;
  method: string;
}

const FundForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormData>();
  const router = useRouter();
  const [createCurrencyRequest, { isLoading }] = useCurrencyRequestMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.method) {
      toast.error("Please select a payment method below", { toastId: 1 });
      return;
    }
    if (8 > data.amount) {
      toast.error("Minimum fun is $8", { toastId: 1 });
      return;
    }
    const submittedData = {
      data: { amount: data.amount },
      method: data.method
    };
    await createCurrencyRequest(submittedData)
      .unwrap()
      .then((res) => {
        // toast.success(res?.message);
        if (res?.data?.url) {
          router.replace(res?.data?.url);
          // redirect(res.data.url);
          // return { props: {} };
        }
        reset();
      })
      .catch((res) => {
        toast.error(res?.data?.message);
      });
  };

  const options = [
    { label: "Flutterwave", value: "flutturewave" },
    { label: "Cryptomus", value: "cryptomus" }
  ];

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
            min={5}
          />
          <p className="mt-2 text-sm text-primary">
            * Minimum funding amount is $8
          </p>
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
        <AppButton
          disabled={isLoading}
          type="submit"
          className="w-full py-3"
          label="Confirm"
        />
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
            </b>{" "}
            When funding with cryptocurrencies, ensure you copy the exact
            transaction amount displayed and select the same network that you
            are sending from. You can fund your account using USDT, Solana, LTC,
            Tron, BNB, and more. If you encounter any issues with the payment
            system, please contact us at{" "}
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

export default FundForm;

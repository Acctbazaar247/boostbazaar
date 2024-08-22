"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppButton from "../ui/AppButton";
import AppFormInput from "../ui/AppFormInput";
import AppFormSelect from "../ui/AppFormSelect";
import { useCurrencyRequestMutation } from "@/redux/features/dashboard/dashboardApi";
import { toast } from "react-toastify";

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
    reset,
  } = useForm<FormData>();
  const [createCurrencyRequest, { isLoading }] = useCurrencyRequestMutation();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    const submittedData = {
      data: { amount: data.amount },
      method: data.method,
    };

    await createCurrencyRequest(submittedData)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        reset();
      })
      .catch((res) => {
        toast.error(res?.data?.message);
      });
  };

  const options = [
    { label: "Paystack", value: "paystack" },
    { label: "Cryptomus", value: "cryptomus" },
  ];

  return (
    <div className="py-10 md:py-20">
      <h1 className="heading pb-4">Fund account</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-primary/80 rounded-lg p-4 md:p-8 space-y-4 md:space-y-8"
      >
        <AppFormInput
          name="amount"
          type="number"
          label="Amount"
          className="pl-4"
          register={register}
          required
          placeholder="Enter amount"
          error={errors.amount}
        />

        <AppFormSelect
          name="method"
          label="Deposit Method"
          required
          placeholder="Enter method"
          options={options}
          control={control}
        />

        <AppButton
          disabled={isLoading}
          type="submit"
          className="w-full py-3"
          label="Confirm"
        />
      </form>
    </div>
  );
};

export default FundForm;

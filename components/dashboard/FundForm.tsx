"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppButton from "../ui/AppButton";
import AppFormInput from "../ui/AppFormInput";

interface FormData {
  amount: number;
  method: string;
}

const FundForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };

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

        <AppFormInput
          name="method"
          type="text"
          label="Deposit Method"
          className="pl-4"
          register={register}
          required
          placeholder="Enter method"
          error={errors.method}
        />

        <AppButton type="submit" className="w-full py-3" label="Confirm" />
      </form>
    </div>
  );
};

export default FundForm;

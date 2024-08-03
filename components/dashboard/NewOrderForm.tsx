"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppButton from "../ui/AppButton";
import AppFormInput from "../ui/AppFormInput";

interface FormData {
  category: string;
  service: string;
  link: string;
  quantity: string;
  charge: string;
}

const NewOrderForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };

  return (
    <div className="py-20">
      <h1 className="heading pb-4">New Order</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-primary/80 rounded-lg p-8 space-y-5"
      >
        <AppFormInput
          name="category"
          type="text"
          label="Category"
          register={register}
          required
          placeholder="Enter category"
          error={errors.category}
        />

        <AppFormInput
          name="service"
          type="text"
          label="Service"
          register={register}
          required
          placeholder="Enter service"
          error={errors.service}
        />
        <AppFormInput
          name="link"
          type="text"
          label="Link"
          register={register}
          required
          placeholder="Enter link"
          error={errors.link}
        />
        <AppFormInput
          name="quantity"
          type="text"
          label="Quantity"
          register={register}
          required
          placeholder="Enter quantity"
          error={errors.quantity}
        />
        <AppFormInput
          name="charge"
          type="text"
          label="Charge"
          register={register}
          required
          placeholder="Enter charge"
          error={errors.charge}
        />

        <AppButton type="submit" className="w-full py-3" label="Proceed" />
      </form>
    </div>
  );
};

export default NewOrderForm;

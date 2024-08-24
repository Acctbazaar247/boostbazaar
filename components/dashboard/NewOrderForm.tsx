"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppButton from "../ui/AppButton";
import AppFormInput from "../ui/AppFormInput";
import { CategorizedService, IService } from "@/types";
import { servicesCategory } from "./dashboardData";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { categorizeServices } from "@/utils/categorizedArray";
import AppFormSelect from "../ui/AppFormSelect";
import {
  setCategorizedService,
  setCategory,
} from "@/redux/features/dashboard/serviceSlice";
import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "@/redux/features/dashboard/dashboardApi";
import { toast } from "react-toastify";

interface FormData {
  category: string;
  service: string;
  link: string;
  quantity: string;
  charge: string;
}

const NewOrderForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const [selectServices, setSelectServices] = useState<IService[]>([]);
  const [nowService, setNowService] = useState<IService>();

  const { categorizedService, category, services } = useAppSelector(
    (store) => store.service
  );

  useEffect(() => {
    dispatch(setCategorizedService(categorizeServices(services)));

    const selectedCategory = categorizedService.find(
      (cat) => cat.name === category
    );

    // Set the services based on the selected category
    if (selectedCategory) {
      setSelectServices(selectedCategory.services);
    } else {
      setSelectServices([]);
    }
  }, [category, services]);

  function calculateCharge(quantity: number, ratePerThousand: number): string {
    return ((quantity / 1000) * (ratePerThousand * 1.1)).toFixed(2);
  }

  useEffect(() => {
    if (watch("service")) {
      const service = selectServices.find(
        (service) => service.service === watch("service")
      );
      setNowService(service);
    }
  }, [watch("service")]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const submittedData = {
      accountCategory: category,
      quantity: data.quantity,
      japServiceId: data.service,
      link: data.link,
    };
    console.log(data);
    await createOrder(submittedData)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        reset();
      })
      .catch((res) => {
        toast.error(res?.data?.message);
      });
  };

  return (
    <div id="new-order-form" className="py-10 md:py-20">
      <h1 className="heading pb-4">New Order</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-primary/80 rounded-lg p-4 md:p-8 space-y-5"
      >
        <AppFormSelect
          name="category"
          label="Category"
          className=""
          handleChange={(e) => dispatch(setCategory(e))}
          value={category}
          placeholder="Enter category"
          options={servicesCategory.map((cat) => ({
            value: cat.name,
            label: cat.name,
          }))}
          control={control}
        />

        <AppFormSelect
          name="service"
          label="Service"
          className=""
          required
          placeholder="Enter service"
          options={selectServices.map((service) => ({
            label: service.name,
            value: service.service,
          }))}
          control={control}
        />

        <AppFormInput
          name="link"
          type="url"
          label="Link"
          className="pl-4"
          register={register}
          required
          placeholder="Enter link"
          error={errors.link}
        />
        <AppFormInput
          name="quantity"
          type="number"
          label="Quantity"
          min={nowService?.min}
          max={nowService?.max}
          className="pl-4"
          register={register}
          required
          placeholder="Enter quantity"
          error={errors.quantity}
        />
        <AppFormInput
          name="charge"
          type="text"
          disabled={true}
          value={
            nowService && watch("quantity")
              ? calculateCharge(
                  parseFloat(watch("quantity")),
                  parseFloat(nowService.rate)
                )
              : 0
          }
          label="Charge"
          className="pl-4"
          register={register}
          placeholder="Enter charge"
          error={errors.charge}
        />

        <AppButton
          disabled={isLoading}
          type="submit"
          className="w-full py-3"
          label="Proceed"
        />
      </form>
    </div>
  );
};

export default NewOrderForm;

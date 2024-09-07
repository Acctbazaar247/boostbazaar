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
  setCategory
} from "@/redux/features/dashboard/serviceSlice";
import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "@/redux/features/dashboard/dashboardApi";
import { toast } from "react-toastify";
import { FaRegUser, FaTelegramPlane } from "react-icons/fa";
import { config } from "@/config";

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
    formState: { errors }
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
    // Get the increase percentage from the environment, defaulting to 10 if not set
    const increasePercentage = config.increaseRatePercentage;

    // Calculate the increased rate based on the percentage
    const increasedRate = (increasePercentage / 100) * ratePerThousand;
    const rate = ratePerThousand + increasedRate;

    const main = (quantity / 1000) * rate;
    const fake = (quantity / 1000) * ratePerThousand;
    // Calculate the total charge and return it, rounded to two decimal places
    return [main.toFixed(3), fake].join("/");
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
      link: data.link
    };
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
    <div
      id="new-order-form"
      className="py-10 md:py-20 flex flex-col  lg:flex-row gap-[30px] "
    >
      <div className="w-full max-w-[900px]">
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
              label: cat.name
            }))}
            control={control}
          />

          <AppFormSelect
            name="service"
            label="Service"
            listHeight={window.innerHeight - 20}
            required
            className="service"
            placeholder="Enter service"
            options={selectServices.map((service) => ({
              label: (
                <p className=" whitespace-pre-line w-[290px]  md:w-[400px] text-[12px] md:text-[14px] lg:text-[18px] border-b border-gray-600 pb-0  lg:w-[700px] leading-[19px]  ">
                  {service.service}-{service.name}
                </p>
              ),
              value: service.service
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
            placeholder="Enter Link"
            error={errors.link}
          />
          <span className="text-sm text-primary inline-block mt-2">
            https://website.com
          </span>
          <div>
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
            {nowService?.min && (
              <div className="flex items-center text-sm mt-2 gap-2 text-dark-grey font-normal text-primary">
                <span>Minimum Quantity: {nowService.min}</span>
                <span>Maximum Quantity: {nowService.max}</span>
              </div>
            )}
          </div>
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
      <div className="md:w-[400px] md:mt-[60px] w-full md:min-w-[400px]">
        <div className="w-full py-5 bg-primary pl-[30px] pr-[20px]">
          <h2 className="text-xl text-white dark:text-[#fff] light:text-[#fff]">
            NEW ORDER INFORMATION
          </h2>
        </div>
        <div className="text-[13px]  dark:bg-slate-900 light:bg-slate-100 ">
          <div className="pl-[30px] pt-4 pr-[20px]  pb-4 border-b border-slate-300">
            <h3 className="text-primary font-bold">
              Selecting Categories Not Listed
            </h3>
            <p>
              If the category you need isn&#39;t listed among the main
              categories, select &quot;Others&quot; and review the service menu
              below. The service you&#39;re looking for will be listed under
              &quot;Other&quot; subcategories in this menu.
            </p>
          </div>
          <div className="pl-[30px] pt-4 pr-[20px]  pb-4 border-b border-slate-300">
            <h3 className="text-primary font-bold">Entering Links Correctly</h3>
            <p>
              When entering the link for the service to be delivered to, ensure
              you include &quot;<span className="text-primary">https://</span>
              &quot; before typing the rest of the URL. For example, if
              you&rsquo;re boosting Instagram followers for your page, enter the
              link in this format: &rsquo;
              <span className="text-primary">
                https://instagram.com/username
              </span>
              &rsquo;. This format may vary depending on the service you&apos;re
              ordering, but the &rsquo;
              <span className="text-primary">https://</span>
              &rsquo; is essential to ensure you get the desired results.
            </p>
          </div>
          <div className="pl-[30px] pt-4 pr-[20px]  pb-4 ">
            <h3 className="text-primary font-bold">Checking Quantity Range</h3>
            <p>
              Always verify the quantity range; each service has a different
              minimum and maximum quantity. Ensure your quantity falls within
              the specified range, which you&apos;ll see written below the
              quantity menu when you select a service.
            </p>
            <div className="mt-4">
              <div className="flex gap-2 items-center">
                <div className="size-[30px] bg-primary flex justify-center items-center rounded-full">
                  <FaRegUser className="text-white"></FaRegUser>
                </div>
                <a href="mailto:support@acctpanel.com" className="text-primary">
                  support@acctpanel.com
                </a>
              </div>
              <div className="flex mt-4 gap-2 items-center">
                <div className="size-[30px] bg-primary flex justify-center items-center rounded-full">
                  <FaTelegramPlane className="text-white"></FaTelegramPlane>
                </div>
                <a href="https://t.me/acctpanel" className="text-primary">
                  @acctpanel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderForm;

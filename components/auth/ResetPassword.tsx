"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppFormInput from "../ui/AppFormInput";
import AppButton from "../ui/AppButton";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { TbNumber123 } from "react-icons/tb";

interface FormData {
  code: string;
}

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-[80%] space-y-5"
    >
      <AppFormInput
        name="code"
        type="number"
        label="Enter code"
        register={register}
        required
        icon={<TbNumber123 />}
        placeholder="Enter code"
        error={errors.code}
      />

      <AppButton type="submit" className="w-full py-3" label="Continue" />

      <p className="text-center">
        Don&apos;t receive code?{" "}
        <button type="button" className="text-primary font-medium">
          Click to resend
        </button>
      </p>

      <Link
        href={"/auth/sign-in"}
        className="text-dark-grey text-center flex items-center justify-center gap-1 font-medium"
      >
        <IoArrowBackOutline className="text-lg" /> Back to log in
      </Link>
    </form>
  );
};

export default ResetPassword;

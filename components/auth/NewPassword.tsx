"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppFormInput from "../ui/AppFormInput";
import AppButton from "../ui/AppButton";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FormData {
  password: string;
  confirmPassword: string;
}

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const { otp } = useAppSelector((state) => state.auth);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const submittedData = {
      otp: otp,
      email: user?.email,
      password: data.password,
    };
    await changePassword(submittedData)
      .unwrap()
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        toast.success(res?.message);
        // dispatch(setOtp({ otp: res.code }));
        router.push("/auth/sign-in");
      })
      .catch((res) => {
        toast.error(res?.data?.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-[80%] space-y-5"
    >
      <AppFormInput
        name="password"
        type="password"
        label="password"
        register={register}
        required
        icon={<MdOutlineLock />}
        placeholder="at least 8 character"
        error={errors.password}
      />
      <AppFormInput
        name="confirmPassword"
        type="password"
        label="Confirm password"
        register={register}
        required
        icon={<MdOutlineLock />}
        placeholder="Enter confirm password"
        error={errors.confirmPassword}
      />
      <div className="pt-8">
        <AppButton
          disabled={isLoading}
          type="submit"
          className="w-full py-3"
          label="Confirm"
        />
      </div>

      <Link
        href={"/auth/sign-in"}
        className="text-dark-grey text-center flex items-center justify-center gap-1 font-medium"
      >
        <IoArrowBackOutline className="text-lg" /> Back to log in
      </Link>
    </form>
  );
};

export default NewPassword;

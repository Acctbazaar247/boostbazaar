"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppButton from "../ui/AppButton";
import AppFormInput from "../ui/AppFormInput";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hook";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";

interface FormData {
  password: number;
  newPassword: string;
  confirmPassword: string;
}

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const [changePassword] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const submittedData = {
      token,
      email: user?.email,
      password: data.password,
    };

    await changePassword(submittedData)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((res) => {
        toast.error(res?.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-primary/80 rounded-lg p-4 md:p-8 space-y-4 md:space-y-8"
    >
      <AppFormInput
        name="password"
        type="password"
        label="Current password"
        className="pl-4"
        register={register}
        required
        placeholder="*******"
        error={errors.password}
      />

      <AppFormInput
        name="newPassword"
        type="password"
        label="New Password"
        className="pl-4"
        register={register}
        required
        placeholder="*******"
        error={errors.newPassword}
      />

      <AppFormInput
        name="confirmPassword"
        type="password"
        label="Confirm New Password"
        className="pl-4"
        register={register}
        required
        placeholder="*******"
        error={errors.confirmPassword}
      />

      <AppButton type="submit" className="w-full py-3" label="Confirm" />
    </form>
  );
};

export default ProfileForm;

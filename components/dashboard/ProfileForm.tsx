"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppButton from "../ui/AppButton";
import AppFormInput from "../ui/AppFormInput";

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-primary/80 rounded-lg p-4 md:p-8 space-y-4 md:space-y-8"
    >
      <AppFormInput
        name="password"
        type="number"
        label="Current password"
        className="pl-4"
        register={register}
        required
        placeholder="*******"
        error={errors.password}
      />

      <AppFormInput
        name="newPassword"
        type="text"
        label="New Password"
        className="pl-4"
        register={register}
        required
        placeholder="*******"
        error={errors.newPassword}
      />

      <AppFormInput
        name="confirmPassword"
        type="text"
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

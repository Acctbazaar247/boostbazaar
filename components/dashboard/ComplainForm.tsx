"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppButton from "../ui/AppButton";
import AppFormInput from "../ui/AppFormInput";
import AppFormTextArea from "../ui/AppFormTextArea";
import { toast } from "react-toastify";
import { useCreateTicketMutation } from "@/redux/features/dashboard/dashboardApi";

interface FormData {
  subject: string;
  message: string;
}

const ComplainForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await createTicket(data)
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-primary/80 rounded-lg p-4 md:p-8 space-y-4 md:space-y-8"
    >
      <AppFormInput
        name="subject"
        type="text"
        label="Subject"
        className="pl-4"
        register={register}
        required
        placeholder="Enter subject"
        error={errors.subject}
      />

      <AppFormTextArea
        name="message"
        register={register}
        required
        label="Write a message"
        placeholder="Write your message here..."
        error={errors.message}
      />

      <AppButton
        disabled={isLoading}
        type="submit"
        className="w-full py-3"
        label="Confirm"
      />
    </form>
  );
};

export default ComplainForm;

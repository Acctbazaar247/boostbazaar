"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppButton from "../ui/AppButton";
import AppFormInput from "../ui/AppFormInput";
import { useState } from "react";
import { Rate } from "antd";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import AppFormTextArea from "../ui/AppFormTextArea";
import { useCreateReviewMutation } from "@/redux/features/dashboard/dashboardApi";

interface FormData {
  title: string;
  review: string;
}

const ReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [star, setStar] = useState(3);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await createReview({ star, ...data })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        reset();
      })
      .catch((res) => {
        toast.error(res?.data?.message);
      });
  };

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  return (
    <>
      <div className="max-w-md mx-auto space-y-4 md:space-y-8 text-center pb-10">
        <p className="text-sm text-dark-grey/80">Tap the Stars to Choose</p>

        <Rate
          className="text-4xl flex items-center justify-center gap-5"
          tooltips={desc}
          onChange={setStar}
          value={star}
        />

        <h3 className="text-xl">What did you dislike about this service?</h3>
        <h3 className="text-dark-grey/80">HOW CAN WE IMPROVE IT?</h3>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-primary/80 rounded-lg p-4 md:p-8 space-y-4 md:space-y-8"
      >
        <AppFormInput
          name="title"
          type="text"
          label="Review Title"
          register={register}
          className="pl-4"
          required
          placeholder="Enter Review Title"
          error={errors.title}
        />
        <AppFormTextArea
          name="review"
          register={register}
          required
          label="Write a Review"
          placeholder="Write your review here..."
          error={errors.review}
        />

        <AppButton
          type="submit"
          disabled={isLoading}
          className="w-full py-3"
          label="Submit Review"
        />
      </form>
    </>
  );
};

export default ReviewForm;

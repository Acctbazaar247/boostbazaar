"use client";

import ProfileForm from "@/components/dashboard/ProfileForm";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useUploadImageMutation } from "@/redux/features/dashboard/dashboardApi";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const user = useAppSelector(selectCurrentUser);

  const [profileImage, setProfileImage] = useState("/image/camera.png");
  const [updateUserProfile, { isSuccess }] = useUploadImageMutation();

  const handleProfileUpload = async () => {
    if (!profileImage) {
      toast.error("Please Select profile image and try again");
    } else {
      const loadingToast = toast.loading("Uploading...🚀");
      await updateUserProfile({ profileImg: profileImage })
        .unwrap()
        .then((res: any) => {
          toast.dismiss(loadingToast);
          toast.success(res?.message || "Profile Image update Successful 👍");
        })
        .catch((res: any) => {
          toast.dismiss(loadingToast);
          toast.error(res?.data?.message || "something went wrong");
        });
    }
  };

  const handleFileChange = (e: any) => {
    const maxSizeInBytes = 2 * 1024 * 1024;
    const file = e.target.files?.[0];

    if (file?.size && file.size > maxSizeInBytes) {
      return toast.error("Your file was more than 4 Megabyte!", {
        toastId: 1,
      });
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <AnimationWrapper className="py-12 container">
      <h1 className="heading">Profile</h1>

      <div className="flex gap-4 md:gap-10 justify-between py-6">
        <div className="w-fit border border-primary rounded-2xl p-2 md:p-5">
          <label
            htmlFor="uploadImg"
            className="relative block size-32 md:size-36 bg-grey rounded-full overflow-hidden"
          >
            <Image
              className="w-full h-full"
              src={profileImage as string}
              alt="profileImage"
              width={200}
              height={200}
            />
            <div className="w-full h-full absolute inset-0 flex items-center justify-center text-white text-sm font-semibold bg-black/50 opacity-0 hover:opacity-100 cursor-pointer">
              Upload Image
            </div>
          </label>
          <button
            onClick={handleProfileUpload}
            disabled={(profileImage?.length as number) < 500}
            className="bg-primary rounded-full text-white py-1 mt-2 max-lg:center lg:w-full px-10"
          >
            Upload
          </button>
          <input
            type="file"
            name=""
            id="uploadImg"
            accept=".jpeg, .png, .jpg"
            hidden
            onChange={handleFileChange}
          />
        </div>

        <div className="text-sm md:w-10/12 border border-primary flex flex-col justify-evenly px-3 md:p-5 rounded-2xl">
          <p className=" md:text-lg">
            <span className="text-sm md:text-2xl font-medium">Name: </span>
            {user?.name}
          </p>
          <p className="md:text-lg">
            <span className="text-sm md:text-2xl font-medium">Email: </span>
            {user?.email}
          </p>
          <p className="md:text-lg">
            <span className="text-sm md:text-2xl font-medium">Status: </span>
            Online
          </p>
        </div>
      </div>
      <ProfileForm />
    </AnimationWrapper>
  );
};

export default Page;

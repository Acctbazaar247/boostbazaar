"use client";

import ProfileForm from "@/components/dashboard/ProfileForm";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { useUpdateUserMutation } from "@/redux/features/auth/authApi";
import {
  selectCurrentUser,
  setUserProfileImage,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [profileImage, setProfileImage] = useState(
    user?.profileImg === "/assets/demo-user.png"
      ? "/image/camera.png"
      : user?.profileImg
  );

  const [updateUser] = useUpdateUserMutation();

  const handleProfileUpload = async () => {
    if (!profileImage || profileImage === "/image/camera.png") {
      toast.error("Please select a profile image and try again");
      return;
    }

    const loadingToast = toast.loading("Uploading...🚀");

    try {
      // Create a new FormData instance
      const formData = new FormData();

      // If profileImage is a base64 string, convert it to a Blob and append it to FormData
      if (profileImage.startsWith("data:image")) {
        const blob = await (await fetch(profileImage)).blob();
        formData.append("image", blob, "profileImage.png");
      } else {
        formData.append("image", profileImage);
      }

      // Perform the fetch request
      const response = await fetch(
        "https://acct-media-server.onrender.com/api/v1/uploadImg",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong during the upload");
      }

      const data = await response.json();
      // console.log(data);
      if (data.data) {
        dispatch(setUserProfileImage(data.data.url));
        const submittedData = {
          id: user?.id,
          data: {
            profileImg: data.data.url,
          },
        };
        await updateUser(submittedData)
          .unwrap()
          .then((res) => {});
      }
      toast.dismiss(loadingToast);
      toast.success(data.message || "Profile image updated successfully 👍");
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(error.message || "Something went wrong");
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
  // console.log(profileImage);
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
          {/* <p className="md:text-lg">
            <span className="text-sm md:text-2xl font-medium">Status: </span>
            Online
          </p> */}
        </div>
      </div>
      <ProfileForm />
    </AnimationWrapper>
  );
};

export default Page;

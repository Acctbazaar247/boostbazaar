"use client";

import AuthWrapper from "@/components/auth/AuthWrapper";
import VerifyUser from "@/components/auth/VerifyUser";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import forgot from "@/assets/image/forgot-password.png";

const Page = () => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <AnimationWrapper>
      <AuthWrapper
        src={forgot}
        title="Verify OTP"
        subTitle={`Input the code we sent to your email ${user?.email}.`}
      >
        <VerifyUser />
      </AuthWrapper>
    </AnimationWrapper>
  );
};

export default Page;

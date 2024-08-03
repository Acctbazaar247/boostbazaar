import AuthWrapper from "@/components/auth/AuthWrapper";
import NewPassword from "@/components/auth/NewPassword";
import AnimationWrapper from "@/components/ui/AnimationWrapper";

const page = () => {
  return (
    <AnimationWrapper>
      <AuthWrapper
        src="/image/new-password.png"
        title="New password"
        subTitle="Enter your new password."
      >
        <NewPassword />
      </AuthWrapper>
    </AnimationWrapper>
  );
};

export default page;

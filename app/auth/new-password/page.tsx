import AuthWrapper from "@/components/auth/AuthWrapper";
import NewPassword from "@/components/auth/NewPassword";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import newPass from "@/assets/image/new-password.png";

const page = () => {
  return (
    <AnimationWrapper>
      <AuthWrapper
        src={newPass}
        title="New password"
        subTitle="Enter your new password."
      >
        <NewPassword />
      </AuthWrapper>
    </AnimationWrapper>
  );
};

export default page;

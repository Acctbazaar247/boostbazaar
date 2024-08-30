import AuthWrapper from "@/components/auth/AuthWrapper";
import ForgotPassword from "@/components/auth/ForgotPassword";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import forgot from "@/assets/image/forgot-password.png";

const page = () => {
  return (
    <AnimationWrapper>
      <AuthWrapper
        src={forgot}
        title="Forgot password"
        subTitle="Enter your e-mail, we will send a code to your email
to reset your password."
      >
        <ForgotPassword />
      </AuthWrapper>
    </AnimationWrapper>
  );
};

export default page;

import AuthWrapper from "@/components/auth/AuthWrapper";
import ResetPassword from "@/components/auth/ResetPassword";
import AnimationWrapper from "@/components/ui/AnimationWrapper";

const page = () => {
  return (
    <AnimationWrapper>
      <AuthWrapper
        src="/image/sign-up.png"
        title="Password reset"
        subTitle="Input the code we sent to your e-mail majidadams200@gmail.com."
      >
        <ResetPassword />
      </AuthWrapper>
    </AnimationWrapper>
  );
};

export default page;

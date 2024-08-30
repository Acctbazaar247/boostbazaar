import AuthWrapper from "@/components/auth/AuthWrapper";
import ResetPassword from "@/components/auth/ResetPassword";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import signIn from "@/assets/image/sign-up.png";

const page = () => {
  return (
    <AnimationWrapper>
      <AuthWrapper
        src={signIn}
        title="Password reset"
        subTitle="Input the code we sent to your e-mail majidadams200@gmail.com."
      >
        <ResetPassword />
      </AuthWrapper>
    </AnimationWrapper>
  );
};

export default page;

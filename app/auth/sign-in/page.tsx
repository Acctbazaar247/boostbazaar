import AuthWrapper from "@/components/auth/AuthWrapper";
import SignInForm from "@/components/auth/SignInForm";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import signIn from "@/assets/image/sign-in.png";

const page = () => {
  return (
    <AnimationWrapper>
      <AuthWrapper
        src={signIn}
        title="Log in"
        subTitle="Log in with your details and continue your
      social media presence."
      >
        <SignInForm />
      </AuthWrapper>
    </AnimationWrapper>
  );
};

export default page;

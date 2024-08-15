import ComplainForm from "@/components/dashboard/ComplainForm";
import AnimationWrapper from "@/components/ui/AnimationWrapper";

const page = () => {
  return (
    <AnimationWrapper className="py-10 md:py-24 container">
      <h1 className="heading pb-6">Complain</h1>
      <ComplainForm />
    </AnimationWrapper>
  );
};

export default page;

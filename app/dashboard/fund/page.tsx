import FundForm from "@/components/dashboard/FundForm";
import AnimationWrapper from "@/components/ui/AnimationWrapper";

const page = () => {
  return (
    <div className=" container">
      <AnimationWrapper>
        <FundForm />
      </AnimationWrapper>
    </div>
  );
};

export default page;

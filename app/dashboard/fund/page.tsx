import FundForm from "@/components/dashboard/FundForm";
import AnimationWrapper from "@/components/ui/AnimationWrapper";

const page = () => {
  return (
    <div className="py-20 container">
      <AnimationWrapper>
        <FundForm />
      </AnimationWrapper>
    </div>
  );
};

export default page;

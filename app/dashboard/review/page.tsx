import ReviewForm from "@/components/dashboard/ReviewForm";
import AnimationWrapper from "@/components/ui/AnimationWrapper";

const page = () => {
  return (
    <div className="py-20 container">
      <AnimationWrapper>
        <ReviewForm />
      </AnimationWrapper>
    </div>
  );
};

export default page;

import Image from "next/image";
import Logo from "../ui/Logo";
import why from "@/assets/image/why-choose.png";

const WhyChoose = () => {
  return (
    <section className="pt-20 pb-8 md:py-52 2xl:py-56 container grid grid-cols-1 md:grid-cols-2 md:gap-7">
      <Image
        data-aos="fade-right"
        src={why}
        className="w-full"
        width={700}
        height={660}
        alt="why chose image"
      />
      <div
        data-aos="fade-left"
        className="py-16 2xl:py-20 md:pr-10 2xl:pr-12 space-y-8"
      >
        <h1 className="heading">Why Choose Us?</h1>
        <p className="text-dark-grey text-xl 2xl:text-2xl font-light leading-8">
          AcctPanel is a cutting-edge platform offering engagement and SMS verification services. Users can easily purchase SMS for online platforms, social media followers, likes, views, watch time, and comments—all in one place.           
        </p>
        
        <p className="text-dark-grey text-xl 2xl:text-2xl font-light leading-8">
          Designed for a seamless experience, we prioritize security, quality services, and user satisfaction.
        </p>

        <Logo parentClassName="lg:pt-8 2xl:pt-12" />
      </div>
    </section>
  );
};

export default WhyChoose;

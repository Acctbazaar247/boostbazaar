import Image from "next/image";
import Logo from "../ui/Logo";

const WhyChoose = () => {
  return (
    <section className="pt-20 pb-8 md:py-52 2xl:py-56 container grid grid-cols-1 md:grid-cols-2 md:gap-7">
      <Image
        src={"/image/why-choose.png"}
        className="w-full"
        width={700}
        height={660}
        alt="why chose image"
      />
      <div className="py-16 2xl:py-20 md:pr-10 2xl:pr-12 space-y-8">
        <h1 className="heading">Why Choose Us?</h1>
        <p className="text-dark-grey text-xl 2xl:text-2xl font-light leading-8">
          BoostBazaar is an innovative platform designed to offer a
          comprehensive suite of Social Media Services. Users can conveniently
          access and purchase various services, including social media
          followers, likes, views, watch time, and comments, all in one place.
          The goal is to create a platform that is both esthetically pleasing
          and user- friendly.
        </p>
        <p className="text-dark-grey text-xl 2xl:text-2xl font-light leading-8">
          We ensure adequate security, services and satisfaction.
        </p>

        <Logo parentClassName="lg:pt-8 2xl:pt-12" />
      </div>
    </section>
  );
};

export default WhyChoose;

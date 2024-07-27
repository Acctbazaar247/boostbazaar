import Image from "next/image";

const WhyChoose = () => {
  return (
    <section className="py-56 container grid grid-cols-1 md:grid-cols-2 gap-7">
      <Image
        src={"/image/why-choose.png"}
        className="w-full"
        width={700}
        height={660}
        alt="why chose image"
      />
      <div className="py-20 pr-12 space-y-8">
        <h1 className="heading">Why Choose Us?</h1>
        <p className="text-dark-grey text-2xl font-light leading-8">
          BoostBazaar is an innovative platform designed to offer a
          comprehensive suite of Social Media Services. Users can conveniently
          access and purchase various services, including social media
          followers, likes, views, watch time, and comments, all in one place.
          The goal is to create a platform that is both esthetically pleasing
          and user- friendly.
        </p>
        <p className="text-dark-grey text-2xl font-light leading-8">
          We ensure adequate security, services and satisfaction.
        </p>
        <Image
          src={"/image/logo.png"}
          width={200}
          height={50}
          alt="logo"
          className="pt-16"
        />
      </div>
    </section>
  );
};

export default WhyChoose;

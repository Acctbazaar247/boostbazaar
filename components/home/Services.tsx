import Image from "next/image";

const Services = () => {
  const servicesData = [
    {
      image: "/image/service1.png",
      title: "Facebook",
    },
    {
      image: "/image/service2.png",
      title: "Instagram",
    },
    {
      image: "/image/service3.png",
      title: "Linkedin",
    },
    {
      image: "/image/service4.png",
      title: "X",
    },
    {
      image: "/image/service5.png",
      title: "Telegram",
    },
    {
      image: "/image/service6.png",
      title: "Youtube",
    },
    {
      image: "/image/service7.png",
      title: "Tiktok",
    },
    {
      image: "/image/service8.png",
      title: "Shopify",
    },
  ];

  return (
    <section id="Services" className="container scroll-m-28 md:scroll-m-44">
      <div className="bg-primary-7 relative pt-16 pb-10 md:py-20 center flex-col rounded-t-lg shadow-md -mb-0.5">
        <h1 className="heading">Our Services</h1>
        <p className="leading-6 text-dark-grey">
          Unlimited services that keeps your brand atop
        </p>

        <div className="absolute top-0">
          <div className="relative">
            <Image
              src={"/image/e.png"}
              width={112}
              height={55}
              alt="logo"
              className=""
            />
            <div className="absolute w-full center -top-9">
              <Image
                src={"/image/se.png"}
                width={80}
                height={80}
                alt="logo"
                className=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10">
        {servicesData.map((service, i) => (
          <div
            key={i}
            className="bg-white drop-shadow-md border border-primary/50 rounded-lg text-center"
          >
            <div className="relative">
              <Image
                src={service.image}
                width={400}
                height={180}
                alt="logo"
                className="w-full h-auto 2xl:h-44"
              />
            </div>
            <h3 className="text-base md:text-2xl pb-8 md:pb-16 pt-4 md:pt-8">
              {service.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

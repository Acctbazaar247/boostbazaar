import NewOrderForm from "@/components/dashboard/NewOrderForm";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { FaNairaSign } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

const page = () => {
  const marqueTexts = [
    "We are thrilled to announce to our july customers who purchased our service above ",
    "We are thrilled to announce to our july customers who purchased our service above ",
    "We are thrilled to announce to our july customers who purchased our service above ",
  ];
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
  ];

  return (
    <AnimationWrapper>
      <Marquee
        speed={40}
        direction="right"
        className="w-fit bg-primary/5 my-16 py-3 text-sm"
        autoFill={true}
      >
        {marqueTexts.map((text) => (
          <p key={text} className=" flex items-center gap-1 pl-12">
            <GoDotFill />
            {text}
          </p>
        ))}
      </Marquee>

      <div className="container">
        <div className="grid grid-cols-2 gap-20">
          <div className="border border-primary/50 bg-primary/10 p-5 space-y-5 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-dark-grey">Main balance</h3>
              <button className="bg-white text-primary font-light rounded px-2 py-1">
                Add funds
              </button>
            </div>
            <h1 className="text-2xl text-black/80 font-bold flex items-center gap-1">
              <FaNairaSign />
              000,00.00
            </h1>
          </div>

          {/* fund 2 */}
          <div className="border border-primary/50 bg-primary/10 p-5 space-y-5 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-dark-grey">Spend</h3>
              <button className="bg-white text-primary font-light rounded px-2 py-1">
                History
              </button>
            </div>
            <h1 className="text-2xl text-black/80 font-bold flex items-center gap-1">
              <FaNairaSign />
              000,00.00
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-10 pt-20">
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
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-base md:text-2xl pb-8 md:pb-16 pt-4 md:pt-8">
                {service.title}
              </h3>
            </div>
          ))}
        </div>

        <NewOrderForm />
      </div>
    </AnimationWrapper>
  );
};

export default page;
